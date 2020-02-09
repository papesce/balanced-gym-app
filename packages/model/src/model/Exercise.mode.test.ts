import { computeSuggestedSerie } from "./Exercise.model";
import { IExerciseDao } from "../metamodel/Exercise.metamodel";
import { ISerie } from "../metamodel/Serie.metamodel";


describe('ExerciseModel', () => {
    it('computeSuggestedSerie', () => {
        const exerciseDao: IExerciseDao = {_id:"id", name:'name'};
        const exercisesDao: IExerciseDao[] = [];
        const serie: ISerie = computeSuggestedSerie(exerciseDao, exercisesDao);
        expect(serie).toBeDefined();
        expect(serie.reps).toBe(0);
        expect(serie.weight).toBe(0);
    })
    
})
