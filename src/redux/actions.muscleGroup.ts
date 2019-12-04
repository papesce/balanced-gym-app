import { IMuscleGroup } from '../model/MuscleGroupModel';
import { handleErrors } from './utils';



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
 