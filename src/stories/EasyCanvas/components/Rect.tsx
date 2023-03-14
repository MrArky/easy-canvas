import React, { useContext, useEffect, useMemo } from "react";
import { RectProps } from "../typing";
import { set10ToRgba } from "../utils/ColorHelper";
import { StageContext } from "./../utils/Context";
import ShapeDI from "./ShapeDI";

/**
 * 矩形
 * @returns 
 */
const Rect: React.FC<RectProps> = (props) => {
    const { context, rgbContext } = useContext(StageContext);
    useMemo(() => {
        if (context && rgbContext) {
            context.save();
            context.beginPath();
            // context.strokeStyle = strokeColor;
            // context.lineWidth = strokeWidth;
            context.fillStyle = props.fillStyle ?? '#000000';
            context.fillRect(props.left ?? 0, props.top ?? 0, props.width, props.height);
            context.fill();
            context.stroke();
            context.restore();

            rgbContext.save();
            rgbContext.beginPath();
            // context.strokeStyle = strokeColor;
            // context.lineWidth = strokeWidth;
            rgbContext.fillStyle = set10ToRgba(props.offscreenIdx!);
            rgbContext.fillRect(props.left ?? 0, props.top ?? 0, props.width, props.height);
            rgbContext.fill();
            rgbContext.stroke();
            rgbContext.restore();
        }
    }, [context, rgbContext, props.offscreenIdx,props]);
    return <ShapeDI parentProps={props}>{props.children}</ShapeDI>
}

export default Rect;