import { ECurrency, ELocale } from "../../types"
import { write } from "./write"

describe('write', () => {

    it('should write number in Portuguese-BR', () => {
        expect(write(11.52)).toBe('onze ponto cinquenta e dois')
    })

    it.only('should write value in Portuguese-BR real', () => {

        console.log(write(11.52))
        console.log(write(11.52, {currency: 'BRL' as ECurrency}))
        console.log(write(11.52, {currency: 'BRL' as ECurrency, locale: 'pt-BR' as ELocale}))
        console.log(write(11.52, {currency: 'PESO' as ECurrency, locale: 'es-ES' as ELocale}))

        expect(write(11.52, {currency: 'BRL' as ECurrency})).toBe('onze reais e cinquenta e dois centavos')

    })


})