import { getGraphData } from './GraphUtils';
import { series0, series1, series2 } from 'balanced-gym-model';

describe('Graph', () => {
    it('getGraph series0', () => {
        const {labels, reps, weights} = getGraphData(series0);
        expect(labels).toHaveLength(0);
        expect(reps).toHaveLength(0);
        expect(weights).toHaveLength(0);
    })
    it('getGraph series1', () => {
        const {labels, reps, weights} = getGraphData(series1);
        expect(labels).toHaveLength(2);
        expect(labels[0]).toBe('');
        expect(reps).toHaveLength(2);
        expect(reps[0]).toBe(0)      
        expect(reps[1]).toBe(8)
        expect(weights).toHaveLength(2);
        expect(weights[0]).toBe(0);
        expect(weights[1]).toBe(40);
    })
    it('getGraph series2', () => {
        const {labels, reps, weights} = getGraphData(series2);
        expect(labels).toHaveLength(2);
        expect(reps).toHaveLength(2);
        expect(reps[0]).toBe(10)
        expect(reps[1]).toBe(8)
        expect(weights).toHaveLength(2);
        expect(weights[0]).toBe(40);
        expect(weights[1]).toBe(40)
    })
    
})
