import React, { useContext, useMemo } from "react";
import { RectProps } from "../typing";
import { set10ToRgba } from "../utils/ColorHelper";
import { StageContext } from "./../utils/Context";
import ShapeDI from "./ShapeDI";
const { pow, sqrt, min } = Math;
const getRaduisPoint = function (data: { width: number, height: number, top: number, left: number, tw: number, rw: number, bw: number, lw: number, tlr: [number] | [number, number], trr: [number] | [number, number], blr: [number] | [number, number], brr: [number] | [number, number] }) {
    let { width, height, top, left, tw, rw, bw, lw, tlr, trr, blr, brr } = data;
    if (tlr.length == 1) tlr = [tlr[0], tlr[0]];
    if (trr.length == 1) trr = [trr[0], trr[0]];
    if (blr.length == 1) blr = [blr[0], blr[0]];
    if (brr.length == 1) brr = [brr[0], brr[0]];
    
    let totalWidth = left + lw + width + rw;
    let totalHeight = top + tw + height + bw;
    return [
        (() => {
            let outCentre = { x: left + tlr[0], y: top + tlr[1], a: tlr[0], b: tlr[1] };//外圆心
            let outXCP = { x: outCentre.x, y: top };//外部与x平行边交点
            let outYCP = { x: left, y: outCentre.y };//外部与y平行边交点
            let outSplit = { x: totalWidth, y: outCentre.y };
            let innerCentre = outCentre.x > left + lw && outCentre.y > top + tw ? { ...outCentre, a: outCentre.x - left - lw, b: outCentre.y - top - tw } : { x: left + lw, y: top + tw, a: 0, b: 0 };//内圆心
            let innerXCP = { x: innerCentre.x, y: top + tw };//内部与x平行边交点
            let innerYCP = { x: left + lw, y: innerCentre.y };//内部与y平行边交点
            let innerSplit = { x: totalWidth, y: outCentre.y };
            return { outCentre, outXCP, outYCP, innerCentre, innerXCP, innerYCP }
        })(),
        (() => {
            let outCentre = { x: totalWidth - trr[0], y: top + trr[1], a: trr[0], b: trr[1] };//外圆心
            let outXCP = { x: outCentre.x, y: top };//外部与x平行边交点
            let outYCP = { x: totalWidth, y: outCentre.y };//外部与y平行边交点\
            let innerCentre = outCentre.x < totalWidth - rw && outCentre.y > top + tw ? { ...outCentre, a: totalWidth - rw - outCentre.x, b: outCentre.y - top + tw } : { x: totalWidth - rw, y: top + tw, a: 0, b: 0 };//内圆心
            let innerXCP = { x: innerCentre.x, y: top + tw };//内部与x平行边交点
            let innerYCP = { x: totalWidth - rw, y: innerCentre.y };//内部与y平行边交点
            return { outCentre, outXCP, outYCP, innerCentre, innerXCP, innerYCP }
        })(),
        (() => {
            let outCentre = { x: totalWidth - brr[0], y: totalHeight - brr[1], a: brr[0], b: trr[1] };//外圆心和内圆心
            let outXCP = { x: outCentre.x, y: totalHeight };//外部与x平行边交点
            let outYCP = { x: totalWidth, y: outCentre.y };//外部与y平行边交点
            let innerCentre = outCentre.x < totalWidth - rw && outCentre.y < totalHeight - bw ? { ...outCentre, a: totalWidth - rw - outCentre.x, b: totalHeight - bw - outCentre.y } : { x: totalWidth - rw, y: totalHeight - bw, a: 0, b: 0 };//内圆心
            let innerXCP = { x: innerCentre.x, y: totalHeight - bw };//内部与x平行边交点
            let innerYCP = { x: totalWidth - rw, y: innerCentre.y };//内部与y平行边交点
            return { outCentre, outXCP, outYCP, innerCentre, innerXCP, innerYCP }
        })(),
        (() => {
            let outCentre = { x: left + blr[0], y: totalHeight - blr[1], a: blr[0], b: blr[1] };//外圆心和内圆心
            let outXCP = { x: outCentre.x, y: totalHeight };//外部与x平行边交点
            let outYCP = { x: left, y: outCentre.y };//外部与y平行边交点
            let innerCentre = outCentre.x > left + lw && outCentre.y < totalHeight - bw ? { ...outCentre, a: outCentre.x - left + lw, b: totalHeight - bw - outCentre.y } : { x: left + lw, y: totalHeight - bw, a: 0, b: 0 };//内圆心
            let innerXCP = { x: innerCentre.x, y: totalHeight - bw };//内部与x平行边交点
            let innerYCP = { x: left + lw, y: innerCentre.y };//内部与y平行边交点
            return { outCentre, outXCP, outYCP, innerCentre, innerXCP, innerYCP }
        })()
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
            context.ellipse(points[0].innerCentre.x, points[0].innerCentre.y, points[0].innerCentre.a, points[0].innerCentre.b, 0, Math.PI, Math.PI / 2 * 3);
            context.lineTo(points[1].innerXCP.x, points[1].innerXCP.y);
            context.ellipse(points[1].innerCentre.x, points[1].innerCentre.y, points[1].innerCentre.a, points[1].innerCentre.b, 0, Math.PI / 2 * 3, Math.PI * 2);
            context.lineTo(points[2].innerYCP.x, points[2].innerYCP.y);
            context.ellipse(points[2].innerCentre.x, points[2].innerCentre.y, points[2].innerCentre.a, points[2].innerCentre.b, 0, 0, Math.PI / 2);
            context.lineTo(points[3].innerXCP.x, points[3].innerXCP.y);
            context.ellipse(points[3].innerCentre.x, points[3].innerCentre.y, points[3].innerCentre.a, points[3].innerCentre.b, 0, Math.PI / 2, Math.PI);
            context.lineTo(points[0].innerYCP.x, points[0].innerYCP.y);
            context.closePath();
            context.stroke();
            context.fill();
            //#endregion

            //#region offScreenCanvas识别区
            rgbContext.save();
            rgbContext.beginPath();
            rgbContext.strokeStyle = 'transparent';
            rgbContext.fillStyle = set10ToRgba(props.offscreenIdx!);
            rgbContext.ellipse(points[0].outCentre.x, points[0].outCentre.y, points[0].outCentre.a, points[0].outCentre.b, 0, Math.PI, Math.PI / 2 * 3);
            rgbContext.lineTo(points[1].outXCP.x, points[1].outXCP.y);
            rgbContext.ellipse(points[1].outCentre.x, points[1].outCentre.y, points[1].outCentre.a, points[1].outCentre.b, 0, Math.PI / 2 * 3, Math.PI * 2);
            rgbContext.lineTo(points[2].outYCP.x, points[2].outYCP.y);
            rgbContext.ellipse(points[2].outCentre.x, points[2].outCentre.y, points[2].outCentre.a, points[2].outCentre.b, 0, 0, Math.PI / 2);
            rgbContext.lineTo(points[3].outXCP.x, points[3].outXCP.y);
            rgbContext.ellipse(points[3].outCentre.x, points[3].outCentre.y, points[3].outCentre.a, points[3].outCentre.b, 0, Math.PI / 2, Math.PI);
            rgbContext.lineTo(points[0].outYCP.x, points[0].outYCP.y);
            rgbContext.closePath();
            rgbContext.stroke();
            rgbContext.fill();
            //#endregion
        }
    }, [context, rgbContext, props.offscreenIdx, props]);
    return <ShapeDI parentProps={props}>{props.children}</ShapeDI>
}

export default Rect;