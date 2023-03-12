import { dictionary } from "./dictionary";

export function translate(text, lang) {
    if (lang == 'ru') {
        return text
    }
    if (dictionary[text]?.[lang]) {
        return dictionary[text][lang]
    } else return text
}