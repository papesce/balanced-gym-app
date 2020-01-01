export interface ISerie {
    _id: string,
    createdAt?: string,
    reps: number,
    weight: number
}

export interface ISerieState {
    editing?: boolean;
    deleting?: boolean;
    creating?: boolean;
    editingError?: string;
    deletingError?: string;
    creatingError?: string;
    serie?: ISerie;
}

export const emptySerie = {
    _id: '',
    reps: 0,
    weight:0
}