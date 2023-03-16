import { HTMLProps, DOMAttributes } from "react";

declare type EventKey = keyof Omit<DOMAttributes<HTMLCanvasElement>, 'children' | 'dangerouslySetInnerHTML'>
/**
 * 用于存储Stage和所有形状的事件容器数据类型
 */
export declare type EventDictionaryType = { [key in keyof Omit<DOMAttributes<HTMLCanvasElement>, 'children' | 'dangerouslySetInnerHTML'>]?: { [rgbIndex: string]: (ev: DOMAttributes<HTMLCanvasElement>[key]) => void } };
/**
 * 形状事件
 */
declare type ShapeEventProps = { [key in EventKey]?: (ev: DOMAttributes<HTMLCanvasElement>[key]) => void };

declare type ActionType = {
    clear: () => void;
}
/**
 * 内容渲染区属性
 */
interface StageProps extends HTMLProps<HTMLCanvasElement> {
    /**
     * 渲染元素[形状、线条等]
     */
    children?: ReactNode;
    actionRef?: React.MutableRefObject<ActionType | undefined>
}

/**
 * 渲染元素
 */
interface StageElement {
    // context?: CanvasRenderingContext2D | null;
    offscreenIdx?: number;
}


/**
 * 形状属性
 */
interface ShapeProps extends StageElement, ShapeEventProps {
    left?: number;
    top?: number;
    width: number;
    height: number;
    children?: FunctionComponent;
}

/**
 * 矩形属性
 */
interface RectProps extends ShapeProps {
    style?: {
        backgroundColor?: string;
        borderRadius?: number;
        borderTopLeftRadius?: number;
        borderTopRightRadius?: number;
        borderBottomLeftRadius?: number;
        borderBottomRightRadius?: number;
        borderWidth?: number;
        borderTopWidth?: number;
        borderRightWidth?: number;
        borderBottompWidth?: number;
        borderLeftWidth?: number;
        borderColor?: string;
        borderTopColor?: string;
        borderRightColor?: string;
        borderBottomColor?: string;
        borderLeftColor?: string;
    }
};