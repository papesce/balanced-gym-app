import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExercisePage from '../components/exercisePage/ExercisePage';
import { IExercise } from '../model/ExerciseModel';
import { loadExercise } from '../redux/actions.exercise';
import { withRouter } from "react-router";

interface ExerciseProps {
    loading: boolean;
    error: string;
    exercise: IExercise;
    loadExercise?: (exerciseId: string) => {};
    match?: any;
    history?: any;
}

export class Exercise extends Component<ExerciseProps> {
    componentDidMount = () => {
       const { loadExercise, match : { params : { exerciseId }} 
            } = this.props;
       loadExercise && loadExercise(exerciseId);
    }
    render() {
        const { loading, error, exercise } = this.props;
        return (<>
           <ExercisePage 
             loading={loading}
             error={error} 
             exercise={exercise}
             />
             </>
        )
    }
}

const mapStateToProps = (state: any) => {
    // console.log('state changed:', state)
    const { loading, error, exercise = {} } = state.exerciseState;
    return {
        loading, error, exercise
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        loadExercise: (exerciseId: string) =>
            dispatch(loadExercise(exerciseId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Exercise))