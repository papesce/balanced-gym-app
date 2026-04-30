import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IRoutineSummary,
  IExerciseDao,
  IMuscleDao,
  IMuscleGroupDao,
} from 'balanced-gym-model';
import { auth } from '../firebase';

export interface IExerciseListItem {
  _id: string;
  name: string;
  muscleGroup: { _id: string; name: string };
  target: { _id: string; name: string };
  equipment?: string;
  gifURL?: string;
  exerciseURL?: string;
  routineId?: { _id: string; name: string };
  synergists?: { _id: string; name: string }[];
  stabilizers?: { _id: string; name: string }[];
  lastReps?: number;
  lastWeight?: number;
  normalizedWeight?: number;
  suggestedSerie?: { reps: number; weight: number };
  lastUpdated?: string;
  series?: any[];
  links?: string[];
}

export interface IExerciseCreate {
  name: string;
  muscleGroup?: string;
  target?: string;
  gifURL: string;
  exerciseURL?: string;
  equipment?: string;
  synergists?: string[];
  stabilizers?: string[];
  routineId?: string;
  links?: string[];
}

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: async (headers) => {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Exercise', 'Muscle', 'MuscleGroup', 'Routine'],
  endpoints: (builder) => ({
    // Read endpoints
    getRoutines: builder.query<IRoutineSummary[], void>({
      query: () => '/routines',
      providesTags: ['Routine'],
    }),
    getExercises: builder.query<IExerciseListItem[], Record<string, string> | void>({
      query: (params) => {
        if (params) {
          const searchParams = new URLSearchParams(params).toString();
          return `/exercises?${searchParams}`;
        }
        return '/exercises';
      },
      providesTags: ['Exercise'],
    }),
    getMuscles: builder.query<IMuscleDao[], void>({
      query: () => '/muscles',
      providesTags: ['Muscle'],
    }),
    getMuscleGroups: builder.query<IMuscleGroupDao[], void>({
      query: () => '/muscleGroups',
      providesTags: ['MuscleGroup'],
    }),

    // Exercise mutations
    createExercise: builder.mutation<IExerciseDao, { routineId: string; data: IExerciseCreate }>({
      query: ({ routineId, data }) => ({
        url: `/newExercise/${routineId}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Exercise'],
    }),
    updateExercise: builder.mutation<IExerciseDao, { exerciseId: string; data: Partial<IExerciseCreate> }>({
      query: ({ exerciseId, data }) => ({
        url: `/exercise/${exerciseId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Exercise'],
    }),
    deleteExercise: builder.mutation<void, string>({
      query: (exerciseId) => ({
        url: `/exercise/${exerciseId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Exercise'],
    }),

    // Muscle mutations
    createMuscle: builder.mutation<IMuscleDao, { name: string; muscleURL?: string }>({
      query: (data) => ({
        url: '/newMuscle',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Muscle'],
    }),
    updateMuscle: builder.mutation<IMuscleDao, { muscleId: string; data: { name?: string; muscleURL?: string } }>({
      query: ({ muscleId, data }) => ({
        url: `/muscle/${muscleId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Muscle'],
    }),
  }),
});

export const {
  useGetRoutinesQuery,
  useGetExercisesQuery,
  useGetMusclesQuery,
  useGetMuscleGroupsQuery,
  useCreateExerciseMutation,
  useUpdateExerciseMutation,
  useDeleteExerciseMutation,
  useCreateMuscleMutation,
  useUpdateMuscleMutation,
} = adminApi;
