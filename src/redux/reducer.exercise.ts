import { NEW_SERIE_SUCCESS, DELETE_SERIE_SUCCESS } from './actions.serie';
import { FETCH_EXERCISE_BEGIN, FETCH_EXERCISE_FAILURE, FETCH_EXERCISE_SUCCESS } from './actions.exercise';
import { IExerciseState } from './../model/ExerciseModel';


export const exerciseReducer = (state: IExerciseState = {} , action: any ) => {
    switch (action.type) {
      case FETCH_EXERCISE_BEGIN:
        return { loading: true };
      case FETCH_EXERCISE_SUCCESS:
        return { exercise: action.payload.exercise };
      case FETCH_EXERCISE_FAILURE:
        return { error : action.payload.error};
      case NEW_SERIE_SUCCESS:
          return { exercise: action.payload.exercise }; 
      case DELETE_SERIE_SUCCESS:
          return { exercise: action.payload.exercise };          
      default:
        return state
    }
  }