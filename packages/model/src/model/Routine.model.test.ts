import { IExerciseDAO } from './../metamodel/Exercise.metamodel';
import { getRoutineSummary } from './Routine.model';
import { IRoutineDao, IRoutineSummary } from '../metamodel/Routine.metamodel';
import { emptyRoutineDao } from '../samples/Routine.sample';


describe('Routine', () => {
    it('routinesSummary ', () => {
        const routineDao: IRoutineDao = emptyRoutineDao;
        const exerciseDaos: IExerciseDAO[] = [];
        const routineSummary: IRoutineSummary = getRoutineSummary(routineDao, exerciseDaos);
        expect(routineSummary).toBeDefined();
    });
})
