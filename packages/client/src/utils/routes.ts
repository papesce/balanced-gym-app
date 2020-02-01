
const getHeaderRow = (_id: string, title: string, value: string, url?: string) => {
    return {_id, title, value, url}
}

export const getExerciseHeaderRow = (name: string) => {
    return getHeaderRow('1', "Ex:", name);
}

export const getRoutineURL = (routineId: string) => {
    return `/routine/${routineId}` 
}

export const getRoutineHeaderRow = (name: string, url?: string) => {
    return getHeaderRow('1', "Routine:", name, url);
}

export const getMuscleGroupURL = (routineId: string, muscleGroupId: string) => {
    return `/routine/${routineId}/muscleGroup/${muscleGroupId}`;
}

export const getMuscleGroupHeaderRow = (name: string, url?: string) => {
    return getHeaderRow('2', "Muscle Group:", name, url);
}

export const getTargetURL = (routineId: string, muscleGroupId: string, targetId: string) => {
    return `/routine/${routineId}/muscleGroup/${muscleGroupId}/target/${targetId}`;
}

export const getTargetHeaderRow = (name: string, url?: string) => {
    return getHeaderRow('3', "Target:", name, url);
}

export const getRoutinesHeaderRow = () => {
    return {_id: '4',  value: 'Routines', url:`/routines`};
}
    