import { configureStore, getDefaultMiddleware }  from '@reduxjs/toolkit'
import { routinesReducer } from './reducer';
import thunk from 'redux-thunk';

export const createStore = () => configureStore({
    reducer: {
        routines: routinesReducer,
    },
    middleware: [...getDefaultMiddleware()],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: {},
    enhancers: []
});

