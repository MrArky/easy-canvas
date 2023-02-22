import { Stage } from "@/components/EasyCanvas";
import React from "react";

/**
 * 简单地将图形绘制到画板
 * @returns 
 */
const HelloWorld: React.FC = () => {
    return <div>
        <p>hello world</p>
        <Stage></Stage>
    </div>
}

export default HelloWorld;