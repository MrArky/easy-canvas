import React, { useEffect, useRef, useState } from "react";
import { EventDictionaryType, EventKey, StageProps } from "../typing";
import { setRgbTo10 } from "../utils/ColorHelper";
import { $eventNames } from "./../utils/Macro";
import { StageContext } from "./../utils/Context";
import ShapeDI from "./ShapeDI";
/**
 * 舞台
 * 内容渲染区
 * @returns 
 */
const Stage: React.FC<StageProps> = (props: StageProps) => {
    const ref = useRef(null);//用于存储canvas对象
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);//图形绘制画板
    const [offscreenCtx, setOffscreenCtx] = useState<CanvasRenderingContext2D | null>(null);//用于绘制ctx图形的idx生成的rgba影子
    const [idxPool] = useState<number[]>([]);//用于存储已经生成的图形idx
    const [lastShape] = useState<{ idx: number }>({ idx: -1 });//上一个图形的idx，主要用于实现图形的mouseenter、mouseleave等事件
    if (props.actionRef) {
        props.actionRef['current'] = {
            clear: () => {
                ctx?.clearRect(0, 0, (ref.current as unknown as HTMLCanvasElement).width, (ref.current as unknown as HTMLCanvasElement).height);
                offscreenCtx?.clearRect(0, 0, (ref.current as unknown as HTMLCanvasElement).width, (ref.current as unknown as HTMLCanvasElement).height);
            }
        }
    }
    //用于存储事件容器
    const [eventDictionary] = useState<EventDictionaryType>({});
    useEffect(() => {
        const canvas = ref.current as unknown as HTMLCanvasElement;
        setCtx(canvas.getContext('2d'));
        //创建一个用于鼠标跟踪图形的canvas上下文
        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = canvas.width;
        offscreenCanvas.height = canvas.height;
        let offscreenContext = offscreenCanvas.getContext('2d')
        setOffscreenCtx(offscreenContext);
        //使用$eventNames去遍历，可以省去对Effect对eventDictionary的依赖，同时性能也会更好
        for (let key of /*Object.keys(eventDictionary)*/$eventNames) {
            //给Stage注册事件
            if (Object.keys(props).includes(key)) {
                if (eventDictionary[key]) eventDictionary[key]!['0'] = props[key] as any;
                else eventDictionary[key] = { 0: props[key] as any }
            }
            canvas.addEventListener(key.slice(2).toLowerCase(), (e) => {
                let event = e as MouseEvent;
                let idx = setRgbTo10(`rgb(${Array.from(offscreenContext?.getImageData(event.offsetX, event.offsetY, 1, 1).data!).slice(0, 3).join(',')})`);
                if ((key == "onMouseMove" || key == "onMouseMoveCapture")) {
                    //key == "onMouseEnter" || key == "onMouseLeave" || key == "onMouseOver" || key == "onMouseOut" || key == "onMouseOverCapture" || key == "onMouseOutCapture"
                    //这里需要注意的是onMouseEnter和onMouseLeave是不支持冒泡的
                    //idx!=lastIdx既有上个元素的离开，也有当前元素的进入
                    if (idx != lastShape.idx) {
                        if (lastShape.idx >= 0) {
                            eventDictionary['onMouseLeave']?.[lastShape.idx.toString()]?.(e as any);
                            eventDictionary['onMouseOut']?.[lastShape.idx.toString()]?.(e as any);
                            eventDictionary['onMouseOutCapture']?.[lastShape.idx.toString()]?.(e as any);
                            eventDictionary['onMouseEnter']?.[idx.toString()]?.(e as any);
                            eventDictionary['onMouseOver']?.[idx.toString()]?.(e as any);
                            eventDictionary['onMouseOverCapture']?.[idx.toString()]?.(e as any);
                        }
                        lastShape.idx = idx;
                    }
                }
                eventDictionary[key as EventKey]?.[idx.toString()]?.(e as any);
            });
        }
    }, [eventDictionary, lastShape]);
    if (ctx && offscreenCtx) {
        idxPool.splice(0,idxPool.length);
        ctx?.clearRect(0, 0, (ref.current as unknown as HTMLCanvasElement).width, (ref.current as unknown as HTMLCanvasElement).height);
        offscreenCtx?.clearRect(0, 0, (ref.current as unknown as HTMLCanvasElement).width, (ref.current as unknown as HTMLCanvasElement).height);
    }
    return <StageContext.Provider value={{ context: ctx, rgbContext: offscreenCtx, eventDictionary, idxPool }}>
        <canvas
            ref={ref}
            width={props.width}
            height={props.height}
            style={props.style}
        />
        <ShapeDI>{props.children}</ShapeDI>
    </StageContext.Provider>
}

export default Stage;