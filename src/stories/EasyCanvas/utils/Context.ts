import React from "react";
import { EventDictionaryType } from "../typing";

export const StageContext = React.createContext<{
    context?: CanvasRenderingContext2D | null;
    rgbContext?: CanvasRenderingContext2D | null;
    eventDictionary?: EventDictionaryType;
    // setEventDictionary?: React.Dispatch<React.SetStateAction<EventDictionaryType>>;
    idxPool?: number[];
}>({});