import { configureStore, getDefaultMiddleware }  from '@reduxjs/toolkit'
import { routinesReducer, routineReducer, muscleGroupReducer, targetReducer } from './reducer';

export const createStore = () => configureStore({
    reducer: {
        routinesState: routinesReducer,
        routineState: routineReducer,
        muscleGroupState: muscleGroupReducer,
        targetState: targetReducer
    },
    middleware: [...getDefaultMiddleware()],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: {},
    enhancers: []
});

