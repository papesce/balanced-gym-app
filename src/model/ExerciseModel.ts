
export interface IExercise {
    _id: string,
    name: string,
    lastUpdated?: string,
    lastReps?: number,
    lastWeight?: number,
    normalizedWeight?: number,
    seriesCount?: number
    // suggestedSerie
}