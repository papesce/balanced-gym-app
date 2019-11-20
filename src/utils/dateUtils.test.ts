import { getDaysFromDate, getDaysFromString } from './dateUtils';

describe('dateUtils/getDaysFromDate', () => {
    it('should return 0', () => {
       const days = getDaysFromDate(new Date('2017-12-23T12:56:21.730Z'), 
       new Date('2017-12-23T12:56:21.730Z'));
       expect(days).toBe(0);
    });
    it('should return 30', () => {
        const days = getDaysFromDate(new Date('2018-12-23T12:56:21.730Z'), 
        new Date('2018-11-23T12:56:21.730Z'));
        expect(days).toBe(30);
     });
     it('should return 365', () => {
        const days = getDaysFromDate(new Date('2017-12-23T12:56:21.730Z'), 
        new Date('2018-12-23T12:56:21.730Z'));
        expect(days).toBe(365);
     });
     it('should return 365', () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const days = getDaysFromDate(yesterday);
        expect(days).toBe(1);
     });
})

describe('dateUtils/getDaysFromString', () => {

     it('getDaysFromString should return 365', () => {
        const days = getDaysFromString('2017-12-23T12:56:21.730Z', 
        '2018-12-23T12:56:21.730Z');
        expect(days).toBe(365);
     });
     it('getDaysFromString should return 365', () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const days = getDaysFromString(yesterday.toString());
        expect(days).toBe(1);
     });
     
})
