import { write } from "./write"

describe('write', () => {

    // ENGLISH

    it('should write value in dollars', () => {
        expect(write(11.52, {currency: 'DOL'})).toBe('eleven dollars fifty two cents')
        expect(write(2, { currency: 'DOL' })).toBe('two dollars')
        expect(write(1, { currency: 'DOL' })).toBe('one dollar')
        expect(write(100, { currency: 'DOL' })).toBe('one hundred dollars')
    })

    it('should write value in English-US', () => {
        expect(write(11.52)).toBe('eleven point fifty two')
        expect(write(2)).toBe('two')
        expect(write(1)).toBe('one')
        expect(write(100)).toBe('one hundred')
    })

    // SPANISH

    it('should write value in Spanish Pesos', () => {
        expect(write(11.52, { locale: 'es-ES', currency: 'PESO' })).toBe('once pesos y cincuenta y dos centavos')
        expect(write(2, { locale: 'es-ES', currency: 'PESO' })).toBe('dos pesos')
        expect(write(1, { locale: 'es-ES', currency: 'PESO' })).toBe('un peso')
        expect(write(100, { locale: 'es-ES', currency: 'PESO' })).toBe('cien pesos')
    })

    it('should write value in Spanish Euros', () => {
        expect(write(11.52, { locale: 'es-ES', currency: 'EUR' })).toBe('once euros y cincuenta y dos cents')
        expect(write(2, { locale: 'es-ES', currency: 'EUR' })).toBe('dos euros')
        expect(write(1, { locale: 'es-ES', currency: 'EUR' })).toBe('un euro')
        expect(write(100, { locale: 'es-ES', currency: 'EUR' })).toBe('cien euros')
    })

    it('should write value in Spanish', () => {
        expect(write(11.52, { locale: 'es-ES' })).toBe('once punto cincuenta y dos')
        expect(write(2, { locale: 'es-ES' })).toBe('dos')
        expect(write(1, { locale: 'es-ES' })).toBe('un')
        expect(write(100, { locale: 'es-ES' })).toBe('cien')
    })

    // PORTUGUESE

    it('should write value in Reais', () => {
        expect(write(11.52, { locale: 'pt-BR', currency: 'BRL' })).toBe('onze reais e cinquenta e dois centavos')
        expect(write(2, { locale: 'pt-BR', currency: 'BRL' })).toBe('dois reais')
        expect(write(1, { locale: 'pt-BR', currency: 'BRL' })).toBe('um real')
        expect(write(100, { locale: 'pt-BR', currency: 'BRL' })).toBe('cem reais')
    })

    it('should write value in Portuguese-BR', () => {
        expect(write(11.52, { locale: 'pt-BR' })).toBe('onze vírgula cinquenta e dois')
        expect(write(1.12, { locale: 'pt-BR' })).toBe('um vírgula doze')
        expect(write(2, { locale: 'pt-BR' })).toBe('dois')
        expect(write(1, { locale: 'pt-BR' })).toBe('um')
        expect(write(100, { locale: 'pt-BR' })).toBe('cem')
    })
})