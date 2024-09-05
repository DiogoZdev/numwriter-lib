"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.write = write;
function write(value, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.currency, currency = _c === void 0 ? false : _c;
    if (value === 0)
        return "zero";
    var integerPart = Math.floor(value);
    var integerWords = convertIntegerToWords(integerPart);
    var decimalPart = Math.round((value - integerPart) * 100);
    var decimalWords = "";
    if (decimalPart > 0) {
        decimalWords = convertIntegerToWords(decimalPart);
        return "".concat(integerWords, " ").concat(currency ? "".concat(decimalPart > 1 ? 'reais' : 'real', " e") : 'ponto', " ").concat(decimalWords, " ").concat(currency ? decimalPart > 1 ? 'centavos' : 'centavo' : '');
    }
    return "".concat(integerWords, " ").concat(currency ? decimalPart > 1 ? 'reais' : 'real' : '');
}
function convertIntegerToWords(number) {
    var units = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
    var tens = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
    var hundreds = ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];
    if (number < 20)
        return units[number];
    if (number < 100)
        return "".concat(tens[Math.floor(number / 10)]).concat(units[number % 10] ? " e " + units[number % 10] : "");
    if (number === 100)
        return "cem";
    if (number < 1000) {
        var remainder = number % 100;
        return "".concat(hundreds[Math.floor(number / 100)]).concat(remainder ? " e " + convertIntegerToWords(remainder) : "");
    }
    if (number < 1000000) {
        return convertLargeNumberToWords(number, 1000, "mil");
    }
    if (number < 1000000000) {
        return convertLargeNumberToWords(number, 1000000, "milhão", "milhões");
    }
    return convertLargeNumberToWords(number, 1000000000, "bilhão", "bilhões");
}
function convertLargeNumberToWords(number, divisor, singular, plural) {
    if (plural === void 0) { plural = ""; }
    var quotient = Math.floor(number / divisor);
    var remainder = number % divisor;
    var quotientWords = quotient === 1 ? singular : convertIntegerToWords(quotient) + " " + (quotient > 1 && plural ? plural : singular);
    var remainderWords = remainder ? (remainder < 100 ? " e " : " ") + convertIntegerToWords(remainder) : "";
    return "".concat(quotientWords).concat(remainderWords);
}
