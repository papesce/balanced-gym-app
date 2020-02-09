import { computeSuggestedSerie, getExercise } from "./Exercise.model";
import { IExerciseDao, IExercise } from "../metamodel/Exercise.metamodel";
import { ISerie } from "../metamodel/Serie.metamodel";
import { seriesDao2 } from "../samples/Serie.sample";


describe('ExerciseModel', () => {
    it('computeSuggestedSerie', () => {
        const exerciseDao: IExerciseDao = {_id:"id", name:'name'};
        const exercisesDao: IExerciseDao[] = [];
        const serie: ISerie = computeSuggestedSerie(exerciseDao, exercisesDao);
        expect(serie).toBeDefined();
        expect(serie.reps).toBe(0);
        expect(serie.weight).toBe(0);
    });
    it('getExercise empty', () => {
        const exerciseDao: IExerciseDao = {_id:"id2", name:'name2'};
        const exercisesDao: IExerciseDao[] = [];
        const serieDao = undefined;
        const exercise: IExercise = getExercise(exerciseDao, exercisesDao, serieDao);
        expect(exercise).toBeDefined();
        expect(exercise._id).toBe('id2');
        expect(exercise.name).toBe('name2');
        expect(exercise.series).toBeUndefined();
        expect(exercise.lastCreationDate).toBeUndefined();
        // console.log(exercise);
    });
    it('getExercise series []', () => {
        const exerciseDao: IExerciseDao = {_id:"id2", name:'name2', series: []};
        const exercisesDao: IExerciseDao[] = [];
        const serieDao = undefined;
        const exercise: IExercise = getExercise(exerciseDao, exercisesDao, serieDao);
        expect(exercise).toBeDefined();
        expect(exercise._id).toBe('id2');
        expect(exercise.name).toBe('name2');
        expect(exercise.series).toEqual([]);
        expect(exercise.lastCreationDate).toBeUndefined();
        // console.log(exercise);
    });
    it('getExercise 2 series', () => {
        const exerciseDao: IExerciseDao = {_id:"id2", name:'name2', series: seriesDao2};
        const exercisesDao: IExerciseDao[] = [exerciseDao];
        const serieDao = undefined;
        const exercise: IExercise = getExercise(exerciseDao, exercisesDao, serieDao);
        expect(exercise).toBeDefined();
        expect(exercise._id).toBe('id2');
        expect(exercise.name).toBe('name2');
        expect(exercise.series).toHaveLength(2);
        expect(exercise.suggestedSerie?.reps).toBe(16);
        expect(exercise.suggestedSerie?.weight).toBe(25);
        expect(exercise.lastCreationDate).toBeUndefined();
        // console.log(exercise);
    });
})
