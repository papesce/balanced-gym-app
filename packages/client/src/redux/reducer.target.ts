import { FETCH_TARGET_BEGIN, FETCH_TARGET_FAILURE, FETCH_TARGET_SUCCESS} from './actions.target';
import { IMuscleState } from 'balanced-gym-model';

export const targetReducer = (state: IMuscleState = {} , action: any ) => {
    switch (action.type) {
      case FETCH_TARGET_BEGIN:
        return { loading: true };
      case FETCH_TARGET_SUCCESS:
        return { target: action.payload.target };
      case FETCH_TARGET_FAILURE:
        return { error : action.payload.error}        
      default:
        return state
    }
  }