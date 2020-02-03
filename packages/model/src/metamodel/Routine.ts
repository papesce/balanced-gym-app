
export interface IRoutineModel {
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