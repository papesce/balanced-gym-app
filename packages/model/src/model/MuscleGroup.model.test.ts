import { getMuscleGroupForRoutine, groupExercisesByTarget, groupByTargetExercises } from "./MuscleGroup.model";
import {
  IMuscleGroup,
  IMuscleGroupDao
} from "../metamodel/MuscleGroup.metamodel";
import { IRoutineDao } from "../metamodel/Routine.metamodel";
import { IExerciseDao } from "../metamodel/Exercise.metamodel";
import { sampleExerciseDao9 } from "../samples/Exercise.sample";
import { IMuscle } from "../metamodel/Muscle.metamodel";

describe("MuscleGroup", () => {
    it('groupByTargetExercises []', () => {
        const exercisesDao: IExerciseDao[] = [];
        const grouped = groupByTargetExercises(exercisesDao);
        expect(grouped).toEqual({});
    })
    it('groupByTargetExercises 1 exercise', () => {
        const exercisesDao: IExerciseDao[] = [sampleExerciseDao9];
        const grouped = groupByTargetExercises(exercisesDao);
        expect(grouped['5a551347620ca90014df37a6']).toBeDefined();
    })
    it('groupExercisesByTarget []', () => {
        const exercisesDao: IExerciseDao[] = [];
        const targets: IMuscle[] = groupExercisesByTarget(exercisesDao);
         expect(targets).toBeDefined();
         expect(targets).toHaveLength(0);
    })
    it('groupExercisesByTarget 1 exercise', () => {
        const exercisesDao: IExerciseDao[] = [sampleExerciseDao9];
        const targets: IMuscle[] = groupExercisesByTarget(exercisesDao);
         expect(targets).toBeDefined();
         expect(targets).toHaveLength(1);
         expect(targets[0]._id).toBe('5a551347620ca90014df37a6');
    })
    
  it("getMuscleGroupForRoutine no targets", () => {
    const routineDao: IRoutineDao = { _id: "r1", name: "r1name" };
    const muscleGroupDao: IMuscleGroupDao = { _id: "mg1", name: "mg1name" , order: 1};
    const exercisesDao: IExerciseDao[] = [];
    const muscleGroup: IMuscleGroup = getMuscleGroupForRoutine(
      routineDao,
      muscleGroupDao,
      exercisesDao
    );
    expect(muscleGroup).toBeDefined();
    expect(muscleGroup._id).toBe("mg1");
    expect(muscleGroup.name).toBe("mg1name");
    expect(muscleGroup.routineId).toBe("r1");
    expect(muscleGroup.routineName).toBe("r1name");
    expect(muscleGroup.targets).toBeDefined();
    expect(muscleGroup.targets).toHaveLength(0);
  });
  it("getMuscleGroupForRoutine 1 target", () => {
    const routineDao: IRoutineDao = { _id: "r1", name: "r1name" };
    const muscleGroupDao: IMuscleGroupDao = { _id: "mg1", name: "mg1name", order:2 };
    const exercisesDao: IExerciseDao[] = [sampleExerciseDao9];
    const muscleGroup: IMuscleGroup = getMuscleGroupForRoutine(
      routineDao,
      muscleGroupDao,
      exercisesDao
    );
    expect(muscleGroup).toBeDefined();
    expect(muscleGroup._id).toBe("mg1");
    expect(muscleGroup.name).toBe("mg1name");
    expect(muscleGroup.routineId).toBe("r1");
    expect(muscleGroup.routineName).toBe("r1name");
    expect(muscleGroup.targets).toBeDefined();
    expect(muscleGroup.targets).toHaveLength(1);
    // console.log(muscleGroup);
    const { targets = []} = muscleGroup; 
    expect(targets[0]._id).toBe("5a551347620ca90014df37a6")
  });
});
