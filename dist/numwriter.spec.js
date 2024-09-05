"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const numwriter_1 = require("./numwriter");
describe('numwriter', () => {
    it('should write number in Portuguese-BR', () => {
        expect((0, numwriter_1.write)(11.52, { locale: 'pt-BR' })).toBe('onze vírgula cinquenta e dois');
    });
    it('should write value in Portuguese-BR real', () => {
        expect((0, numwriter_1.write)(11.52, { locale: 'pt-BR', currency: 'BRL' })).toBe('onze reais e cinquenta e dois centavos');
    });
    it('should write date in Portuguese-BR', () => {
        expect((0, numwriter_1.writeDate)('2022-03-20', { locale: 'pt-BR' })).toBe('20 de março de 2022');
    });
});
