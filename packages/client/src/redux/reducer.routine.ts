import {
    FETCH_ROUTINE_BEGIN, FETCH_ROUTINE_SUCCESS, FETCH_ROUTINE_FAILURE } 
    from './actions.routine';
import { IRoutine } from 'balanced-gym-model';
    
   export interface IRoutineState {
      loading?: boolean;
      error?: string;
      routine?: IRoutine;
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