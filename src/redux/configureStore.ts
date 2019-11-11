import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'

const store = configureStore({
    reducer: {
        // routines: routinesSlice,
    },
    middleware: [...getDefaultMiddleware()],
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: {},
    enhancers: []
})

export default store;