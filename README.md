# numwriter

This is a simple lib to convert numbers and dater in their writen form.
Working in Portuguese-BR, Spanish and English.

## Installing

```bash
npm install numwriter
```

## Definitions 


```
locales = 'pt-BR' | 'en-US' | 'es-ES'

currency = 'BRL' | 'DOL' | 'PESO' | 'EUR'

```

## How to use it


### Numbers or Currency

```js
import { write } from 'numwriter'

write(320);
// returns 'three hundred twenty'

write(320, { locale: 'pt-BR' });
// returns 'trezentos e vinte'

write(320.50, { currency: 'DOL' });
// returns 'three hundred twenty dollars and fifty cents'

write(320.50, { currency: 'EUR', locale: 'es-ES' });
// returns 'trecientos y veinte euros y cincuenta cents'
```

### Dates

```js
import { writeDate } from 'numwriter'

writeDate('2024-10-11');
// returns 'october 11th, 2024'

writeDate('2024-10-11', { locale: 'pt-BR' });
// returns '11 de outubro de 2024'
 
writeDate('2024-10-11', { locale: 'es-ES' })
// returns '11 de octubre de 2024'

```
