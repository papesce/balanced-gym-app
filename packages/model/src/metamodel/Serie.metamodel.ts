
export interface ISerieDao {
    _id: any;
    reps: number,
    weight: number,
    createdAt?: string;
    updatedAt?: string;
    restTime?: number
}


export interface ISerie {
    _id: string,
    createdAt?: string,
    reps: number,
    weight: number,
    restTime?: number
}

export interface ISerieUpdate {
    reps: number,
    weight: number,
}
