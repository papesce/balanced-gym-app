import { IExercise } from "./ExerciseModel";
import { series1, series2, series8, series9now } from "./SerieModel.sample";

export const sampleExercise1: IExercise = {
  _id: "59f0c59d4e55c40d38868035",
  name: "Barbell Squats",
  lastReps: 1,
  lastWeight: 2,
  normalizedWeight: 0,
  seriesCount: 3,
  gifURL: "/BBSquatHigh.gif"
};

export const sampleExercise2: IExercise = {
  _id: "59f0c59f4e55c40d38868038",
  name: "Dumbbell short Lunge",
  lastUpdated: "2017-11-01T19:45:35.761Z",
  lastReps: 10,
  lastWeight: 7.5,
  normalizedWeight: 7.5,
  seriesCount: 4,
  gifURL: "/DBLungeQuad.gif",
  synergistsCount: 4,
  stabilizersCount: 7
};

export const sampleExercise3: IExercise = {
  _id: "5a3809c670ddd40014934e8f",
  name: "Barbell Rear short Lunge",
  lastReps: 0,
  lastWeight: 0,
  normalizedWeight: 0,
  seriesCount: 0,
  gifURL: "/BBRearLunge.gif"
};

export const sampleExercise4: IExercise = {
  _id: "5a380a8d70ddd40014934e94",
  name: "Barbell Split Squat",
  lastUpdated: new Date().toUTCString(),
  lastReps: 12,
  lastWeight: 25,
  normalizedWeight: 25,
  seriesCount: 1,
  gifURL: "/DBSplitSquat.gif",
  synergistsCount: 2
};

export const sampleExerciseSeries: IExercise = {
  _id: "",
  name: "Chest",
  series: []
};

export const sampleExerciseSeries1: IExercise = {
  _id: "",
  name: "Chest",
  series: series1
};

export const sampleExerciseSeries2: IExercise = {
  _id: "",
  name: "Chest",
  series: series2
};

export const sampleExerciseSeries8: IExercise = {
  _id: "",
  name: "Chest",
  series: series8
};

export const sampleExerciseSeries9now: IExercise = {
  _id: "",
  name: "Chest",
  series: series9now,
  lastCreationDate: new Date().toString()
};

export const onlyTargetSample: IExercise = {
  _id: "5a5cfe29d273cb00140c8e8b",
  name: "Weighted Lying Hip Abduction",
  muscleGroup: {
    _id: "5dde9b568603d000157b6284",
    name: "Hips"
  },
  gifURL: "/BBBenchPress.gif",
  target: {
    _id: "5a55153bd9b8730014575790",
    name: "Hip Abductors",
    muscleURL: "/abductor-muscles2.jpg"
  }
};

export const withSynergystsSample: IExercise = {
  _id: "5a5cfe29d273cb00140c8e8b",
  name: "Weighted Lying Hip Abduction",
  muscleGroup: {
    _id: "5dde9b568603d000157b6284",
    name: "Hips"
  },
  gifURL: "/BBBenchPress.gif",
  target: {
    _id: "5a55153bd9b8730014575790",
    name: "Hip Abductors",
    muscleURL: "/abductor-muscles2.jpg"
  },
  equipment: "Barbell Short",
  routineId: {
    _id: "59ee3ddc243a5977dab96c2b",
    name: "Chest Triceps Waist Hips"
  },
  synergists: [
    {
      _id: "5a5514bad9b8730014575786",
      name: "Pectoralis Major. Clavicular",
      muscleURL: "/PectoralisClavicular.png"
    },
    {
      _id: "5a5514c8d9b8730014575787",
      name: "Deltoid, Anterior",
      muscleURL: "/DeltoidAnteriorFront.gif"
    },
    {
      _id: "5a5515fbd9b87300145757a3",
      name: "Triceps Brachii",
      muscleURL: "/TricepsOutsideSmall.png"
    }
  ],
  series: [],
  lastReps: 0,
  lastWeight: 0,
  normalizedWeight: 0,
  suggestedSerie: {
    _id: "",
    reps: 9,
    weight: 2.3
  }
};

export const fullExerciseSample: IExercise = {
  _id: "5a5cfe29d273cb00140c8e8b",
  name: "Weighted Lying Hip Abduction",
  muscleGroup: {
    _id: "5dde9b568603d000157b6284",
    name: "Hips"
  },
  gifURL: "/BBBenchPress.gif",
  target: {
    _id: "5a55153bd9b8730014575790",
    name: "Hip Abductors",
    muscleURL: "https://localhost:5000/abductor-muscles2.jpg"
  },
  equipment: "Barbell Short",
  routineId: {
    _id: "59ee3ddc243a5977dab96c2b",
    name: "Chest Triceps Waist Hips"
  },
  synergists: [
    {
      _id: "5a5c1e834ba7ee0014932f02",
      name: "Gluteus Medius"
    },
    {
      _id: "5a5c1ea44ba7ee0014932f03",
      name: "Gluteus Minimus"
    },
    {
      _id: "5a5c0cf21b55f80014889a39",
      name: "Tensor Fasciae Latae"
    }
  ],
  series: [],
  lastReps: 0,
  lastWeight: 0,
  normalizedWeight: 0,
  suggestedSerie: {
    _id: "",
    reps: 9,
    weight: 2.3
  }
};
