import { isValidWeight, isValidReps, isDirty } from './SerieInput';

describe('SerieInout/isDirty', () => {
    it('the same should not be dirty', () => {
        expect(isDirty(0,0, {_id: '', reps: 0, weight:0 })).toBeFalsy();
    })
    it('!= weight should be dirty ', () => {
        expect(isDirty(0, 1.2, {_id: '', reps: 0, weight:0 })).toBeTruthy();
    })
    it('!= reps should be dirty ', () => {
        expect(isDirty(1, 0, {_id: '', reps: 0, weight:0 })).toBeTruthy();
    })
})

describe('SerieInout/isValidWeight', () => {
    it('Empty string should be valid ', () => {
         expect(isValidWeight('')).toBeFalsy();
    })
    it('negative should not ve valid', () => {
       expect(isValidWeight('-1')).toBeFalsy();
    })
    it('decimal should be valid ', () => {
        expect(isValidWeight('1.2')).toBeTruthy();
    })
})

describe('SerieInout/isValidReps', () => {
    it('Empty string should be valid ', () => {
         expect(isValidReps('')).toBeFalsy();
    })
    it('string should be valid ', () => {
        expect(isValidReps('a')).toBeFalsy();
    })
    it('negative should not ve valid', () => {
       expect(isValidReps('-1')).toBeFalsy();
    })
    it('positive integer should be valid ', () => {
        expect(isValidReps('2')).toBeTruthy();
    })
    it('positive decimal should be valid ', () => {
        expect(isValidReps('1.2')).toBeFalsy();
    })
})
