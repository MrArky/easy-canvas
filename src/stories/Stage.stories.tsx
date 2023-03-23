import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { useEffect, useRef, useState } from "react";
import { Rect, Stage } from "./EasyCanvas";
import { ActionType } from "./EasyCanvas/typing";

export default {
    title: 'Example/Stage',
    component: Stage,
} as ComponentMeta<typeof Stage>;

const Template: ComponentStory<typeof Stage> = (args) => {
    const ref = useRef<ActionType>();
    const [bkColor, setBkColor] = useState('blue');
    const [greenSize, setGreenSize] = useState({ width: 30, height: 30 });
    const [position, setPosition] = useState({ left: 10, top: 10 });
    const [redPosition, setRedPosition] = useState({
        left: 200,
        top: 50
    });
    const func = (ev: React.MouseEventHandler<HTMLCanvasElement> | undefined) => {
        console.log('鼠标进入蓝色矩形了');
        setBkColor('pink');
    };
    const [showBlue, setShowBlue] = useState(true);
    const [blueMouseEnter, setBlueMouseEnter] = useState(() => func)
    useEffect(() => {
        let ps = { left: 120, top: 50 };
        let redDirection = { x: 1, y: 1 };
        let animate = () => {
            if (ps.left + 100 < (args.width ?? 600) && redDirection.x == 1) redDirection.x = 1
            else redDirection.x = -1
            if (ps.left > 0 && redDirection.x == -1) redDirection.x = -1
            else redDirection.x = 1
            if (ps.top + 100 < (args.height ?? 300) && redDirection.y == 1) redDirection.y = 1
            else redDirection.y = -1
            if (ps.top > 0 && redDirection.y == -1) redDirection.y = -1
            else redDirection.y = 1
            ps.left += 2 * redDirection.x;
            ps.top += 2 * redDirection.y;
            setRedPosition({ ...ps });
        };
        // let si = setInterval(animate, 1000 / 60);
        // return () => {
        //     clearInterval(si);
        // }
        // (function animloop() {
        //     animate();
        //     window.requestAnimationFrame(animloop);
        // })();
    }, []);
    return <>
        <Stage {...args} actionRef={ref} >
            <>
                <>
                    <>
                        {showBlue && <Rect
                            left={position.left}
                            top={position.top}
                            width={100}
                            height={100}
                            // onClick={() => { console.log('蓝色矩形被点击了') }}
                            style={{
                                backgroundColor: bkColor,
                                borderTopColor: 'red',
                                borderRadius: 10,
                                borderWidth: 40,
                                // borderRadius: 50,
                                borderTopLeftRadius: [0, 0],
                            }}
                            // onMouseEnter={blueMouseEnter!}
                            // onMouseLeave={() => {
                            //     console.log('鼠标离开蓝色矩形了');
                            //     setBkColor('blue');
                            // }}
                        />}
                    </>
                </>
                <Rect
                    left={redPosition.left}
                    top={redPosition.top}
                    width={100}
                    height={100}
                    // onClick={() => { console.log('红色矩形被点击了') }}
                    style={{
                        backgroundColor: "#CCC",
                    }}
                    // onMouseEnter={() => console.log('鼠标进入红色矩形了')}
                    // onMouseLeave={() => console.log('鼠标离开红色矩形了')}
                >
                    <Rect
                        left={10}
                        top={10}
                        width={50}
                        height={50}
                        // onClick={() => { console.log('黄色矩形被点击了') }}
                        style={{ backgroundColor: "yellow" }}
                        // onMouseEnter={() => console.log('鼠标进入黄色矩形了')}
                        // onMouseLeave={() => console.log('鼠标离开黄色矩形了')}
                    >
                        <Rect
                            left={10}
                            top={10}
                            width={greenSize.width}
                            height={greenSize.height}
                            // onClick={() => { console.log('绿色矩形被点击了') }}
                            style={{ backgroundColor: "green" }}
                            // onMouseEnter={() => console.log('鼠标进入绿色矩形了')}
                            // onMouseLeave={() => console.log('鼠标离开绿色矩形了')}
                        >
                            <div></div>
                        </Rect>
                    </Rect>
                </Rect>
            </>
        </Stage>
        <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => {
                setPosition({
                    ...position,
                    left: position.left + 2
                })
            }}>点击移动蓝色矩形</button>
            <button onClick={() => {
                setShowBlue(!showBlue)
            }}>隐藏显示蓝色矩形</button>
            <button onClick={() => {
                setBlueMouseEnter(() => () => {
                    console.log('#####鼠标进入蓝色矩形了#####');
                    setBkColor('purple');
                })
            }}>修改蓝色矩形MouseEnter</button>
            <button onClick={() => {
                if (greenSize.width == 30) setGreenSize({ width: 20, height: 20 });
                else setGreenSize({ width: 30, height: 30 });
            }}>改变绿色矩形大小</button>
        </div>
    </>
};

export const Default = Template.bind({});


Default.args = {
    width: 600,
    height: 300,
    style: { backgroundColor: "#EEE" },
    // onClick: () => console.log('Stage被点击了'),
    // onMouseEnter: () => console.log('鼠标进入Stage了'),
    // onMouseLeave: () => console.log('鼠标离开Stage了')
}