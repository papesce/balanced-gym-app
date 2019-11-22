import { getSecondary } from './RoutineList';
import { IRoutine } from '../model/RoutineModel';
//

describe('RoutineList/getSecondary', () => {
    it('no targets', () => {
       const routine: IRoutine = { 
        targetsCount: 0,
        exercisesCount: 15,
        doneToday: 0,
        _id:'',
        name:'',
        updatedAt:'',
        createdAt:''
        };
        const text = getSecondary(routine);
        expect(text).toBe("0 targets")
    });
    it('never updated', () => {
        const routine: IRoutine = {
         targetsCount: 1,
         exercisesCount: 15,
         doneToday: 0,
         _id:'',
         name:'',
         updatedAt:'',
         createdAt:''
         };
         const text = getSecondary(routine);
         expect(text).toBe("1 target 15 exercises")
     });
     it('last updated yesterday', () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const routine: IRoutine = {
         targetsCount: 1,
         exercisesCount: 15,
         doneToday: 0,
         _id:'',
         name:'',
         updatedAt:'',
         createdAt:'',
         lastUpdated:yesterday.toString()
         };
         const text = getSecondary(routine);
         expect(text).toBe("1 day 1 target 15 exercises");
     });
     it('last updated yesterday doneToday 2', () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const routine: IRoutine = {
         targetsCount: 1,
         exercisesCount: 15,
         doneToday: 2,
         _id:'',
         name:'',
         updatedAt:'',
         createdAt:'',
         lastUpdated:yesterday.toString()
         };
         const text = getSecondary(routine);
         expect(text).toBe("1 day 1 target 15 exercises 2 done today");
     });
     it('last updated yesterday doneToday 2', () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const routine: IRoutine = {
         targetsCount: 1,
         exercisesCount: 15,
         doneToday: 2,
         _id:'',
         name:'',
         updatedAt:'',
         createdAt:'',
         lastUpdated:yesterday.toString()
         };
         const text = getSecondary(routine);
         expect(text).toBe("1 day 1 target 15 exercises 2 done today");
     });
})
