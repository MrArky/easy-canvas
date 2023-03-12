import React from "react";
import { EventDictionaryType } from "./Stage";

export const StageContext = React.createContext<{
    context?: CanvasRenderingContext2D | null;
    rgbContext?: CanvasRenderingContext2D | null;
    eventDictionary?: EventDictionaryType;
    setEventDictionary?: React.Dispatch<React.SetStateAction<EventDictionaryType>>
}>({});