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
            let r = props.style?.borderTopLeftRadius ?? props.style?.borderRadius ?? 0;
            context.strokeStyle = 'transparent';
            //绘制上左1/4圆弧
            context.arc((props.left ?? 0) + r, (props.top ?? 0) + r, r, Math.PI / 4 * 5, Math.PI * 3 / 2);
            //绘制上边线
            context.lineTo((props.left ?? 0) + props.width - r, props.top ?? 0);
            r = props.style?.borderTopRightRadius ?? props.style?.borderRadius ?? 0;
            //绘制上右1/4圆弧
            context.arc((props.left ?? 0) - r + props.width, (props.top ?? 0) + r, r, Math.PI / 4 * 6, Math.PI / 4 * 7);
            //绘制右上1/4圆弧
            context.arc((props.left ?? 0) - r + props.width, (props.top ?? 0) + r, r, Math.PI / 4 * 7, 2 * Math.PI);
            //绘制右边线
            context.lineTo((props.left ?? 0) + props.width, (props.top ?? 0) + props.height - r);
            r = props.style?.borderBottomRightRadius ?? props.style?.borderRadius ?? 0;
            //绘制右下1/4圆弧
            context.arc((props.left ?? 0) - r + props.width, (props.top ?? 0) - r + props.height, r, 0, Math.PI / 4);
            //绘制下右1/4圆弧
            context.arc((props.left ?? 0) - r + props.width, (props.top ?? 0) - r + props.height, r, Math.PI / 4, Math.PI / 2);
            //绘制下边线
            context.lineTo((props.left ?? 0) + r, (props.top ?? 0) + props.height);
            r = props.style?.borderBottomLeftRadius ?? props.style?.borderRadius ?? 0;
            //绘制下左1/4圆弧
            context.arc((props.left ?? 0) + r, (props.top ?? 0) - r + props.height, r, Math.PI / 2, Math.PI / 4 * 3);
            //绘制左下1/4圆弧
            context.arc((props.left ?? 0) + r, (props.top ?? 0) - r + props.height, r, Math.PI / 4 * 3, Math.PI);
            //绘制左边线
            context.lineTo((props.left ?? 0), (props.top ?? 0) + r);
            r = props.style?.borderTopLeftRadius ?? props.style?.borderRadius ?? 0;
            //绘制左上1/4圆弧
            context.arc((props.left ?? 0) + r, (props.top ?? 0) + r, r, Math.PI, Math.PI / 4 * 5);
            context.fillStyle = props.style?.backgroundColor ?? '#000000';
            context.stroke();
            context.fill();
            context.closePath();

            if (props.style?.borderTopWidth || props.style?.borderWidth) {
                context.save();
                context.beginPath();
                context.strokeStyle = "#000000";
                r = props.style?.borderTopLeftRadius ?? props.style?.borderRadius ?? 0;
                r = r < context.lineWidth ? context.lineWidth / 2 : r - context.lineWidth / 2;
                if (typeof props.style?.borderColor === "string") context.strokeStyle = props.style.borderColor;
                if (typeof props.style?.borderTopColor === "string") context.strokeStyle = props.style.borderTopColor;
                if (typeof props.style?.borderWidth === "number") context.lineWidth = props.style.borderWidth;
                if (typeof props.style?.borderTopWidth === "number") context.lineWidth = props.style.borderTopWidth;
                //绘制上左1/4圆弧
                context.arc(
                    (props.left ?? 0) + r + context.lineWidth / 2,
                    (props.top ?? 0) + r + context.lineWidth / 2,
                    r,
                    Math.PI / 4 * 5, Math.PI * 3 / 2
                );
                let r1 = props.style?.borderTopRightRadius ?? props.style?.borderRadius ?? 0;
                r1 = r1 < context.lineWidth ? context.lineWidth / 2 : r1 - context.lineWidth / 2;
                //绘制上边线
                context.lineTo((props.left ?? 0) + props.width - r - r1, (props.top ?? 0) + context.lineWidth / 2);
                r = r1;
                //绘制上右1/4圆弧
                context.arc(
                    (props.left ?? 0) - r + props.width - context.lineWidth / 2,
                    (props.top ?? 0) + r + context.lineWidth / 2,
                    r,
                    Math.PI / 4 * 6, Math.PI / 4 * 7);
                context.stroke();
            }
            if (props.style?.borderRightWidth || props.style?.borderWidth) {
                context.save();
                context.beginPath();
                context.strokeStyle = "#000000";
                if (typeof props.style?.borderColor === "string") context.strokeStyle = props.style.borderColor;
                if (typeof props.style?.borderRightColor === "string") context.strokeStyle = props.style.borderRightColor;
                if (typeof props.style?.borderWidth === "number") context.lineWidth = props.style.borderWidth;
                if (typeof props.style?.borderRightWidth === "number") context.lineWidth = props.style.borderRightWidth;
                //绘制右上1/4圆弧
                context.arc(
                    (props.left ?? 0) - r + props.width - context.lineWidth / 2,
                    (props.top ?? 0) + r + context.lineWidth / 2,
                    r,
                    Math.PI / 4 * 7, 2 * Math.PI);
                //绘制右边线
                context.lineTo((props.left ?? 0) + props.width - context.lineWidth / 2, (props.top ?? 0) + props.height - r - context.lineWidth / 2);
                r = props.style?.borderBottomRightRadius ?? props.style?.borderRadius ?? 0;
                r = r < context.lineWidth ? context.lineWidth / 2 : r - context.lineWidth / 2;
                //绘制右下1/4圆弧
                context.arc((props.left ?? 0) - r + props.width - context.lineWidth / 2, (props.top ?? 0) + props.height - r - context.lineWidth / 2, r, 0, Math.PI / 4);
                context.stroke();
            }
            if (props.style?.borderBottompWidth || props.style?.borderWidth) {
                context.save();
                context.beginPath();
                context.strokeStyle = "#000000";
                if (typeof props.style?.borderColor === "string") context.strokeStyle = props.style.borderColor;
                if (typeof props.style?.borderBottomColor === "string") context.strokeStyle = props.style.borderBottomColor;
                if (typeof props.style?.borderWidth === "number") context.lineWidth = props.style.borderWidth;
                if (typeof props.style?.borderBottompWidth === "number") context.lineWidth = props.style.borderBottompWidth;
                //绘制下右1/4圆弧
                context.arc((props.left ?? 0) - r + props.width - context.lineWidth / 2, (props.top ?? 0) + props.height - r - context.lineWidth / 2, r, Math.PI / 4, Math.PI / 2);
                //绘制下边线
                context.lineTo((props.left ?? 0) + r + context.lineWidth / 2, (props.top ?? 0) + props.height - context.lineWidth / 2);
                r = props.style?.borderBottomLeftRadius ?? props.style?.borderRadius ?? 0;
                r = r < context.lineWidth ? context.lineWidth / 2 : r - context.lineWidth / 2;
                //绘制下左1/4圆弧
                context.arc((props.left ?? 0) + r + context.lineWidth / 2, (props.top ?? 0) + props.height - r - context.lineWidth / 2, r, Math.PI / 2, Math.PI / 4 * 3);
                context.stroke();
            }
            if (props.style?.borderLeftWidth || props.style?.borderWidth) {
                context.save();
                context.beginPath();
                context.strokeStyle = "#000000";
                if (typeof props.style?.borderColor === "string") context.strokeStyle = props.style.borderColor;
                if (typeof props.style?.borderLeftColor === "string") context.strokeStyle = props.style.borderLeftColor;
                if (typeof props.style?.borderWidth === "number") context.lineWidth = props.style.borderWidth;
                if (typeof props.style?.borderLeftWidth === "number") context.lineWidth = props.style.borderLeftWidth;
                //绘制左下1/4圆弧
                context.arc((props.left ?? 0) + r + context.lineWidth / 2, (props.top ?? 0) + props.height - r - context.lineWidth / 2, r, Math.PI / 4 * 3, Math.PI);
                //绘制左边线
                context.lineTo((props.left ?? 0) + context.lineWidth / 2, (props.top ?? 0) + r + context.lineWidth / 2);
                r = props.style?.borderTopLeftRadius ?? props.style?.borderRadius ?? 0;
                r = r < context.lineWidth ? context.lineWidth / 2 : r - context.lineWidth / 2;
                //绘制左上1/4圆弧
                context.arc(
                    (props.left ?? 0) + r + context.lineWidth / 2,
                    (props.top ?? 0) + r + context.lineWidth / 2,
                    r,
                    Math.PI, Math.PI / 4 * 5);
                context.stroke();
            }





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
    }, [context, rgbContext, props.offscreenIdx, props]);
    return <ShapeDI parentProps={props}>{props.children}</ShapeDI>
}

export default Rect;