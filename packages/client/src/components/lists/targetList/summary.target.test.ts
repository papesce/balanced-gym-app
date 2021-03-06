import { getTargetSummary1, getTargetSummary2 } from './summary.target';
import { IMuscleSummary } from 'balanced-gym-model';

describe('getTargetSummary1', () => {
    it('no exercises', () => {
       const target: IMuscleSummary = { 
        _id:'',
        name:'',
        };
        const text = getTargetSummary1(target);
        expect(text).toBe("0 exs")
    });
    it('exercises > 0', () => {
        const target: IMuscleSummary = {
         exercisesCount: 15,
         _id:'',
         name:'',
         };
         const text = getTargetSummary1(target);
         expect(text).toBe("15 exs")
     });
     it('with synergists > 0', () => {
        const target: IMuscleSummary = {
         exercisesCount: 15,
         synergistsCount: 5,
         _id:'',
         name:'',
         };
         const text = getTargetSummary1(target);
         expect(text).toBe("15 exs (syns: 5)")
     });
     it('with stabilizers > 0', () => {
        const target: IMuscleSummary = {
         exercisesCount: 15,
         synergistsCount: 5,
         stabilizersCount: 7,
         _id:'',
         name:'',
         };
         const text = getTargetSummary1(target);
         expect(text).toBe("15 exs (syns: 5, stbs: 7)")
     });
})

describe('getTargetSummary2', () => {
    it('no last updated', () => {
       const target: IMuscleSummary = { 
        _id:'',
        name:'',
        };
        const text = getTargetSummary2(target);
        expect(text).toBe("")
    });
     it('last updated yesterday', () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const target: IMuscleSummary = {
         _id:'',
         name:'',
         lastUpdated:yesterday.toString()
         };
         const text = getTargetSummary2(target);
         expect(text).toBe("a day ago");
     });
     it('last updated yesterday doneToday 2', () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const target: IMuscleSummary = {
         exercisesCount: 15,
         doneToday: 2,
         _id:'',
         name:'',
         lastUpdated:yesterday.toString()
         };
         const text = getTargetSummary2(target);
         expect(text).toBe("a day ago, 2 done today");
     });
})

