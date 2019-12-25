export interface ISerie {
    _id: string,
    createdAt: string,
    reps: number,
    weight: number
}

export const emptySerie = {
    _id: '',
    reps: 0,
    weight:0,
    createdAt: ''
}