import { FETCH_MUSCLE_GROUP_BEGIN, FETCH_MUSCLE_GROUP_FAILURE, FETCH_MUSCLE_GROUP_SUCCESS,
} from './actions.muscleGroup';
import { IMuscleGroupState } from './../model/MuscleGroupModel';

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