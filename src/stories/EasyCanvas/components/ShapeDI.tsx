import React, { useContext, useMemo } from "react";
import { ShapeProps } from "../typing";
import { StageContext } from "../utils/Context";
import ShapePropsListener from "./ShapePropsListener";


/**
 * 1.给形状注入必要信息
 * 2.做一些公共处理
 * @param com 
 * @returns 
 */
const ShapeDI: React.FC<{ children?: any, parentProps?: ShapeProps; }> = (props) => {
    const { idxPool, eventDictionary } = useContext(StageContext);
    const children = useMemo(() => {
        return [props.children ?? []].flat().filter(c => typeof c === 'object').map((c, i) => {
            //从1开始主要是offscreenCanvas底色为白色,所以idx为0,同时stage自己的事件将会都注册到0上，注册Stage事件是在Stage组件中完成的
            if (c.type?.name == undefined) {
                return [c.props?.children ?? []].flat().map((cc: any, ii: number) => {
                    return <ShapeDI key={i + '-' + ii}>{cc}</ShapeDI>
                });
            }
            let idx = idxPool?.[0] != undefined ? idxPool?.[0] + 1 : 1;
            idxPool?.unshift(idx);
            return <ShapePropsListener key={i}>{{
                ...c,
                props: {
                    ...c.props,
                    offscreenIdx: idx,
                    left: (props.parentProps?.left ?? 0) + (c.props.left ?? 0),
                    top: (props.parentProps?.top ?? 0) + (c.props.top ?? 0)
                }
            }}</ShapePropsListener>
        })
    }, [props.children, idxPool, eventDictionary]);
    return <>{children}</>;
}

export default ShapeDI;