import { exercisePage } from './../components/exercisePage/ExercisePage.stories';
import { configureStore, getDefaultMiddleware }  from '@reduxjs/toolkit'
import { routinesReducer, routineReducer, muscleGroupReducer, targetReducer, exerciseReducer } from './reducer';

export const createStore = () => configureStore({
    reducer: {
        routinesState: routinesReducer,
        routineState: routineReducer,
        muscleGroupState: muscleGroupReducer,
        targetState: targetReducer,
        exerciseState: exerciseReducer
    },
    middleware: [...getDefaultMiddleware()],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: {},
    enhancers: []
});

