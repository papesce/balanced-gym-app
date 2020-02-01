import { configureStore, getDefaultMiddleware }  from '@reduxjs/toolkit'
import { routinesReducer } from './reducer.routines';
import { routineReducer } from './reducer.routine';
import { muscleGroupReducer } from './reducer.muscleGroup';
import { targetReducer } from './reducer.target';
import { exerciseReducer } from './reducer.exercise';
import { serieReducer } from './reducer.serie';

export const createStore = () => configureStore({
    reducer: {
        routinesState: routinesReducer,
        routineState: routineReducer,
        muscleGroupState: muscleGroupReducer,
        targetState: targetReducer,
        exerciseState: exerciseReducer,
        serieState: serieReducer
    },
    middleware: [...getDefaultMiddleware()],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: {},
    enhancers: []
});

