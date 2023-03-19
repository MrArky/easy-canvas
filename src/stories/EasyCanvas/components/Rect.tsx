import React, { useContext, useEffect, useMemo } from "react";
import { RectProps } from "../typing";
import { set10ToRgba } from "../utils/ColorHelper";
import { StageContext } from "./../utils/Context";
import ShapeDI from "./ShapeDI";

const getRaduisPoint = function (data: { width: number, height: number, top: number, left: number, tw: number, rw: number, bw: number, lw: number, tlr: number | [number, number], trr: number | [number, number], blr: number | [number, number], brr: number | [number, number] }) {
    let { width, height, top, left, tw, rw, bw, lw, tlr, trr, blr, brr } = data;
    if (typeof tlr === 'number') tlr = [tlr, tlr];
    if (typeof trr === 'number') trr = [trr, trr];
    if (typeof blr === 'number') blr = [blr, blr];
    if (typeof brr === 'number') brr = [brr, brr];
    return [
        [
            { x: left + (tlr[0] > lw ? tlr[0] : lw), y: top + (tlr[1] > tw ? tlr[1] : tw) },
            { x: left, y: top + tlr[1] },
            { x: left + lw, y: top + (tlr[1] > tw ? tlr[1] : tw) },
            { x: 0, y: 0 },
            { x: left + (tlr[0] < lw ? 0 : lw), y: top + tw },
            { x: left + tlr[0], y: top },
            { x: 0, y: 0 },
        ],
        [
            { x: lw + left + width + (rw > trr[0] ? 0 : rw - trr[0]), y: top + (trr[1] > tw ? trr[1] : tw) },
            { x: lw + left + width + rw, y: top + trr[1] },
            { x: lw + left + width, y: top + trr[1] },
            { x: 0, y: 0 },
            { x: lw + left + width + (rw > trr[0] ? 0 : rw - trr[0]), y: top + tw },
            { x: lw + left + width + (rw > trr[0] ? 0 : rw - trr[0]), y: top },
            { x: 0, y: 0 },
        ],
        [
            { x: lw + left + width + (rw > brr[0] ? 0 : rw - brr[0]), y: top + tw + height + (bw > brr[1] ? 0 : bw - brr[1]) },
            { x: lw + left + width + rw, y: top + tw + height - brr[1] },
            { x: lw + left + width, y: top + tw + height + (bw > brr[1] ? 0 : bw - brr[1]) },
            { x: 0, y: 0 },
            { x: lw + left + width + (rw > brr[0] ? 0 : rw - brr[0]), y: top + tw + height },
            { x: lw + left + width + (rw > brr[0] ? 0 : rw - brr[0]), y: top + tw + height + bw },
            { x: 0, y: 0 },
        ],
        [
            { x: left + (blr[0] > lw ? blr[0] : lw), y: top + tw + height + (bw > blr[1] ? 0 : bw - blr[1]) },
            { x: left, y: top + tw + height + bw - blr[1] },
            { x: left + lw, y: top + tw + height + (bw > blr[1] ? 0 : bw - blr[1]) },
            { x: 0, y: 0 },
            { x: left + (blr[0] > lw ? blr[0] : lw), y: top + tw + height },
            { x: left + blr[0], y: top + tw + height + bw },
            { x: 0, y: 0 },
        ],
    ]
}
/**
 * 矩形
 * @returns 
 */
const Rect: React.FC<RectProps> = (props) => {
    const { context, rgbContext } = useContext(StageContext);
    useMemo(() => {
        if (context && rgbContext) {
            const params = {
                width: props.width,
                height: props.height,
                top: props.top ?? 0,
                left: props.left ?? 0,
                tw: props.style?.borderTopWidth ?? props.style?.borderWidth ?? 0,
                rw: props.style?.borderRightWidth ?? props.style?.borderWidth ?? 0,
                bw: props.style?.borderBottomWidth ?? props.style?.borderWidth ?? 0,
                lw: props.style?.borderLeftWidth ?? props.style?.borderWidth ?? 0,
                tlr: props.style?.borderTopLeftRadius ?? props.style?.borderRadius ?? 0,
                trr: props.style?.borderTopRightRadius ?? props.style?.borderRadius ?? 0,
                blr: props.style?.borderBottomLeftRadius ?? props.style?.borderRadius ?? 0,
                brr: props.style?.borderBottomRightRadius ?? props.style?.borderRadius ?? 0,
            }
            let points = getRaduisPoint(params);
            context.save();
            context.beginPath();
            // // context.strokeStyle = 'transparent';
            // //绘制上左1/4圆弧
            context.strokeStyle = 'red';
            context.ellipse(
                points[0][0].x < points[0][2].x ? points[0][2].x : points[0][0].x,
                points[0][0].y < points[0][4].y ? points[0][4].y : points[0][0].y,
                (points[0][0].x < points[0][2].x ? points[0][2].x : points[0][0].x) - points[0][2].x,
                (points[0][0].y < points[0][4].y ? points[0][4].y : points[0][0].y) - points[0][4].y,
                0,
                Math.PI / 4 * 4,
                Math.PI * 3 / 2);
            //绘制上边线
            context.lineTo(points[1][4].x, points[1][4].y);
            // //绘制上右1/4圆弧
            context.ellipse(
                points[1][0].x,
                points[1][0].y,
                points[1][2].x - points[1][0].x,
                points[1][0].y - points[1][4].y,
                0,
                Math.PI / 2 * 3,
                Math.PI / 4 * 7);
            //绘制右上1/4圆弧
            context.ellipse(
                points[1][0].x,
                points[1][0].y,
                points[1][2].x - points[1][0].x,
                points[1][0].y - points[1][4].y,
                0,
                Math.PI / 4 * 7,
                Math.PI * 2);
            // 绘制右边线
            context.lineTo(points[2][2].x, points[2][2].y);
            //绘制右下1/4圆弧
            context.ellipse(
                points[2][0].x,
                points[2][0].y,
                points[2][2].x - points[2][0].x,
                points[2][4].y - points[2][0].y,
                0,
                0,
                Math.PI / 4);
            //绘制下右1/4圆弧
            context.ellipse(
                points[2][0].x,
                points[2][0].y,
                points[2][2].x - points[2][0].x,
                points[2][4].y - points[2][0].y,
                0,
                Math.PI / 4,
                Math.PI / 2);
            //绘制下边线
            context.lineTo(points[3][4].x, points[3][4].y);
            //绘制下左1/4圆弧
            context.ellipse(
                points[3][0].x,
                points[3][0].y,
                points[3][0].x - points[3][2].x,
                points[3][4].y - points[3][0].y,
                0,
                Math.PI / 2,
                Math.PI / 4 * 3);
            //绘制左下1/4圆弧
            context.ellipse(
                points[3][0].x,
                points[3][0].y,
                points[3][0].x - points[3][2].x,
                points[3][4].y - points[3][0].y,
                0,
                Math.PI / 4 * 3,
                Math.PI);
            //绘制左边线
            context.lineTo(points[0][2].x, points[0][2].y);
            // r = props.style?.borderTopLeftRadius ?? props.style?.borderRadius ?? 0;
            // //绘制左上1/4圆弧
            // context.arc((props.left ?? 0) + r, (props.top ?? 0) + r, r, Math.PI, Math.PI / 4 * 5);
            context.fillStyle = props.style?.backgroundColor ?? '#000000';
            context.stroke();
            context.fill();
            context.closePath();






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