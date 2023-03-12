import { array } from "prop-types";
import React, { DOMAttributes, useEffect, useMemo, useRef, useState } from "react";
import { EventKey, StageProps } from "../typing";
import { set16To10, setRgbTo16 } from "../utils/Common";
import { $eventNames } from "./../utils/Macro";
import { StageContext } from "./Context";

export declare type EventDictionaryType = { [key in keyof Omit<DOMAttributes<HTMLCanvasElement>, 'children' | 'dangerouslySetInnerHTML'>]?: { [rgbIndex: string]: (ev: DOMAttributes<HTMLCanvasElement>[key]) => void } };
/**
 * 舞台
 * 内容渲染区
 * @returns 
 */
const Stage: React.FC<StageProps> = (props: StageProps) => {
    const ref = useRef(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [rgbCtx, setrgbCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [rgbIndexPool] = useState<number[]>([]);
    //用于存储事件容器
    const [eventDictionary, setEventDictionary] = useState<EventDictionaryType>({});
    useEffect(() => {
        const canvas = ref.current as unknown as HTMLCanvasElement;
        setCtx(canvas.getContext('2d'));
        //创建一个用于鼠标跟踪图形的canvas上下文
        const rgbCanvas = document.createElement('canvas');
        rgbCanvas.width = props.width as number;
        rgbCanvas.height = props.height as number;
        let rgbContext = rgbCanvas.getContext('2d')
        setrgbCtx(rgbContext);
        for (let key of Object.keys(eventDictionary)) {
            canvas.addEventListener(key.slice(2).toLowerCase(), (e) => {
                let event = e as MouseEvent;
                let ragIndex = Array.from(rgbContext?.getImageData(event.offsetX, event.offsetY, 1, 1).data!);
                eventDictionary[key as EventKey]?.[set16To10(setRgbTo16(`rgb(${ragIndex.slice(0, 3).join(',')})`)?.replace('#', '')!).toString()]?.(e as any);
            });
        }
    }, [props.children, eventDictionary]);
    const children = useMemo(() => [props?.children ?? []].flat().map(c => {
        //从1开始主要是rgbCanvas底色为白色,所以rgbIndex为0,同时后期stage自己的事件将会都注册到0上
        let rgbIndex = rgbIndexPool?.[0] != undefined ? rgbIndexPool?.[0] + 1 : 1;
        let ed = eventDictionary;
        for (let propName of Object.keys(c.props)) {
            if ($eventNames.includes(propName as EventKey)) {
                ed = {
                    ...ed,
                    [propName]: {
                        ...ed[propName as EventKey],
                        [rgbIndex]: c.props[propName]
                    }
                };
            }
        }
        setEventDictionary(ed);
        rgbIndexPool.unshift(rgbIndex);
        return {
            ...c,
            props: {
                ...c.props,
                rgbIndex: rgbIndex
            }
        }
    }), [rgbIndexPool])
    return <StageContext.Provider value={{ context: ctx, rgbContext: rgbCtx, eventDictionary, setEventDictionary }}>
        <canvas
            ref={ref}
            width={props.width}
            height={props.height}
            style={{ backgroundColor: 'red' }}
        />
        {children}
    </StageContext.Provider>
}

export default Stage;