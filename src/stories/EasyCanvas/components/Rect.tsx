import React, { useContext, useMemo } from "react";
import { RectProps } from "../typing";
import { set10ToRgba } from "../utils/ColorHelper";
import { StageContext } from "./../utils/Context";
import ShapeDI from "./ShapeDI";

const getRaduisPoint = function (data: { width: number, height: number, top: number, left: number, tw: number, rw: number, bw: number, lw: number, tlr: [number] | [number, number], trr: [number] | [number, number], blr: [number] | [number, number], brr: [number] | [number, number] }) {
    let { width, height, top, left, tw, rw, bw, lw, tlr, trr, blr, brr } = data;
    if (tlr.length == 1) tlr = [tlr[0], tlr[0]];
    if (trr.length == 1) trr = [trr[0], trr[0]];
    if (blr.length == 1) blr = [blr[0], blr[0]];
    if (brr.length == 1) brr = [brr[0], brr[0]];
    const get1316XY = (a: number, b: number, point: 3 | 6) => {
        if (tlr.length == 1) tlr = [tlr[0], tlr[0]];
        if (point == 3) {
            if (tlr[0] < lw || tlr[1] < tw) {
                return { x: 0, y: 0 };
            }
        }
        else {
            if (tlr[0] == 0 || tlr[1] == 0) {
                return { x: 0, y: 0 };
            }
        }
        let k = tlr[0] - tlr[1] * lw / tw;
        k = isNaN(k) ? 0 : k;
        let A = Math.pow(b, 2) + Math.pow(a, 2) * Math.pow(tw, 2) / Math.pow(lw, 2);
        let B = 2 * Math.pow(a, 2) * tw * k / lw;
        let C = Math.pow(a, 2) * (Math.pow(k, 2) - Math.pow(b, 2));
        let x1 = (-B + Math.sqrt(Math.pow(B, 2) - 4 * A * C)) / (2 * A);
        let x2 = (-B - Math.sqrt(Math.pow(B, 2) - 4 * A * C)) / (2 * A);
        let x = Math.min(x1, x2);
        let y = -x * tw / lw - k;
        return { x, y };
    }
    return [
        [
            { x: left + (tlr[0] > lw && tlr[1] > tw ? tlr[0] : lw), y: top + (tlr[0] > lw && tlr[1] > tw ? tlr[1] : tw), x1: left + tlr[0], y1: top + tlr[1] },
            { x: left, y: top + tlr[1] },
            { x: left + lw, y: top + (tlr[1] > tw ? tlr[1] : tw) },
            { x: left + (tlr[0] > lw && tlr[1] > tw? tlr[0] : lw) + get1316XY(tlr[0] - lw, tlr[1] - tw, 3).x, y: top + (tlr[0] > lw && tlr[1] > tw ? tlr[1] : tw) - get1316XY(tlr[0] - lw, tlr[1] - tw, 3).y, x1: get1316XY(tlr[0] - lw, tlr[1] - tw, 3).x, y1: get1316XY(tlr[0] - lw, tlr[1] - tw, 3).y },
            { x: left + (tlr[0] < lw ? lw : tlr[0]), y: top + tw },
            { x: left + tlr[0], y: top },
            { x: left + (get1316XY(tlr[0], tlr[1], 6).x != 0 ? (tlr[0] + get1316XY(tlr[0], tlr[1], 6).x) : 0), y: top + (get1316XY(tlr[0], tlr[1], 6).y != 0 ? (tlr[1] - get1316XY(tlr[0], tlr[1], 6).y) : 0), x1: get1316XY(tlr[0], tlr[1], 6).x, y1: get1316XY(tlr[0], tlr[1], 6).y },
        ],
        [
            { x: lw + left + width + (rw > trr[0] ? 0 : rw - trr[0]), y: top + (trr[1] > tw ? trr[1] : tw), x1: lw + left + width + rw - trr[0], y1: top + trr[1] },
            { x: lw + left + width + rw, y: top + trr[1] },
            { x: lw + left + width, y: top + trr[1] },
            { x: 0, y: 0 },
            { x: lw + left + width + (rw > trr[0] ? 0 : rw - trr[0]), y: top + tw },
            { x: lw + left + width + (rw > trr[0] ? 0 : rw - trr[0]), y: top },
            { x: 0, y: 0 },
        ],
        [
            { x: lw + left + width + (rw > brr[0] ? 0 : rw - brr[0]), y: top + tw + height + (bw > brr[1] ? 0 : bw - brr[1]), x1: lw + left + width + rw - brr[0], y1: top + tw + height + bw - brr[1] },
            { x: lw + left + width + rw, y: top + tw + height - brr[1] },
            { x: lw + left + width, y: top + tw + height + (bw > brr[1] ? 0 : bw - brr[1]) },
            { x: 0, y: 0 },
            { x: lw + left + width + (rw > brr[0] ? 0 : rw - brr[0]), y: top + tw + height },
            { x: lw + left + width + (rw > brr[0] ? 0 : rw - brr[0]), y: top + tw + height + bw },
            { x: 0, y: 0 },
        ],
        [
            { x: left + (blr[0] > lw ? blr[0] : lw), y: top + tw + height + (bw > blr[1] ? 0 : bw - blr[1]), x1: left + blr[0], y1: top + tw + height + bw - blr[1] },
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
                tlr: [props.style?.borderTopLeftRadius ?? props.style?.borderRadius ?? 0].flat() as [number, number],
                trr: [props.style?.borderTopRightRadius ?? props.style?.borderRadius ?? 0].flat() as [number, number],
                blr: [props.style?.borderBottomLeftRadius ?? props.style?.borderRadius ?? 0].flat() as [number, number],
                brr: [props.style?.borderBottomRightRadius ?? props.style?.borderRadius ?? 0].flat() as [number, number],
            }
            let points = getRaduisPoint(params);
            //#region 面积区
            context.save();
            context.beginPath();
            context.strokeStyle = 'transparent';
            context.fillStyle = props.style?.backgroundColor ?? '#000000';
            //绘制上左1/2圆弧
            // context.strokeStyle = 'red';
            context.ellipse(
                points[0][0].x < points[0][2].x ? points[0][2].x : points[0][0].x,
                points[0][0].y < points[0][4].y ? points[0][4].y : points[0][0].y,
                (points[0][0].x < points[0][2].x ? points[0][2].x : points[0][0].x) - points[0][2].x,
                (points[0][0].y < points[0][4].y ? points[0][4].y : points[0][0].y) - points[0][4].y,
                0,
                Math.PI,
                Math.PI * 3 / 2);
            //绘制上边线
            context.lineTo(points[1][4].x, points[1][4].y);
            //绘制上右1/2圆弧
            context.ellipse(
                points[1][0].x,
                points[1][0].y,
                points[1][2].x - points[1][0].x,
                points[1][0].y - points[1][4].y,
                0,
                Math.PI / 2 * 3,
                Math.PI * 2);
            // 绘制右边线
            context.lineTo(points[2][2].x, points[2][2].y);
            //绘制右下1/2圆弧
            context.ellipse(
                points[2][0].x,
                points[2][0].y,
                points[2][2].x - points[2][0].x,
                points[2][4].y - points[2][0].y,
                0,
                0,
                Math.PI / 2);
            //绘制下边线
            context.lineTo(points[3][4].x, points[3][4].y);
            //绘制下左1/2圆弧
            context.ellipse(
                points[3][0].x,
                points[3][0].y,
                points[3][0].x - points[3][2].x,
                points[3][4].y - points[3][0].y,
                0,
                Math.PI / 2,
                Math.PI);
            //绘制左边线
            context.lineTo(points[0][2].x, points[0][2].y);
            context.closePath();
            context.stroke();
            context.fill();
            //#endregion


            //#region 绘制边框
            context.strokeStyle = 'transparent';
            //获取上边框颜色
            context.fillStyle = props.style?.borderTopColor ?? props.style?.borderColor ?? '#000000';
            //#region 绘制上左1/4圆弧
            context.save();
            context.beginPath();
            context.moveTo(points[0][1].x, points[0][1].y);
            if (params.tlr[1] < params.tw) context.lineTo(params.left, params.top + params.tw);
            context.lineTo(points[0][2].x, points[0][2].y);
            console.log(points[0][0].x,points[0][0].y,points[0][0].x1,points[0][0].y1,params.left + params.lw,params.top + params.tw)
            if (points[0][0].x == params.left + params.lw && points[0][0].y == params.top + params.tw) {
                context.lineTo(points[0][0].x, points[0][0].y);
            }
            else {
                context.ellipse(
                    points[0][0].x,
                    points[0][0].y,
                    points[0][0].x - points[0][2].x,
                    points[0][0].y - points[0][4].y,
                    0,
                    Math.PI,
                    Math.atan(points[0][3].y1! / Math.abs(points[0][3].x1!)) + Math.PI
                );
            }
            context.lineTo(points[0][6].x, points[0][6].y);
            context.ellipse(
                points[0][0].x1!,
                points[0][0].y1!,
                params.tlr[0],
                params.tlr[1],
                0,
                Math.atan(-Math.pow(params.tlr[1], 2) * points[0][6].x1! / Math.pow(params.tlr[0], 2) * Math.pow(Math.pow(params.tlr[1], 2) - Math.pow(params.tlr[1], 2) * Math.pow(points[0][6].x1!, 2) / Math.pow(params.tlr[0], 2), -0.5)) + Math.PI,
                Math.PI,
                true
            );
            context.closePath();
            context.stroke();
            context.fill();
            //#endregion
            //绘制上左1/4圆弧
            context.save();
            context.beginPath();
            context.strokeStyle = 'transparent';
            context.moveTo(points[0][6].x, points[0][6].y);
            context.ellipse(
                points[0][0].x1!,
                points[0][0].y1!,
                params.tlr[0],
                params.tlr[1],
                0,
                Math.atan(-Math.pow(params.tlr[1], 2) * points[0][6].x1! / Math.pow(params.tlr[0], 2) * Math.pow(Math.pow(params.tlr[1], 2) - Math.pow(params.tlr[1], 2) * Math.pow(points[0][6].x1!, 2) / Math.pow(params.tlr[0], 2), -0.5)) + Math.PI,
                Math.PI / 2 * 3,
            );
            if (params.tlr[0] < params.lw) context.lineTo(params.left + params.lw, params.top);
            context.lineTo(points[0][4].x, points[0][4].y);
            context.ellipse(
                points[0][0].x,
                points[0][0].y,
                (points[0][0].x < points[0][2].x ? points[0][2].x : points[0][0].x) - points[0][2].x,
                (points[0][0].y < points[0][4].y ? points[0][4].y : points[0][0].y) - points[0][4].y,
                0,
                Math.PI / 2 * 3,
                Math.atan(-Math.pow(params.tlr[1], 2) * points[0][6].x1! / Math.pow(params.tlr[0], 2) * Math.pow(Math.pow(params.tlr[1], 2) - Math.pow(params.tlr[1], 2) * Math.pow(points[0][6].x1!, 2) / Math.pow(params.tlr[0], 2), -0.5)) + Math.PI,
                true
            );
            context.lineTo(params.left + params.lw, params.top + params.tw);
            context.lineTo(points[0][6].x, points[0][6].y);
            context.closePath();
            context.stroke();
            context.fill();
            //上边框
            //绘制上右1/4圆弧
            //右边框
            //下边框
            //左边框
            //#endregion

            //#region offScreenCanvas识别区
            rgbContext.save();
            rgbContext.beginPath();
            rgbContext.strokeStyle = 'transparent';
            rgbContext.fillStyle = set10ToRgba(props.offscreenIdx!);
            //绘制上左1/2圆弧
            rgbContext.ellipse(
                points[0][0].x1!,
                points[0][0].y1!,
                params.tlr[0],
                params.tlr[1],
                0,
                Math.PI,
                Math.PI * 3 / 2);
            //绘制上边线
            rgbContext.lineTo(points[1][5].x, points[1][5].y);
            //绘制上右1/2圆弧
            rgbContext.ellipse(
                points[1][0].x1!,
                points[1][0].y1!,
                params.trr[0],
                params.trr[1],
                0,
                Math.PI / 2 * 3,
                Math.PI * 2);
            // 绘制右边线
            rgbContext.lineTo(points[2][1].x, points[2][1].y);
            //绘制右下1/2圆弧
            rgbContext.ellipse(
                points[2][0].x1!,
                points[2][0].y1!,
                params.brr[0],
                params.brr[1],
                0,
                0,
                Math.PI / 2);
            //绘制下边线
            rgbContext.lineTo(points[3][5].x, points[3][5].y);
            //绘制下左1/4圆弧
            rgbContext.ellipse(
                points[3][0].x1!,
                points[3][0].y1!,
                params.blr[0],
                params.blr[0],
                0,
                Math.PI / 2,
                Math.PI);
            //绘制左边线
            rgbContext.lineTo(points[0][1].x, points[0][1].y);
            rgbContext.closePath();
            rgbContext.stroke();
            rgbContext.fill();
            //#endregion
        }
    }, [context, rgbContext, props.offscreenIdx, props]);
    return <ShapeDI parentProps={props}>{props.children}</ShapeDI>
}

export default Rect;