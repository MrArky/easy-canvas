import { HTMLProps, DOMAttributes } from "react";

declare type EventKey = keyof Omit<DOMAttributes<HTMLCanvasElement>, 'children' | 'dangerouslySetInnerHTML'>

/**
 * 形状事件
 */
declare type ShapeEventProps = { [key in EventKey]?: (ev: DOMAttributes<HTMLCanvasElement>[key]) => void };

/**
 * 内容渲染区属性
 */
interface StageProps extends HTMLProps<HTMLCanvasElement> {
    /**
     * 渲染元素[形状、线条等]
     */
    children?: any;
}

/**
 * 渲染元素
 */
interface StageElement {
    // context?: CanvasRenderingContext2D | null;
    rgbIndex?: number;
}


/**
 * 形状属性
 */
interface ShapeProps extends StageElement, ShapeEventProps {
    left: number;
    top: number;
    width: number;
    height: number;
    children?: FunctionComponent;
}

/**
 * 矩形属性
 */
interface RectProps extends ShapeProps {
    
};