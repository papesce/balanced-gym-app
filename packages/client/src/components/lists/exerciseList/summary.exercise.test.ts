import { IExercise } from 'balanced-gym-model';

import { getExerciseSummary1, getExerciseSummary2 } from './summary.exercise';


describe('getExerciseSummary1', () => {
    it('no exercises', () => {
       const exercise: IExercise = { 
        _id:'',
        name:'',
        };
        const text = getExerciseSummary1(exercise);
        expect(text).toBe("")
    });
    it('Last Reps', () => {
        const exercise: IExercise = { 
            _id:'',
            name:'',
            lastReps: 10
            };
        const text = getExerciseSummary1(exercise);
        expect(text).toBe("r:10 w:0 t:0")
      });
      it('Last weight', () => {
        const exercise: IExercise = { 
            _id:'',
            name:'',
            lastReps: 10,
            lastWeight: 9
            };
        const text = getExerciseSummary1(exercise);
        expect(text).toBe("r:10 w:9 t:0")
      });
      it('RepsCount', () => {
        const exercise: IExercise = { 
            _id:'',
            name:'',
            lastReps: 10,
            lastWeight: 9,
            seriesCount: 2
            };
        const text = getExerciseSummary1(exercise);
        expect(text).toBe("r:10 w:9 t:2")
      });
      it('last updated yesterday', () => {
         const yesterday = new Date();
         yesterday.setDate(yesterday.getDate() - 1);
         const exercise: IExercise = { 
            _id:'',
            name:'',
            lastReps: 10,
            lastWeight: 9,
            seriesCount: 2,
            lastUpdated:yesterday.toString()
            };
        const text = getExerciseSummary1(exercise);
        expect(text).toBe("a day ago, r:10 w:9 t:2");
    });
})


describe('getExerciseSummary2', () => {
    it('no exercise data', () => {
       const exercise: IExercise = { 
        _id:'',
        name:'',
        };
        const text = getExerciseSummary2(exercise);
        expect(text).toBe("")
    });
    it('with Synergists', () => {
        const exercise: IExercise = { 
            _id:'',
            name:'',
            synergistsCount:5,
            };
        const text = getExerciseSummary2(exercise);
        expect(text).toBe(" (syns: 5)")
      });
      it('with Stabilizers', () => {
        const exercise: IExercise = { 
            _id:'',
            name:'',
            stabilizersCount:10,
            };
        const text = getExerciseSummary2(exercise);
        expect(text).toBe(" (stbs: 10)")
      });
      it('with Stabilizers And Synergists', () => {
        const exercise: IExercise = { 
            _id:'',
            name:'',
            stabilizersCount:10,
            synergistsCount:5,
            };
        const text = getExerciseSummary2(exercise);
        expect(text).toBe(" (syns: 5, stbs: 10)")
      });
})