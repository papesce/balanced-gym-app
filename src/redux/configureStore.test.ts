import { IRoutine } from './../model/RoutineModel';
import { fetchRoutinesBegin, fetchRoutinesSuccess, fetchRoutinesFailure } from './actions';
import { createStore } from './configureStore';

describe('configureStore', () => {
    it('default store should be empty', () => {
         const store = createStore();
         const state = store.getState();
         expect(state).toStrictEqual( {routines: {} });
    });
    it('fetchRoutinesBegin', () => {
        const store = createStore();
        store.dispatch(fetchRoutinesBegin());
        const state = store.getState();
        expect(state).toStrictEqual({routines: { loading: true }});
    });
    it('fetchRoutinesSuccess', () => {
        const store = createStore();
        const data: IRoutine[] = 
        [{ _id : '', name: '', updatedAt: '', createdAt: '',
         targetsCount: 0, exercisesCount: 0, doneToday: 0  }];
        store.dispatch(fetchRoutinesSuccess(data));
        const state = store.getState();
        expect(state).toStrictEqual({routines: { data: data }});
    });
    it('fetchRoutinesError', () => {
        const store = createStore();
        store.dispatch(fetchRoutinesFailure('Error message'));
        const state = store.getState();
        expect(state).toStrictEqual({routines: { error: 'Error message' }});
    })
    
})
 