export const addS = (text: string, value: number) => {
    return `${value} ${text}${value === 1 ? '' : 's'}`; 
}