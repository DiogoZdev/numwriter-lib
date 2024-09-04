import { ECurrency, ELocale } from "../../types";

const numbers: Record<ELocale, { units: string[], tens: string[], hundreds: string[] }> = {
  'pt-BR': {
    units: ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'],
    tens: ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'],
    hundreds: ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos'],
  },
  'en-US': {
    units: ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen' ],
    tens: ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'],
    hundreds: ['', 'hundred', 'two hundred', 'three hundred', 'four hundred', 'five hundred', 'six hundred', 'seven hundred', 'eight hundred', 'nine hundred'],
  },
  'es-ES': {
    units: ['', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciseis', 'diecisiete', 'dieciocho', 'diecinueve'],
    tens: ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'],
    hundreds: ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'],
  },
}

const bigNumbers: Record<ELocale, Record<string, { singular: string; plural: string }>> = {
  'pt-BR': {
    thousand: {
      singular: 'mil',
      plural: 'mil',
    },
    million: {
      singular: 'milhão',
      plural: 'milhões',
    },
    billion: {
      singular: 'bilhão',
      plural: 'bilhões',
    },
  },
  'en-US': {
    thousand: {
      singular: 'thousand',
      plural: 'thousand',
    },
    million: {
      singular: 'million',
      plural: 'million',
    },
    billion: {
      singular: 'billion',
      plural: 'billion',
    },
  },
  'es-ES': {
    thousand: {
      singular: 'mil',
      plural: 'mil',
    },
    million: {
      singular: 'millón',
      plural: 'millones',
    },
    billion: {
      singular: 'billón',
      plural: 'billones',
    },
  },
}

const words: Record<ELocale, Record<string, string>> = {
  'pt-BR': {
    connection: 'e',
    divisor: 'ponto',
  },
  'en-US': {
    connection: '',
    divisor: 'dot',
  },
  'es-ES': {
    connection: 'y',
    divisor: 'punto',
  },
}

const currencyValues: Record<ECurrency, { singular: string; plural: string, smallSingular: string; smallPlural: string }> = {
  BRL: {
    singular: 'real',
    plural: 'reais',
    smallSingular: 'centavo',
    smallPlural: 'centavos',
  },
  USD: {
    singular: 'dollar',
    plural: 'dollars',
    smallSingular: 'cent',
    smallPlural: 'cents',
  },
  EUR: {
    singular: 'euro',
    plural: 'euros',
    smallSingular: 'cent',
    smallPlural: 'cents',
  },
  PESO: {
    singular: 'peso',
    plural: 'pesos',
    smallSingular: 'centavo',
    smallPlural: 'centavos',
  },
}

const conf = {
  locale: ELocale.PT,
}

export function write(value: number, { currency = null, locale = ELocale.EN }: { currency?: ECurrency | null; locale?: ELocale;  } = {}): string {
  conf.locale = locale;

  let plural = ''
  let singular = ''
  let smallPlural = ''
  let smallSingular = ''

  if (currency) {
    plural = currencyValues[currency].plural
    singular = currencyValues[currency].singular
    smallPlural = currencyValues[currency].smallPlural
    smallSingular = currencyValues[currency].smallSingular
  }


  if (value === 0) return numbers[conf.locale].units[0];

  const integerPart = Math.floor(value);
  let integerWords = convertIntegerToWords(integerPart);

  const decimalPart = Math.round((value - integerPart) * 100);
  let decimalWords = "";

  if (decimalPart > 0) {
    decimalWords = convertIntegerToWords(decimalPart);
    return `${integerWords}${currency ? `${decimalPart > 1 ? ` ${plural}` : ` ${singular}`}${words[conf.locale].connection ? ' '+words[conf.locale].connection : ''}` : ` ${words[conf.locale].divisor}`} ${decimalWords}${currency ? decimalPart > 1 ? ` ${smallPlural}` : ` ${smallSingular}` : ''}`.replace('  ', ' ');
  }

  return String(`${integerWords}${currency ? decimalPart > 1 ? ` ${plural}` : ` ${singular}` : ''}`).replace('  ', ' ');
}
  
function convertIntegerToWords(number: number): string {
  if (number < 20) return numbers[conf.locale].units[number];
  if (number < 100) return `${numbers[conf.locale].tens[Math.floor(number / 10)]}${numbers[conf.locale].units[number % 10] ? ` ${words[conf.locale].connection} ` + numbers[conf.locale].units[number % 10] : ""}`;
  if (number === 100) return "cem";
  if (number < 1000) {
    const remainder = number % 100;
    return `${numbers[conf.locale].hundreds[Math.floor(number / 100)]}${remainder ? ` ${words[conf.locale].connection} ` + convertIntegerToWords(remainder) : ""}`;
  }

  if (number < 1000000) {
    return convertLargeNumberToWords(number, 1000, bigNumbers[conf.locale].thousand.singular, bigNumbers[conf.locale].thousand.plural);
  }

  if (number < 1000000000) {
    return convertLargeNumberToWords(number, 1000000, bigNumbers[conf.locale].million.singular, bigNumbers[conf.locale].million.plural);
  }

  return convertLargeNumberToWords(number, 1000000000, bigNumbers[conf.locale].billion.singular, bigNumbers[conf.locale].billion.plural);
}
  
function convertLargeNumberToWords(number: number, divisor: number, singular: string, plural: string = ""): string {
  const quotient = Math.floor(number / divisor);
  const remainder = number % divisor;

  const quotientWords = quotient === 1 ? singular : convertIntegerToWords(quotient) + " " + (quotient > 1 && plural ? plural : singular);
  const remainderWords = remainder ? (remainder < 100 ? ` ${words[conf.locale].connection} ` : " ") + convertIntegerToWords(remainder) : "";

  return `${quotientWords}${remainderWords}`
}
