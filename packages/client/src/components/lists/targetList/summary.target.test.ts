import { getTargetSummary1, getTargetSummary2 } from './summary.target';
import { ITarget } from '../../model/TargetModel';

describe('getTargetSummary1', () => {
    it('no exercises', () => {
       const target: ITarget = { 
        _id:'',
        name:'',
        };
        const text = getTargetSummary1(target);
        expect(text).toBe("0 exercises")
    });
    it('exercises > 0', () => {
        const target: ITarget = {
         exercisesCount: 15,
         _id:'',
         name:'',
         };
         const text = getTargetSummary1(target);
         expect(text).toBe("15 exercises")
     });
     it('with synergists > 0', () => {
        const target: ITarget = {
         exercisesCount: 15,
         synergistsCount: 5,
         _id:'',
         name:'',
         };
         const text = getTargetSummary1(target);
         expect(text).toBe("15 exercises (syns: 5)")
     });
     it('with stabilizers > 0', () => {
        const target: ITarget = {
         exercisesCount: 15,
         synergistsCount: 5,
         stabilizersCount: 7,
         _id:'',
         name:'',
         };
         const text = getTargetSummary1(target);
         expect(text).toBe("15 exercises (syns: 5, stbs: 7)")
     });
})

describe('getTargetSummary2', () => {
    it('no last updated', () => {
       const target: ITarget = { 
        _id:'',
        name:'',
        };
        const text = getTargetSummary2(target);
        expect(text).toBe("")
    });
     it('last updated yesterday', () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const target: ITarget = {
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
        const target: ITarget = {
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

