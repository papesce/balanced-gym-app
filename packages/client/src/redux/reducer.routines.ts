import { FETCH_ROUTINES_BEGIN, FETCH_ROUTINES_SUCCESS, FETCH_ROUTINES_FAILURE }
from './actions.routines';
import { IRoutineSummary } from 'balanced-gym-model';

export interface IRoutinesState {
  loading?: boolean;
  error?: string;
  routines?: IRoutineSummary[];
}

export const routinesReducer = (state: IRoutinesState = {} , action: any ) => {
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

