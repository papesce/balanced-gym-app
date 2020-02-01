import { IRoutine } from '../model/RoutineModel';
import { handleErrors } from './utils';

 export const FETCH_ROUTINE_BEGIN   = 'FETCH_ROUTINE_BEGIN';
 export const FETCH_ROUTINE_SUCCESS = 'FETCH_ROUTINE_SUCCESS';
 export const FETCH_ROUTINE_FAILURE = 'FETCH_ROUTINE_FAILURE';
 
 
 export const fetchRoutineBegin = () => ({
     type: FETCH_ROUTINE_BEGIN
   });
   
   export const fetchRoutineSuccess = (routine: IRoutine) => ({
     type: FETCH_ROUTINE_SUCCESS,
     payload: { routine }
   });
   
   export const fetchRoutineFailure = (error: string) => ({
     type: FETCH_ROUTINE_FAILURE,
     payload: { error }
   });
 
 export const loadRoutine = (routineId: string) => (dispatch: any) => {
      dispatch(fetchRoutineBegin());
      return fetch(`${process.env.REACT_APP_SERVER}/api/routine/${routineId}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(routine => {
          dispatch(fetchRoutineSuccess(routine))
          return routine;
      })
      .catch(error => dispatch(
          fetchRoutineFailure(error))
      );
  }; 

 