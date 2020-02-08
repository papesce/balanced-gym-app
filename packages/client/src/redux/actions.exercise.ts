import { IExercise } from 'balanced-gym-model';
import { handleErrors } from './utils';

export const FETCH_EXERCISE_BEGIN   = 'FETCH_EXERCISE_BEGIN';
export const FETCH_EXERCISE_SUCCESS = 'FETCH_EXERCISE_SUCCESS';
export const FETCH_EXERCISE_FAILURE = 'FETCH_EXERCISE_FAILURE';


export const fetchExerciseBegin = () => ({
    type: FETCH_EXERCISE_BEGIN
  });
  
  export const fetchExerciseSuccess = (exercise: IExercise) => ({
    type: FETCH_EXERCISE_SUCCESS,
    payload: { exercise }
  });
  
  export const fetchExerciseFailure = (error: string) => ({
    type: FETCH_EXERCISE_FAILURE,
    payload: { error }
  });

export const loadExercise = (exerciseId: string) => (dispatch: any) => {
     dispatch(fetchExerciseBegin());
     return fetch(`${process.env.REACT_APP_API}/exercise/${exerciseId}`)
     .then(handleErrors)
     .then(res => res.json())
     .then(exercise => {
         dispatch(fetchExerciseSuccess(exercise))
         return exercise;
     })
     .catch(error => {
        // console.log('actions.exercise.error', error); 
        return dispatch(fetchExerciseFailure(error));
      }
     );
 }; 

 