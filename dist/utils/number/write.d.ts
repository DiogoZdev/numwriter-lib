import { Currency, Locale } from "../../types";
declare function write(value: number, { currency, locale }?: {
    currency?: Currency | null;
    locale?: Locale;
}): string;
export { write };
