import React, { useContext, useEffect } from "react";
import { RectProps } from "../typing";
import { set10ToRgba, set16ToRgb } from "../utils/Common";
import { StageContext } from "./Context";

/**
 * 矩形
 * @returns 
 */
const Rect: React.FC<RectProps> = (props) => {
    const { context, rgbContext } = useContext(StageContext);
    useEffect(() => {
        if (context && rgbContext) {
            context.save();
            context.beginPath();
            // context.strokeStyle = strokeColor;
            // context.lineWidth = strokeWidth;
            context.fillStyle = '#FFFFFF';
            context.fillRect(props.left, props.top, props.width, props.height);
            context.fill();
            context.stroke();
            context.restore();

            rgbContext.save();
            rgbContext.beginPath();
            // context.strokeStyle = strokeColor;
            // context.lineWidth = strokeWidth;
            rgbContext.fillStyle = set10ToRgba(props.rgbIndex!);
            rgbContext.fillRect(props.left, props.top, props.width, props.height);
            rgbContext.fill();
            rgbContext.stroke();
            rgbContext.restore();
        }
    }, [context, rgbContext, props.rgbIndex]);
    return <>{props.children}</>
}

export default Rect;