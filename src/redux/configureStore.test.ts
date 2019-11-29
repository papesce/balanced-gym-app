import { IRoutine } from './../model/RoutineModel';
import { fetchRoutinesBegin, fetchRoutinesSuccess, fetchRoutinesFailure,
fetchRoutineBegin, fetchRoutineSuccess, fetchRoutineFailure } from './actions';
import { createStore } from './configureStore';

describe('routines Reducer', () => {
    it('default store should be empty', () => {
         const store = createStore();
         const state = store.getState();
         expect(state.routinesState).toStrictEqual( {} );
    });
    it('fetchRoutinesBegin', () => {
        const store = createStore();
        store.dispatch(fetchRoutinesBegin());
        const state = store.getState();
        expect(state.routinesState).toStrictEqual({ loading: true });
    });
    it('fetchRoutinesSuccess', () => {
        const store = createStore();
        const data: IRoutine[] = 
        [{ _id : '', name: '', 
         targetsCount: 0, exercisesCount: 0, doneToday: 0  }];
        store.dispatch(fetchRoutinesSuccess(data));
        const state = store.getState();
        expect(state.routinesState).toStrictEqual({ routines: data });
    });
    it('fetchRoutinesError', () => {
        const store = createStore();
        store.dispatch(fetchRoutinesFailure('Error message'));
        const state = store.getState();
        expect(state.routinesState).toStrictEqual({ error: 'Error message' });
    });
    
    
})

describe('routine Reducer', () => {
    it('default store should be empty', () => {
         const store = createStore();
         const state = store.getState();
         expect(state.routineState).toStrictEqual( {} );
    });
    it('fetchRoutineBegin', () => {
        const store = createStore();
        store.dispatch(fetchRoutineBegin());
        const state = store.getState();
        expect(state.routineState).toStrictEqual({ loading: true });
    });
    it('fetchRoutineSuccess', () => {
        const store = createStore();
        const routine: IRoutine = 
        { _id : '', name: '', 
         targetsCount: 0, exercisesCount: 0, doneToday: 0  };
        store.dispatch(fetchRoutineSuccess(routine));
        const state = store.getState();
        expect(state.routineState).toStrictEqual({ routine });
    });
    it('fetchRoutineError', () => {
        const store = createStore();
        store.dispatch(fetchRoutineFailure('Error message'));
        const state = store.getState();
        expect(state.routineState).toStrictEqual({ error: 'Error message' });
    });
    
    
})
 