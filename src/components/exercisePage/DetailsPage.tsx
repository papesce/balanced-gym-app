import React, { Component } from 'react';
import { IExercise } from '../../model/ExerciseModel';
import { getDaysFromString } from '../../utils/dateUtils';
import { addS } from '../../utils/utils';

interface DetailsPageProps {
    exercise: IExercise;
}

export default class DetailsPage extends Component<DetailsPageProps> {
    render() {
        const { exercise } = this.props;
        const { suggestedSerie = { reps: 0, weight:0}, 
               series = [],
               equipment = 'none',
               lastUpdated = '2018-02-05T22:15:47.918Z',
               synergists = [],
               stabilizers = [],
               lastReps = 0,
               lastWeight = 0 } = exercise;
        const days: number = getDaysFromString(lastUpdated); 
        return (
            <div>
            <div>
                Equipment: {equipment}
            </div>
            <div>
                Last reps: {lastReps}
            </div>
            <div>    
                Last weight: {lastWeight}
            </div>
            <div>
                Suggested Serie: (r: {suggestedSerie.reps}, w: {suggestedSerie.weight})
            </div>
            <div>
                Series Count: {series.length}
            </div>
            <div>
                Last Updated:  {addS('day', days)}
            </div>
            <div>
                syn Count: {synergists.length}
            </div>
            <div>
                stab Count: {stabilizers.length}
            </div> 
            </div>
        )
    }
}
