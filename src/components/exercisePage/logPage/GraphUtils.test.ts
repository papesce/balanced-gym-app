import { getGraphData } from './GraphUtils';
import { series0, series1 } from '../../../model/SerieModel.sample';

describe('Graph', () => {
    it('getGraph series0', () => {
        const {labels, reps, weights} = getGraphData(series0);
        expect(labels).toHaveLength(0);
        expect(reps).toHaveLength(0);
        expect(weights).toHaveLength(0);
    })
    it('getGraph series1', () => {
        const {labels, reps, weights} = getGraphData(series1);
        expect(labels).toHaveLength(1);
        expect(labels[0]).toBe('681');
        expect(reps).toHaveLength(1);
        expect(reps[0]).toBe(8)
        expect(weights).toHaveLength(1);
        expect(weights[0]).toBe(40);
    })
    
})
