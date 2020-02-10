import { getTarget } from "./Muscle.model";
import { IMuscle, IMuscleDao } from "../metamodel/Muscle.metamodel";
import { IRoutineDao } from "../metamodel/Routine.metamodel";
import { IMuscleGroupDao } from "../metamodel/MuscleGroup.metamodel";
import { IExerciseDao } from "../metamodel/Exercise.metamodel";

describe("MuscleModel", () => {
  it("getTarget with no exercises", () => {
    const routineDao: IRoutineDao = { _id: "r1", name: "r1name" };
    const muscleGroupDao: IMuscleGroupDao = { _id: "mg1", name: "mg1name", order: 1 };
    const targetDao: IMuscleDao = { _id: "m1", name: "m1name" };
    const exercisesDao: IExerciseDao[] = [];
    const target: IMuscle = getTarget(
      routineDao,
      muscleGroupDao,
      targetDao,
      exercisesDao
    );
    expect(target).toBeDefined();
    expect(target._id).toBe("m1");
    expect(target.name).toBe("m1name");
    expect(target.routineId).toBe("r1");
    expect(target.routineName).toBe("r1name");
    expect(target.muscleGroupId).toBe("mg1");
    expect(target.muscleGroupName).toBe("mg1name");
    expect(target.exercises).toEqual([]);
  });
  it("getTarget with 1 exercise", () => {
    const routineDao: IRoutineDao = { _id: "r1", name: "r1name" };
    const muscleGroupDao: IMuscleGroupDao = { _id: "mg1", name: "mg1name", order: 2 };
    const targetDao: IMuscleDao = { _id: "m1", name: "m1name" };
    // todo add exercisedao to test
    const exercisesDao: IExerciseDao[] = [];
    const target: IMuscle = getTarget(
      routineDao,
      muscleGroupDao,
      targetDao,
      exercisesDao
    );
    expect(target).toBeDefined();
    expect(target._id).toBe("m1");
    expect(target.name).toBe("m1name");
    expect(target.routineId).toBe("r1");
    expect(target.routineName).toBe("r1name");
    expect(target.muscleGroupId).toBe("mg1");
    expect(target.muscleGroupName).toBe("mg1name");
    expect(target.exercises).toEqual([]);
  });
});
