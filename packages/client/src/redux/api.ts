import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IRoutineSummary, IRoutine, IMuscleGroup, IMuscle, IExercise, ISerie, ISerieUpdate } from 'balanced-gym-model';

export const gymApi = createApi({
  reducerPath: 'gymApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API,
    prepareHeaders: async (headers) => {
      const { auth } = await import('../firebase');
      const token = await auth.currentUser?.getIdToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Exercise'],
  endpoints: (builder) => ({
    getRoutines: builder.query<IRoutineSummary[], void>({
      query: () => '/routines',
    }),
    getRoutine: builder.query<IRoutine, string>({
      query: (routineId) => `/routine/${routineId}`,
    }),
    getMuscleGroup: builder.query<IMuscleGroup, { routineId: string; muscleGroupId: string }>({
      query: ({ routineId, muscleGroupId }) => `/routine/${routineId}/muscleGroup/${muscleGroupId}`,
    }),
    getTarget: builder.query<IMuscle, { routineId: string; muscleGroupId: string; targetId: string }>({
      query: ({ routineId, muscleGroupId, targetId }) =>
        `/routine/${routineId}/muscleGroup/${muscleGroupId}/target/${targetId}`,
    }),
    getExercise: builder.query<IExercise, string>({
      query: (exerciseId) => `/exercise/${exerciseId}`,
      providesTags: (result, error, id) => [{ type: 'Exercise', id }],
    }),
    newSerie: builder.mutation<{ exercise: IExercise; serie: ISerie }, { exerciseId: string; body: ISerieUpdate }>({
      query: ({ exerciseId, body }) => ({
        url: `/newSerie/${exerciseId}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { exerciseId }) => [{ type: 'Exercise', id: exerciseId }],
    }),
    editSerie: builder.mutation<{ exercise: IExercise; serie: ISerie }, { serieId: string; exerciseId: string; body: ISerieUpdate }>({
      query: ({ serieId, exerciseId, body }) => ({
        url: `/updateSerie/${serieId}/exercise/${exerciseId}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, { exerciseId }) => [{ type: 'Exercise', id: exerciseId }],
    }),
    deleteSerie: builder.mutation<{ exercise: IExercise }, { serieId: string; exerciseId: string }>({
      query: ({ serieId, exerciseId }) => ({
        url: `/deleteSerie/${serieId}/exercise/${exerciseId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { exerciseId }) => [{ type: 'Exercise', id: exerciseId }],
    }),
  }),
});

export const {
  useGetRoutinesQuery,
  useGetRoutineQuery,
  useGetMuscleGroupQuery,
  useGetTargetQuery,
  useGetExerciseQuery,
  useNewSerieMutation,
  useEditSerieMutation,
  useDeleteSerieMutation,
} = gymApi;
