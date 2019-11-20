
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

// export class Routine {
//     targetsCount: number = 0;
//     exercisesCount: number = 0;
//     doneToday: number = 0; 
//     constructor(targetsCount: number,
//     exercisesCount: number,
//     doneToday: number) {
//         this.targetsCount = targetsCount;
//         this.exercisesCount = exercisesCount;
//         this.doneToday = doneToday;
//     }
// }