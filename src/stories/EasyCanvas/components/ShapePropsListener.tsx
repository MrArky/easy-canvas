import { useContext, useEffect } from "react";
import { EventKey } from "../typing";
import { StageContext } from "../utils/Context";
import { $eventNames } from "../utils/Macro";

const ShapePropsListener: React.FC<{ children?: any }> = (props) => {
    const { eventDictionary } = useContext(StageContext);
    useEffect(() => {
        //注册事件
        for (let propName of Object.keys(props.children.props)) {
            if ($eventNames.includes(propName as EventKey)) {
                if (eventDictionary![propName as EventKey]) eventDictionary![propName as EventKey]![props.children.props.offscreenIdx.toString()] = props.children.props[propName];
                else {
                    eventDictionary![propName as EventKey] = {
                        [props.children.props.offscreenIdx.toString()]: props.children.props[propName]
                    }
                }
            }
        }
        //销毁事件
        return () => {
            for (let propName of Object.keys(props.children.props)) {
                if ($eventNames.includes(propName as EventKey)) {
                    delete eventDictionary![propName as EventKey]![props.children.props.offscreenIdx.toString()];
                }
            }
        }
    }, [props.children.props, eventDictionary]);
    return <>{props.children}</>
}

export default ShapePropsListener;