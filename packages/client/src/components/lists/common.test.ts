import { getRoutineSummary1, getRoutineSummary2 } from './common';
import { IRoutine } from 'balanced-gym-model';

describe('getRoutineSummary', () => {
    it('no targets', () => {
        const routine: IRoutine = {
            _id:'',
            name:'routine',
            };
         const text = getRoutineSummary1(routine);
         expect(text).toBe("No targets")
     });
    it('0 targets', () => {
        const routine: IRoutine = {
            _id:'',
            name:'',
            targetsCount: 0
            };
        const text = getRoutineSummary1(routine);
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
         const text = getRoutineSummary1(routine);
         expect(text).toBe("1 target 15 exercises")
     });
})

describe('getRoutineSummary2', () => {
    it('no targets', () => {
        const routine: IRoutine = {
            _id:'',
            name:'routine',
            };
         const text = getRoutineSummary2(routine);
         expect(text).toBe("")
     });
    it('0 targets', () => {
        const routine: IRoutine = {
            _id:'',
            name:'',
            targetsCount: 0
            };
        const text = getRoutineSummary2(routine);
        expect(text).toBe("")
    });
    it('never updated', () => {
        const routine: IRoutine = {
         targetsCount: 1,
         exercisesCount: 15,
         doneToday: 0,
         _id:'',
         name:'',
         };
         const text = getRoutineSummary2(routine);
         expect(text).toBe("")
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
         lastUpdated: yesterday.toString()
         };
         const text = getRoutineSummary2(routine);
         expect(text).toBe("a day ago")
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
         const text = getRoutineSummary2(routine);
         expect(text).toBe("a day ago, 2 done today");
     });
    //  it('last updated yesterday doneToday 2', () => {
    //     const yesterday = new Date();
    //     yesterday.setDate(yesterday.getDate() - 1);
    //     const routine: IRoutine = {
    //      targetsCount: 1,
    //      exercisesCount: 15,
    //      doneToday: 2,
    //      _id:'',
    //      name:'',
    //      lastUpdated:yesterday.toString()
    //      };
    //      const text = getRoutineSummary(routine);
    //      expect(text).toBe("1 day 1 target 15 exercises 2 done today");
    //  });
})


