export interface IMuscleGroup {
    _id: string,
    name: string,
    targetsCount?: number,
    exercisesCount?: number,
    doneToday?: number,
    lastUpdated?: string
}