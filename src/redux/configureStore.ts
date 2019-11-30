import { configureStore, getDefaultMiddleware }  from '@reduxjs/toolkit'
import { routinesReducer, routineReducer, muscleGroupReducer } from './reducer';

export const createStore = () => configureStore({
    reducer: {
        routinesState: routinesReducer,
        routineState: routineReducer,
        muscleGroupState: muscleGroupReducer
    },
    middleware: [...getDefaultMiddleware()],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: {},
    enhancers: []
});

