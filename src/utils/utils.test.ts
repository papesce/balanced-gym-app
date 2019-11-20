import { addS } from './utils';

describe('util/addS', () => {
    it('should add s', () => {
        expect(addS('number', 0)).toBe('0 numbers')
    })
    it('should not add s', () => {
        expect(addS('number', 1)).toBe('1 number')
    })
})
