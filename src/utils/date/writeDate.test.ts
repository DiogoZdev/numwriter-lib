import { writeDate } from "./writeDate";

describe('writeDate', () => {

    it('should return invalid date format', () => {
        expect(writeDate('02-10-20')).toBe('invalid date format');
    })

    it('should write date in Portuguese-BR', () => {
        const res = writeDate('2022-03-20');
        expect(res).toBe('20 de março de 2022');    
    });

    it('should write another date in Portuguese-BR', () => {
        const res = writeDate('2022-12-19');
        expect(res).toBe('19 de dezembro de 2022');    
    });

    it('should write date in English-US', () => {
        const res = writeDate('2022-03-20', { locale: 'en-US' });
        expect(res).toBe('march 20th, 2022');
    });

    it('should write date in English-US without prefix zero', () => {
        const res = writeDate('2022-07-04', { locale: 'en-US' });
        expect(res).toBe('july 4th, 2022');
    });

    it('should write date in English-US with correct ordinal', () => {
        const res = writeDate('2022-07-11', { locale: 'en-US' });
        expect(res).toBe('july 11th, 2022');
    });

    it('should write date in English-US with correct "st" ordinal', () => {
        const res = writeDate('2022-07-31', { locale: 'en-US' });
        expect(res).toBe('july 31st, 2022');
    });

    it('should write date in English-US with correct "nd" ordinal', () => {
        const res = writeDate('2022-07-13', { locale: 'en-US' });
        expect(res).toBe('july 13th, 2022');
    });

    it('should write date in English-US with correct "rd" ordinal', () => {
        const res = writeDate('2022-07-23', { locale: 'en-US' });
        expect(res).toBe('july 23rd, 2022');
    });

    it('should write date in Spanish-ES', () => {
        const res = writeDate('2024-07-01', { locale: 'es-ES' });
        expect(res).toBe('01 de julio de 2024');
    });

    it('should write date in Spanish-ES', () => {
        const res = writeDate('2024-01-01', { locale: 'es-ES' });
        expect(res).toBe('01 de enero de 2024');
    });
})
