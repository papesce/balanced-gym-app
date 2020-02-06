import { getRoutineAndMuscles } from './Routine.model';
import { IExerciseDao } from '../metamodel/Exercise.metamodel';
import { IRoutine, IRoutineDao } from '../metamodel/Routine.metamodel';
import { sampleExercise8 } from '../samples/Exercise.sample';

describe('Routine', () => {
    it('getRoutineAndMuscles no exercises', () => {
        const routineDao: IRoutineDao = {_id: '1', name: "r1"};
        const exercisesDao: IExerciseDao[] = [];
        const routine: IRoutine = getRoutineAndMuscles(routineDao,  exercisesDao);
        expect(routine).toBeDefined();
        expect(routine._id).toBe('1');
        expect(routine.name).toBe('r1');
        expect(routine.muscleGroups).toBeDefined();
        expect(routine.muscleGroups).toHaveLength(0);
    })
    it('getRoutineAndMuscles 1 exercise', () => {
        const routineDao: IRoutineDao = {_id: '1', name: "r1"};
        const exercisesDao: IExerciseDao[] = [sampleExercise8];
        const routine: IRoutine = getRoutineAndMuscles(routineDao,  exercisesDao);
        console.log(routine);
        expect(routine).toBeDefined();
        expect(routine._id).toBe('1');
        expect(routine.name).toBe('r1');
        expect(routine.muscleGroups).toBeDefined();
        expect(routine.muscleGroups).toHaveLength(1);
    })
})
