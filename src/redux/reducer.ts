import { IRoutineState } from './../model/RoutineModel';
import { IMuscleGroupState } from './../model/MuscleGroupModel';
import { FETCH_ROUTINES_BEGIN, FETCH_ROUTINES_SUCCESS, FETCH_ROUTINES_FAILURE,
  FETCH_ROUTINE_BEGIN, FETCH_ROUTINE_SUCCESS, FETCH_ROUTINE_FAILURE,
 FETCH_MUSCLE_GROUP_BEGIN, FETCH_MUSCLE_GROUP_FAILURE, FETCH_MUSCLE_GROUP_SUCCESS } from './actions';

export const routinesReducer = (state: IRoutineState = {} , action: any ) => {
    switch (action.type) {
      case FETCH_ROUTINES_BEGIN:
        return { loading: true };
      case FETCH_ROUTINES_SUCCESS:
        return { routines: action.payload.routines };
      case FETCH_ROUTINES_FAILURE:
        return { error : action.payload.error}        
      default:
        return state
    }
  }

  export const routineReducer = (state: IRoutineState = {} , action: any ) => {
    switch (action.type) {
      case FETCH_ROUTINE_BEGIN:
        return { loading: true };
      case FETCH_ROUTINE_SUCCESS:
        return { routine: action.payload.routine };
      case FETCH_ROUTINE_FAILURE:
        return { error : action.payload.error}        
      default:
        return state
    }
  }

  export const muscleGroupReducer = (state: IMuscleGroupState = {} , action: any ) => {
    switch (action.type) {
      case FETCH_MUSCLE_GROUP_BEGIN:
        return { loading: true };
      case FETCH_MUSCLE_GROUP_SUCCESS:
        return { muscleGroup: action.payload.muscleGroup };
      case FETCH_MUSCLE_GROUP_FAILURE:
        return { error : action.payload.error}        
      default:
        return state
    }
  }