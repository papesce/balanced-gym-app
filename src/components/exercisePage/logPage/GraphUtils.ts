import { getDaysFromString } from '../../../utils/dateUtils';
import { ISerie } from '../../../model/SerieModel';

export const getGraphData = ( series: ISerie[] ) => {
    const labels: string[] = [];
    const reps: number[] = [];
    const weights: number[] = [];
    series.slice().reverse().forEach(serie => {
        const days: number = getDaysFromString(serie.createdAt);
        labels.push(days.toString());
        reps.push(serie.reps);
        weights.push(serie.weight);
    });
    if (labels.length === 1) {
        return { labels: ['', ...labels], 
                 reps: [0, ...reps],
                 weights: [0, ...weights]
                }
    }
    return { labels, reps, weights}
  } 