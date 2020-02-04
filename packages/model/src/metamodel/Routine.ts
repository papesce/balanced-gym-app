
export interface IRoutineDAO {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
};

export interface IRoutineSummary {
    _id: string,
    name: string,
    targetsCount?: number ,
    exercisesCount?: number,
    lastUpdated?: string,
    doneToday?: number
}

export interface IRoutine {
    _id: string,
    name: string,
    targetsCount?: number ,
    exercisesCount?: number,
    lastUpdated?: string,
    doneToday?: number,
    exercises?: string[],
    // muscleGroups?: IMuscleGroup[]
}