import { IExercise, ISerie } from 'balanced-gym-model';
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
  
  export const editSerieSuccess = (exercise:IExercise, serie: ISerie) => ({
    type: EDIT_SERIE_SUCCESS,
    payload: { exercise, serie }
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

export const newSerie = (exerciseId: string, suggestedSerie: ISerie) => (dispatch: any) => {
     dispatch(newSerieBegin());
     delete suggestedSerie._id;
     const body: any = { suggestedSerie };
     return fetch(`${process.env.REACT_APP_SERVER}/api/newSerie/${exerciseId}`,
     { method: 'post',
       headers: { 'content-type': 'application/json' },
       body: JSON.stringify(body) 
      })
     .then(handleErrors)
     .then(res => res.json())
     .then(result => {
         dispatch(newSerieSuccess(result.exercise, result.serie))
         return result;
     })
     .catch(error => dispatch(
         newSerieFailure(error))
     );
 }; 

 export const editSerie = (exerciseId: string, serie: ISerie) => (dispatch: any) => {
    dispatch(editSerieBegin());
    const body: any = { weight: serie.weight, reps: serie.reps };
    return fetch(`${process.env.REACT_APP_SERVER}/api/updateSerie/${serie._id}/exercise/${exerciseId}`,
      { method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(body)
      })
    .then(handleErrors)
    .then(res => res.json())
    .then(result => {
        dispatch(editSerieSuccess(result.exercise, result.serie))
        return result;
    })
    .catch(error => {
      // console.log('patch api/exercise/:id/serie/:id', error.message);
      dispatch(
        editSerieFailure(error.message))
      });
}; 

export const deleteSerie = (exerciseId:string, serieId: string) => (dispatch: any) => {
    dispatch(deleteSerieBegin());
    return fetch(`${process.env.REACT_APP_SERVER}/api/deleteSerie/${serieId}/exercise/${exerciseId}`,
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