import { EDIT_SERIE_BEGIN, EDIT_SERIE_FAILURE, EDIT_SERIE_SUCCESS,
 NEW_SERIE_BEGIN, NEW_SERIE_FAILURE, NEW_SERIE_SUCCESS,
DELETE_SERIE_BEGIN, DELETE_SERIE_FAILURE, DELETE_SERIE_SUCCESS } from './actions.serie';
import { ISerie } from 'balanced-gym-model';

export interface ISerieState {
  editing?: boolean;
  deleting?: boolean;
  creating?: boolean;
  editingError?: string;
  deletingError?: string;
  creatingError?: string;
  serie?: ISerie;
}

export const serieReducer = (state: ISerieState = {} , action: any ) => {
    switch (action.type) {
      case EDIT_SERIE_BEGIN:
        return { editing: true };
      case EDIT_SERIE_SUCCESS:
        return { serie: action.payload.serie };
      case EDIT_SERIE_FAILURE:
        return { editingError : action.payload.error};
      case NEW_SERIE_BEGIN:
          return { creating: true };
      case NEW_SERIE_SUCCESS:
          return { serie: action.payload.serie };
      case NEW_SERIE_FAILURE:
          return { creatingError : action.payload.error};
      case DELETE_SERIE_BEGIN:
            return { deleting: true };
      case DELETE_SERIE_SUCCESS:
            return { serie: action.payload.serie };
      case DELETE_SERIE_FAILURE:
            return { deletingError : action.payload.error}                
      default:
        return state
    }
  }