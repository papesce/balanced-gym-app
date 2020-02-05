import { IExerciseDao } from "./../metamodel/Exercise.metamodel";
import { getRoutineSummary } from "./Routine.model";
import { IRoutineDao, IRoutineSummary } from "../metamodel/Routine.metamodel";
import { emptyRoutineDao } from "../samples/Routine.sample";
import { sampleExercise5, sampleExercise6, sampleExercise7Series } from "../samples/Exercise.sample";

describe("Routine", () => {
  it("getRoutineSummary no exercises", () => {
    const routineDao: IRoutineDao = emptyRoutineDao;
    const exerciseDaos: IExerciseDao[] = [];
    const routineSummary: IRoutineSummary = getRoutineSummary(
      routineDao,
      exerciseDaos
    );
    expect(routineSummary).toBeDefined();
    expect(routineSummary._id).toBe("");
    expect(routineSummary.name).toBe("");
    expect(routineSummary.targetsCount).toBe(0);
  });
  it("getRoutineSummary 1 exercise", () => {
    const routineDao: IRoutineDao = emptyRoutineDao;
    const exerciseDaos: IExerciseDao[] = [sampleExercise5];
    const routineSummary: IRoutineSummary = getRoutineSummary(
      routineDao,
      exerciseDaos
    );
    expect(routineSummary).toBeDefined();
    expect(routineSummary._id).toBe("");
    expect(routineSummary.name).toBe("");
    expect(routineSummary.targetsCount).toBe(1);
    expect(routineSummary.exercisesCount).toBe(1);
    expect(routineSummary.doneToday).toBe(0);
  });
  it("getRoutineSummary 2 exercise 1 target no series", () => {
    const routineDao: IRoutineDao = emptyRoutineDao;
    const exerciseDaos: IExerciseDao[] = [sampleExercise5, sampleExercise6];
    const routineSummary: IRoutineSummary = getRoutineSummary(
      routineDao,
      exerciseDaos
    );
    expect(routineSummary).toBeDefined();
    expect(routineSummary._id).toBe("");
    expect(routineSummary.name).toBe("");
    expect(routineSummary.targetsCount).toBe(1);
    expect(routineSummary.exercisesCount).toBe(2);
    expect(routineSummary.doneToday).toBe(0);
    expect(routineSummary.lastUpdated).toBeUndefined();
  });
  it("getRoutineSummary 2 exercise 1 target w/series", () => {
    const routineDao: IRoutineDao = emptyRoutineDao;
    const exerciseDaos: IExerciseDao[] = [sampleExercise5, sampleExercise6, sampleExercise7Series];
    const routineSummary: IRoutineSummary = getRoutineSummary(
      routineDao,
      exerciseDaos
    );
    expect(routineSummary).toBeDefined();
    expect(routineSummary._id).toBe("");
    expect(routineSummary.name).toBe("");
    expect(routineSummary.targetsCount).toBe(1);
    expect(routineSummary.exercisesCount).toBe(3);
    expect(routineSummary.doneToday).toBe(0);
    expect(routineSummary.lastUpdated).toBe('2018-02-05T22:18:47.918Z');
  });
});
