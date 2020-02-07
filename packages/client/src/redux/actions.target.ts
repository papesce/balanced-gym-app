import { IMuscle } from 'balanced-gym-model';
import { handleErrors } from './utils';

export const FETCH_TARGET_BEGIN   = 'FETCH_TARGET_BEGIN';
export const FETCH_TARGET_SUCCESS = 'FETCH_TARGET_SUCCESS';
export const FETCH_TARGET_FAILURE = 'FETCH_TARGET_FAILURE';


export const fetchTargetBegin = () => ({
    type: FETCH_TARGET_BEGIN
  });
  
  export const fetchTargetSuccess = (target: IMuscle) => ({
    type: FETCH_TARGET_SUCCESS,
    payload: { target }
  });
  
  export const fetchTargetFailure = (error: string) => ({
    type: FETCH_TARGET_FAILURE,
    payload: { error }
  });

export const loadTarget = (routineId: string, muscleGroupId: string, targetId: string) => (dispatch: any) => {
     dispatch(fetchTargetBegin());
     return fetch(`${process.env.REACT_APP_SERVER}/api/routine/${routineId}/muscleGroup/${muscleGroupId}/target/${targetId}`)
     .then(handleErrors)
     .then(res => res.json())
     .then(routines => {
         dispatch(fetchTargetSuccess(routines))
         return routines;
     })
     .catch(error => dispatch(
         fetchTargetFailure(error))
     );
 }; 

 