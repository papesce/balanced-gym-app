import { configureStore, getDefaultMiddleware }  from '@reduxjs/toolkit'
import { routinesReducer } from './reducer';

export const createStore = () => configureStore({
    reducer: {
        routinesState: routinesReducer,
    },
    middleware: [...getDefaultMiddleware()],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: {},
    enhancers: []
});

