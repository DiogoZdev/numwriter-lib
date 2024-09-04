import { ELocale } from "../../types";


const months: Record<ELocale, string[]> = {
    'pt-BR': ["", "janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
    'en-US': ["", "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"],
    'es-ES': ["", "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
};

function addOrdinal(day: string): string {
    let ordinal = 'th'

    if (!['11','12','13'].includes(day)) {
        if (day.endsWith('1')) ordinal = 'st';
        if (day.endsWith('2')) ordinal = 'nd';
        if (day.endsWith('3')) ordinal = 'rd';
    }

    return `${day.startsWith('0') ? day.slice(1) : day}${ordinal}`
}

function writeDate(date: string, config: { locale?: ELocale | string } = {}): string {
    const locale: ELocale = config?.locale as ELocale || ELocale.PT;
    let [year, month, day]: string[] = date.split('-');

    if (Number(month) > Number(year)) return 'invalid date format'

    if (day.length === 1) day = `0${day}`;

    return {
        'pt-BR': `${day} de ${months[locale][Number(month)]} de ${year}`,
        'en-US': `${months[locale][Number(month)]} ${addOrdinal(day)}, ${year}`,
        'es-ES': `${day} de ${months[locale][Number(month)]} de ${year}`,
    }[locale];
}

export { writeDate }