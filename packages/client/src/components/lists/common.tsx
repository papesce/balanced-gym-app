import React from 'react';
import { IRoutine } from 'balanced-gym-model';
import { getTimeFromString, isToday } from '../../utils/dateUtils';
import { addS } from '../../utils/utils';

export const getRoutineSummary1 = (routine: IRoutine) => {
    const {targetsCount, exercisesCount = 0} = routine;
    let text = '';
    if (targetsCount === undefined) {
        return 'No targets';
    }
    if (targetsCount === 0) {
        return '0 targets';
    }
    text = `${text}${addS('target', targetsCount)} ${addS('exercise', exercisesCount)}`
    return text;
}

export const getRoutineSummary2 = (routine: IRoutine) => {
    const {targetsCount, lastUpdated, doneToday = 0} = routine;
    let text = '';
    if (targetsCount === undefined) {
        return '';
    }
    if (targetsCount === 0) {
        return '';
    }
    if (lastUpdated) {
        text = getTimeFromString(lastUpdated)
    } 
    if (doneToday) {
        text = `${text}, ${doneToday} done today`;
    }
    return text;
}


export const getSynsAndStabs = (synergistsCount: any, stabilizersCount: any) => {
    let text = ''
    if (synergistsCount || stabilizersCount) text = text + ` (`;
    if (synergistsCount) {
             text = text + `syns: ${synergistsCount}`;
    }
    if (stabilizersCount) {
        if (synergistsCount) text = text + `, `;
        text = text + `stbs: ${stabilizersCount}`;
    }
    if (synergistsCount || stabilizersCount) text = text + `)`;
    return text;
}

export const getColoredTextFromDateString = (text: string, date?: string) => {
    if (date) {
        return getColoredTextFromBoolean(text, isToday(new Date(date)));
    }
    return '';
}

export const getColoredTextFromBoolean = (text: string, isToday: boolean) => {
    if (text) {
        const color = (isToday) ? { color: "blue" } : {};
        return (<div style={color}>{text}</div>);
    }
    return '';
}


   
