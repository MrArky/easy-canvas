import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Rect, Stage } from "./EasyCanvas";

export default {
    title: 'Example/Stage',
    component: Stage,
} as ComponentMeta<typeof Stage>;

const Template: ComponentStory<typeof Stage> = (args) => <Stage {...args} >
    <Rect
        left={10}
        top={10}
        width={100}
        height={100}
        onClick={() => {
            console.log('矩形1被点击了')
        }}
    />
    <Rect
        left={10}
        top={150}
        width={100}
        height={100}
        onClick={() => {
            console.log('矩形1被点击了')
        }}
    />
</Stage>;

export const Default = Template.bind({});


Default.args = {
    width: 600,
    height: 300,
}