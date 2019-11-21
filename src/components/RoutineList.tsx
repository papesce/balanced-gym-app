import React, { Component } from 'react'
import { ElemList } from './ElemList';
import { IRoutine } from '../model/RoutineModel'
import { getDaysFromString } from '../utils/dateUtils';
import { addS } from '../utils/utils';

interface RoutineListProps {
    loading?: boolean;
    error?: string;
    data?: IRoutine[],
    noDataMsg?: string
}

const getId = (routine: IRoutine) => {
    return routine._id;
}

export const getSecondary = (routine: IRoutine) => {
    let text = '';
    const tcount = routine.targetsCount;
    if (tcount === undefined) {
        return 'No targets';
    }
    const ecount = routine.exercisesCount;  
    if (tcount === 0 || !routine.lastUpdated) {
            text = addS('target', tcount);
    } else {
    // TODO Color for labels
        const days = getDaysFromString(routine.lastUpdated);    
        // self.daysLabel.textColor = Utils.getLabelColor(count: days)
        text = `${addS('day', days)} ${addS('target', tcount)} ${addS('exercise', ecount)}`
        if (routine.doneToday > 0) {
            text = text + ` ${routine.doneToday} done today`;
        }
    }
    return text;
}
export const getPrimary = (elem: IRoutine) => {
    return elem.name; 
 };

export default class RoutineList extends Component<RoutineListProps> {
    
    render() {
        const { data = [], loading, error, noDataMsg = "No routines" } = this.props;
        return (
            <ElemList loading={loading} data={data}
                getPrimary={getPrimary} 
                getSecondary={getSecondary}
                getId={getId}
                error={error ? "Error loading routines" : undefined}
                noDataMsg={noDataMsg}
            >
            </ElemList>
        )
    }
}
