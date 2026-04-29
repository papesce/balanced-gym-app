import { getTimeForGraph } from '../../../utils/dateUtils';
import { ISerie } from 'balanced-gym-model';

export interface GraphDataPoint {
    label: string;
    reps: number;
    weight: number;
    index: number;
}

export const getGraphData = (series: ISerie[]): GraphDataPoint[] => {
    const data: GraphDataPoint[] = [];
    series.slice().reverse().forEach((serie, i) => {
        if (serie.createdAt) {
            data.push({
                label: getTimeForGraph(serie.createdAt),
                reps: serie.reps,
                weight: serie.weight,
                index: i,
            });
        }
    });
    if (data.length === 1) {
        return [{ label: '', reps: 0, weight: 0, index: -1 }, ...data];
    }
    return data;
};
