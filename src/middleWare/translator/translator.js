import { dictionary } from "./dictionary";

export function translate(text, lang, slice = false) {
    if (lang == 'ru') {
        return text
    }
    if (slice) {
        const arr = text.split(' ')
        const res = arr.map(el => {
            return translate(el, lang)
        })
        return text = res.join(' ')
    }
    if (dictionary[text]?.[lang]) {
        return dictionary[text][lang]
    } else return text
}