import { IExercise } from './../model/ExerciseModel';

import { getRoutineSummary, getExerciseSummary } from './common';
import { IRoutine } from '../model/RoutineModel';

describe('getRoutineSecondary', () => {
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




describe('getExerciseSecondary', () => {
    it('no exercises', () => {
       const exercise: IExercise = { 
        _id:'',
        name:'',
        };
        const text = getExerciseSummary(exercise);
        expect(text).toBe("")
    });
    it('Last Reps', () => {
        const exercise: IExercise = { 
            _id:'',
            name:'',
            lastReps: 10
            };
        const text = getExerciseSummary(exercise);
        expect(text).toBe("r:10 w:0 t:0")
      });
      it('Last weight', () => {
        const exercise: IExercise = { 
            _id:'',
            name:'',
            lastReps: 10,
            lastWeight: 9
            };
        const text = getExerciseSummary(exercise);
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
        const text = getExerciseSummary(exercise);
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
        const text = getExerciseSummary(exercise);
        expect(text).toBe("1 day r:10 w:9 t:2");
    });
})