import { configureStore, getDefaultMiddleware }  from '@reduxjs/toolkit'
import { routinesReducer, routineReducer } from './reducer';

export const createStore = () => configureStore({
    reducer: {
        routinesState: routinesReducer,
        routineState: routineReducer
    },
    middleware: [...getDefaultMiddleware()],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: {},
    enhancers: []
});

