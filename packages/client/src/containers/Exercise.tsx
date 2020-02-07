import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExercisePage from '../components/pages/exercisePage/ExercisePage';
import { IExercise, IRoutine, IMuscleGroup, IMuscle, ISerie } from 'balanced-gym-model';
import { ISerieState } from '../redux/reducer.serie';
import { loadExercise } from '../redux/actions.exercise';
import { withRouter } from "react-router";
import { newSerie, editSerie, deleteSerie } from '../redux/actions.serie';
import ExerciseHeader from '../components/headerBar/ExerciseHeader';
import { getTargetURL } from '../utils/routes';

interface ExerciseProps {
    loading: boolean;
    error: string;
    exercise: IExercise;
    loadExercise?: (exerciseId: string) => {};
    match?: any;
    history?: any;
    editSerie?: (exerciseId: string, serie: ISerie) => {};
    newSerie?: (exerciseId: string, suggestedSerie: ISerie) => {};
    deleteSerie?: (exerciseId:string, serieId: string) => {};
    deleting?: boolean;
    editing?: boolean;
    creating?: boolean;
    creatingError?: string;
    deletingError?: string;
    editingError?: string;
    handleBack?: () => void;
}

const getError = (error: string,
     creatingError: string,
      editingError: string,
       deletingError: string) => {
    if (error) {
        return "Error loading exericse";
    }
    if (creatingError) {
        return "Error creating serie";
    }
    if (editingError) {
        return "Error editing serie";
    }
    if (deletingError) {
        return "Error deleting serie";
    }
    return undefined;
} 
    

export class Exercise extends Component<ExerciseProps> {
    componentDidMount = () => {
       const { loadExercise, match : { params : { exerciseId }} 
            } = this.props;
       loadExercise && loadExercise(exerciseId);
    }
    newSerie = (restTime?: number) => {
        const { newSerie, exercise } = this.props;
        const { suggestedSerie = {_id: '', reps: 0, weight:0}} = exercise;
        const serie: ISerie = {...suggestedSerie};
        if (restTime && restTime > 0) {
            serie.restTime = restTime;
        } 
        newSerie && newSerie(exercise._id, serie); 
    }
    handleBack = () => {
        const { history, exercise } = this.props;
        const emptyRoutine: IRoutine = { _id: '', name: ''};
        const emptyMuscleGroup: IMuscleGroup = { _id: '',  name: ''};
        const emptyTarget: IMuscle = { _id: '', name: ''};
        const { 
            routineId = emptyRoutine, 
            muscleGroup = emptyMuscleGroup,
            target = emptyTarget } = exercise;
        history.push(getTargetURL(routineId._id, muscleGroup._id, target._id));
    }
    render() {
        const { loading, error, exercise, editSerie, deleteSerie,
          creating, deleting, editing, creatingError = '', editingError = '',
          deletingError = ''} = this.props;
        const theError = getError(error, creatingError, editingError, deletingError);
        const isLoading = loading || creating || deleting || editing;
        return (<>
           <ExerciseHeader handleBack={this.handleBack} ></ExerciseHeader>
           <ExercisePage
             loading={isLoading}
             error={theError} 
             exercise={exercise}
             handleAddSerie={this.newSerie}
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
        newSerie:  (exerciseId: string, suggestedSerie: ISerie) => dispatch(newSerie(exerciseId, suggestedSerie)),
        deleteSerie: (exerciseId:string, serieId: string) => dispatch(deleteSerie(exerciseId, serieId)),
        loadExercise: (exerciseId: string) =>
            dispatch(loadExercise(exerciseId))
        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Exercise))