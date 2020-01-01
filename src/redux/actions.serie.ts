import { IExercise } from '../model/ExerciseModel';
import { ISerie } from '../model/SerieModel';
import { handleErrors } from './utils';

export const NEW_SERIE_BEGIN   = 'NEW_SERIE_BEGIN';
export const NEW_SERIE_SUCCESS = 'NEW_SERIE_SUCCESS';
export const NEW_SERIE_FAILURE = 'NEW_SERIE_FAILURE';
export const EDIT_SERIE_BEGIN   = 'EDIT_SERIE_BEGIN';
export const EDIT_SERIE_SUCCESS = 'EDIT_SERIE_SUCCESS';
export const EDIT_SERIE_FAILURE = 'EDIT_SERIE_FAILURE';
export const DELETE_SERIE_BEGIN   = 'DELETE_SERIE_BEGIN';
export const DELETE_SERIE_SUCCESS = 'DELETE_SERIE_SUCCESS';
export const DELETE_SERIE_FAILURE = 'DELETE_SERIE_FAILURE';

export const newSerieBegin = () => ({
    type: NEW_SERIE_BEGIN
  });
  
  export const newSerieSuccess = (exercise: IExercise, serie: ISerie) => ({
    type: NEW_SERIE_SUCCESS,
    payload: { exercise, serie }
  });
  
  export const newSerieFailure = (error: string) => ({
    type: NEW_SERIE_FAILURE,
    payload: { error }
  });

  export const editSerieBegin = () => ({
    type: EDIT_SERIE_BEGIN
  });
  
  export const editSerieSuccess = (serie: ISerie) => ({
    type: EDIT_SERIE_SUCCESS,
    payload: { serie }
  });
  
  export const editSerieFailure = (error: string) => ({
    type: EDIT_SERIE_FAILURE,
    payload: { error }
  });

  export const deleteSerieBegin = () => ({
    type: DELETE_SERIE_BEGIN
  });
  
  export const deleteSerieSuccess = (exercise: IExercise, serie: ISerie) => ({
    type: DELETE_SERIE_SUCCESS,
    payload: { exercise, serie }
  });
  
  export const deleteSerieFailure = (error: string) => ({
    type: DELETE_SERIE_FAILURE,
    payload: { error }
  });

export const newSerie = (exerciseId: string) => (dispatch: any) => {
     dispatch(newSerieBegin());
     return fetch(`${process.env.REACT_APP_SERVER}/api/newSerie/${exerciseId}`,
     { method: 'post' })
     .then(handleErrors)
     .then(res => res.json())
     .then(result => {
         debugger;
         dispatch(newSerieSuccess(result.exercise, result.serie))
         return result;
     })
     .catch(error => dispatch(
         newSerieFailure(error))
     );
 }; 

 export const editSerie = (serie: ISerie) => (dispatch: any) => {
    dispatch(editSerieBegin());
    const body: any = { serie };
    return fetch(`${process.env.REACT_APP_SERVER}/api/serie/${serie._id}`,
    { method: 'patch', body })
    .then(handleErrors)
    .then(res => res.json())
    .then(serie => {
        dispatch(editSerieSuccess(serie))
        return serie;
    })
    .catch(error => dispatch(
        editSerieFailure(error))
    );
}; 

export const deleteSerie = (exerciseId:string, serieId: string) => (dispatch: any) => {
    dispatch(deleteSerieBegin());
    return fetch(`${process.env.REACT_APP_SERVER}/api/exercise/${exerciseId}/serie/${serieId}`,
    {method: 'delete'})
    .then(handleErrors)
    .then(res => res.json())
    .then(result => {
        dispatch(deleteSerieSuccess(result.exercise, result.deletedSerie))
        return result;
    })
    .catch(error => dispatch(
        deleteSerieFailure(error))
    );
}; 