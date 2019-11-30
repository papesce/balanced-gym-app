import { ITarget } from './../model/TargetModel';
import { getRoutineSummary, getTargetSummary } from './common';
import { IRoutine } from '../model/RoutineModel';

describe('getSecondary', () => {
    it('no targets', () => {
        const routine: IRoutine = {
            _id:'',
            name:'',
            };
         const text = getRoutineSummary(routine);
         expect(text).toBe("No targets")
     });
    it('0 targets', () => {
        const routine: IRoutine = {
            _id:'',
            name:'',
            targetsCount: 0
            };
        const text = getRoutineSummary(routine);
        expect(text).toBe("0 targets")
    });
    it('never updated', () => {
        const routine: IRoutine = {
         targetsCount: 1,
         exercisesCount: 15,
         doneToday: 0,
         _id:'',
         name:'',
         };
         const text = getRoutineSummary(routine);
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
         lastUpdated:yesterday.toString()
         };
         const text = getRoutineSummary(routine);
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
         lastUpdated:yesterday.toString()
         };
         const text = getRoutineSummary(routine);
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
         lastUpdated:yesterday.toString()
         };
         const text = getRoutineSummary(routine);
         expect(text).toBe("1 day 1 target 15 exercises 2 done today");
     });
})


describe('getTargetSecondary', () => {
    it('no exercises', () => {
       const target: ITarget = { 
        _id:'',
        name:'',
        };
        const text = getTargetSummary(target);
        expect(text).toBe("0 exercises")
    });
    it('never updated', () => {
        const target: ITarget = {
         exercisesCount: 15,
         doneToday: 0,
         _id:'',
         name:'',
         };
         const text = getTargetSummary(target);
         expect(text).toBe("15 exercises")
     });
     it('last updated yesterday', () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const target: ITarget = {
         exercisesCount: 15,
         doneToday: 0,
         _id:'',
         name:'',
         lastUpdated:yesterday.toString()
         };
         const text = getTargetSummary(target);
         expect(text).toBe("1 day 15 exercises");
     });
     it('last updated yesterday doneToday 2', () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const target: ITarget = {
         exercisesCount: 15,
         doneToday: 2,
         _id:'',
         name:'',
         lastUpdated:yesterday.toString()
         };
         const text = getTargetSummary(target);
         expect(text).toBe("1 day 15 exercises 2 done today");
     });
     it('last updated yesterday doneToday 2', () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const target: ITarget = {
         exercisesCount: 15,
         doneToday: 2,
         _id:'',
         name:'',
         lastUpdated:yesterday.toString()
         };
         const text = getTargetSummary(target);
         expect(text).toBe("1 day 15 exercises 2 done today");
     });
})