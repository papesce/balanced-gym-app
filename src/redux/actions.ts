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

// export const loadRoutines = () => (dispatch) => {
//     dispatch(routinesLoading());
//     return fetch('/routine')
//     .then(handleErrors)
//     .then(res => res.json())
//     .then(json => {
//         dispatch(routinesSuccess(json.routines))
//         return json.products;
//     })
//     .catch(error => dispatch(
//         routineError(error))
//     ))
// } 

// function handleErrors(response) {
//     if (!response.ok) {
//       throw Error(response.statusText);
//     }
//     return response;
//   }