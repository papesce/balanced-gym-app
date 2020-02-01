import { getMuscles } from "./MusclesPage";
import { IExercise } from "../../../model/ExerciseModel";

describe("MusclesPage", () => {
  it("getMuslces for no data", () => {
    const ex: IExercise = {
      _id: "1",
      name: "ex1"
    };
    const muscles = getMuscles(ex);
    expect(muscles).toHaveLength(0);
  });
  it("getMuslces for target", () => {
    const ex: IExercise = {
      _id: "1",
      name: "ex1",
      target: {
        _id: "2",
        name: "target"
      }
    };
    const muscles = getMuscles(ex);
    expect(muscles).toHaveLength(1);
    const muscle = muscles[0];
    expect(muscle.name).toBe("target");
    expect(muscle.muscleType).toBe("Target");
  });
  it("getMuslces for synergists", () => {
    const ex: IExercise = {
      _id: "1",
      name: "ex1",
      target: {
        _id: "2",
        name: "target"
      },
      synergists: [
        {
          _id: "3",
          name: "synergyst"
        }
      ]
    };
    const muscles = getMuscles(ex);
    expect(muscles).toHaveLength(2);
    const muscle = muscles[0];
    expect(muscle.name).toBe("target");
    expect(muscle.muscleType).toBe("Target");
  });
});
