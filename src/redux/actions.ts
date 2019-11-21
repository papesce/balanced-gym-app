import { IRoutine } from './../model/RoutineModel';

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
     return fetch('https://balanced-gym-dev.herokuapp.com/routines')
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

 function handleErrors(response: any) {
     if (!response.ok) {
       throw Error(response.statusText);
     }
     return response;
   }