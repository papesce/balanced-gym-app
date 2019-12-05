import { getTargetSummary, getTargetSummary1, getTargetSummary2 } from './summary.target';
import { ITarget } from './../model/TargetModel';

describe('getTargetSummary1', () => {
    it('no exercises', () => {
       const target: ITarget = { 
        _id:'',
        name:'',
        };
        const text = getTargetSummary1(target);
        expect(text).toBe("")
    });
    it('never updated', () => {
        const target: ITarget = {
         exercisesCount: 15,
         doneToday: 0,
         _id:'',
         name:'',
         };
         const text = getTargetSummary1(target);
         expect(text).toBe("")
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
         const text = getTargetSummary1(target);
         expect(text).toBe("1 day");
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
         const text = getTargetSummary1(target);
         expect(text).toBe("1 day");
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
         const text = getTargetSummary1(target);
         expect(text).toBe("1 day");
     });
})

describe('getTargetSummary2', () => {
    it('no exercises', () => {
       const target: ITarget = { 
        _id:'',
        name:'',
        };
        const text = getTargetSummary2(target);
        expect(text).toBe("0 exercises")
    });
    it('never updated', () => {
        const target: ITarget = {
         exercisesCount: 15,
         doneToday: 0,
         _id:'',
         name:'',
         };
         const text = getTargetSummary2(target);
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
         const text = getTargetSummary2(target);
         expect(text).toBe("15 exercises");
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
         const text = getTargetSummary2(target);
         expect(text).toBe("15 exercises 2 done today");
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
         const text = getTargetSummary2(target);
         expect(text).toBe("15 exercises 2 done today");
     });
})

describe('getTargetSummary', () => {
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