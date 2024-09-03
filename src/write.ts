export function write(value: number, { currency = false }: { currency?: boolean }): string {
  if (value === 0) return "zero";

  const integerPart = Math.floor(value);
  let integerWords = convertIntegerToWords(integerPart);

  const decimalPart = Math.round((value - integerPart) * 100);
  let decimalWords = "";

  if (decimalPart > 0) {
    decimalWords = convertIntegerToWords(decimalPart);
    return `${integerWords} ${currency ? `${decimalPart > 1 ? 'reais' : 'real'} e` : 'ponto'} ${decimalWords} ${currency ? decimalPart > 1 ? 'centavos' : 'centavo':''}`;
  }

  return `${integerWords} ${currency ? decimalPart > 1 ? 'reais' : 'real' : ''}`;
}
  
function convertIntegerToWords(number: number): string {
  const units = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
  const tens = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
  const hundreds = ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];

  if (number < 20) return units[number];
  if (number < 100) return `${tens[Math.floor(number / 10)]}${units[number % 10] ? " e " + units[number % 10] : ""}`;
  if (number === 100) return "cem";
  if (number < 1000) {
    const remainder = number % 100;
    return `${hundreds[Math.floor(number / 100)]}${remainder ? " e " + convertIntegerToWords(remainder) : ""}`;
  }

  if (number < 1000000) {
    return convertLargeNumberToWords(number, 1000, "mil");
  }

  if (number < 1000000000) {
    return convertLargeNumberToWords(number, 1000000, "milhão", "milhões");
  }

  return convertLargeNumberToWords(number, 1000000000, "bilhão", "bilhões");
}
  
function convertLargeNumberToWords(number: number, divisor: number, singular: string, plural: string = ""): string {
  const quotient = Math.floor(number / divisor);
  const remainder = number % divisor;

  const quotientWords = quotient === 1 ? singular : convertIntegerToWords(quotient) + " " + (quotient > 1 && plural ? plural : singular);
  const remainderWords = remainder ? (remainder < 100 ? " e " : " ") + convertIntegerToWords(remainder) : "";

  return `${quotientWords}${remainderWords}`;
}

console.log(write(123_456.78, { currency: false }))