
export interface IRoutine {
    _id: string,
    name: string,
    updatedAt: string,
    createdAt: string,
    targetsCount: number ,
    exercisesCount: number,
    lastUpdated?: string,
    doneToday: number,
    exercises?: string[]
}

export interface IRoutineState {
    loading?: boolean;
    error?: string;
    data?: IRoutine[];
}
