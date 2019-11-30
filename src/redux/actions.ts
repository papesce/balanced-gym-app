import { IMuscleGroup } from './../model/MuscleGroupModel';
import { IRoutine } from './../model/RoutineModel';
import { handleErrors } from './utils';

export const FETCH_ROUTINES_BEGIN   = 'FETCH_ROUTINES_BEGIN';
export const FETCH_ROUTINES_SUCCESS = 'FETCH_ROUTINES_SUCCESS';
export const FETCH_ROUTINES_FAILURE = 'FETCH_ROUTINES_FAILURE';


export const fetchRoutinesBegin = () => ({
    type: FETCH_ROUTINES_BEGIN
  });
  
  export const fetchRoutinesSuccess = (routines: IRoutine[]) => ({
    type: FETCH_ROUTINES_SUCCESS,
    payload: { routines }
  });
  
  export const fetchRoutinesFailure = (error: string) => ({
    type: FETCH_ROUTINES_FAILURE,
    payload: { error }
  });

export const loadRoutines = () => (dispatch: any) => {
     dispatch(fetchRoutinesBegin());
     return fetch(`${process.env.REACT_APP_SERVER}/routines`)
     .then(handleErrors)
     .then(res => res.json())
     .then(routines => {
         dispatch(fetchRoutinesSuccess(routines))
         return routines;
     })
     .catch(error => dispatch(
         fetchRoutinesFailure(error))
     );
 }; 

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
      return fetch(`${process.env.REACT_APP_SERVER}/routine/${routineId}`)
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

  export const FETCH_MUSCLE_GROUP_BEGIN   = 'FETCH_MUSCLE_GROUP_BEGIN';
 export const FETCH_MUSCLE_GROUP_SUCCESS = 'FETCH_MUSCLE_GROUP_SUCCESS';
 export const FETCH_MUSCLE_GROUP_FAILURE = 'FETCH_MUSCLE_GROUP_FAILURE';
 
 
 export const fetchMuscleGroupBegin = () => ({
     type: FETCH_MUSCLE_GROUP_BEGIN
   });
   
   export const fetchMuscleGroupSuccess = (muscleGroup: IMuscleGroup) => ({
     type: FETCH_MUSCLE_GROUP_SUCCESS,
     payload: { muscleGroup }
   });
   
   export const fetchMuscleGroupFailure = (error: string) => ({
     type: FETCH_MUSCLE_GROUP_FAILURE,
     payload: { error }
   });
 
 export const loadMuscleGroup = (routineId: string, muscleGroupId: string) => (dispatch: any) => {
      dispatch(fetchMuscleGroupBegin());
      return fetch(`${process.env.REACT_APP_SERVER}/routine/${routineId}/muscleGroup/${muscleGroupId}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(routine => {
          dispatch(fetchMuscleGroupSuccess(routine))
          return routine;
      })
      .catch(error => dispatch(
          fetchMuscleGroupFailure(error))
      );
  }; 
 