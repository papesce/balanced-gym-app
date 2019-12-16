import React, { Component } from 'react';
import { IExercise } from '../../model/ExerciseModel';

interface DetailsPageProps {
    exercise: IExercise;
}

export default class DetailsPage extends Component {
    render() {
        // const { exercise } = this.props;
        return (
            <div>
            <div>
                Equipment:
            </div>
            <div>
                Last 2/3 Series:
                (r:2, w:10)
                (r:2, w:9)
            </div>
            <div>
                Suggested Serie: (r: 2, w: 15)
            </div>
            <div>
                Add New Serie:
            </div>
            <div>
                Series Count: 12
            </div>
            <div>
                Last Updated:  200 days ago
            </div>
            <div>
                syn:
            </div>
            <div>
                stab:
            </div> 
            </div>
        )
    }
}
