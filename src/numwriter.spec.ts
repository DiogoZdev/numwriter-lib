import { write, writeDate } from './numwriter';
import { ECurrency } from './types';

describe('numwriter', () => {

    it('should write number in Portuguese-BR', () => {
        expect(write(11.52)).toBe('onze ponto cinquenta e dois')
    })

    it('should write value in Portuguese-BR real', () => {
        expect(write(11.52, {currency: ECurrency.BRL})).toBe('onze reais e cinquenta e dois centavos')
    })

    it('should write date in Portuguese-BR', () => {
        expect(writeDate('2022-03-20')).toBe('20 de março de 2022');
    })
})