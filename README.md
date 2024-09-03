# numwriter

This is a simple lib to convert numbers in their writen form.
Initially it's only working in Portuguese-BR.

## Installing

```bash
npm install numwriter
```


## How to use it

```js
import { write } from 'numwriter'

write(321);
// returns 'trezentos e vinte e um'

write(321.50, { currency: true });
// returns 'trezentos e vinte e um reais e cinquenta centavos'
```
