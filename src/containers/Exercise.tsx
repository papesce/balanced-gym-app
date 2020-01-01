import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExercisePage from '../components/exercisePage/ExercisePage';
import { IExercise } from '../model/ExerciseModel';
import { ISerie, ISerieState } from '../model/SerieModel';
import { loadExercise } from '../redux/actions.exercise';
import { withRouter } from "react-router";
import { newSerie, editSerie, deleteSerie } from '../redux/actions.serie';

interface ExerciseProps {
    loading: boolean;
    error: string;
    exercise: IExercise;
    loadExercise?: (exerciseId: string) => {};
    match?: any;
    history?: any;
    editSerie?: (exerciseId: string, serie: ISerie) => {};
    newSerie?: (exerciseId: string) => {};
    deleteSerie?: (exerciseId:string, serieId: string) => {};
    deleting?: boolean;
    editing?: boolean;
    creating?: boolean;
}

export class Exercise extends Component<ExerciseProps> {
    componentDidMount = () => {
       const { loadExercise, match : { params : { exerciseId }} 
            } = this.props;
       loadExercise && loadExercise(exerciseId);
    }
    newSerie = () => {
        const { newSerie, exercise } = this.props;
        newSerie && newSerie(exercise._id); 
    }
    render() {
        const { loading, error, exercise, editSerie, deleteSerie,
          creating, deleting, editing } = this.props;
        const isLoading = loading || creating || deleting || editing;
        return (<>
           {!isLoading && <button onClick={this.newSerie}>New</button>}
           <ExercisePage
             loading={isLoading}
             error={error} 
             exercise={exercise}
             handleEditSerie={editSerie}
             handleDeleteSerie={deleteSerie}
             />
             </>
        )
    }
}

const mapStateToProps = (state: any) => {
    // console.log('state changed:', state)
    const { loading, error, exercise = {} } = state.exerciseState;
    const serieState: ISerieState = state.serieState;;
    const { editing, deleting, creating, editingError, creatingError, deletingError } = serieState;
    return {
        loading, error, exercise,
        editing, deleting, creating, editingError, creatingError, deletingError
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        editSerie:  (exerciseId: string, serie: ISerie) => dispatch(editSerie(exerciseId, serie)),
        newSerie:  (exerciseId: string) => dispatch(newSerie(exerciseId)),
        deleteSerie: (exerciseId:string, serieId: string) => dispatch(deleteSerie(exerciseId, serieId)),
        loadExercise: (exerciseId: string) =>
            dispatch(loadExercise(exerciseId))
        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Exercise))