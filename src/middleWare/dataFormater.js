export function fullDate(date) {
    const d = new Date(new Date(date).getTime())
    const month = shirtMonthRUS(d.getMonth())
    const day = d.getDate()
    const year = d.getFullYear()
    let time = JSON.stringify(d)
    time = time.slice(12, 20)
    return day + ' ' + month + ' ' + year + ' г. ' + time
}

export function dayMonthYear(date) {
    const d = new Date(new Date(date).getTime())
    const month = fullMonth(d.getMonth())
    const day = d.getDate()
    const year = d.getFullYear()

    return day + ' ' + month + ' ' + year
}
export function dayMonth(date) {
    const d = new Date(new Date(date).getTime())
    const month = fullMonth(d.getMonth())
    const day = d.getDate()

    return day + ' ' + month
}

export function getDayMonthYear(date) {
    const d = new Date(new Date(date).getTime())
    const day = d.getDate()
    const month = d.getMonth()
    const year = d.getFullYear()
    return {
        day,
        month,
        year
    }
}

function shirtMonthRUS(month) {
    switch (month) {
        case 0: return 'янв.'
        case 1: return 'фев.'
        case 2: return 'марта'
        case 3: return 'апр.'
        case 4: return 'мая'
        case 5: return 'июня'
        case 6: return 'июля'
        case 7: return 'авг.'
        case 8: return 'сен.'
        case 9: return 'окт.'
        case 10: return 'ноя.'
        case 11: return 'дек.'
        default: return 'err'
    }
}
function fullMonth(month) {
    switch (month) {
        case 0: return 'ЯНВАРЯ'
        case 1: return 'ФЕВРАЛЯ'
        case 2: return 'МАРТА'
        case 3: return 'АПРЕЛЯ'
        case 4: return 'МАЙА'
        case 5: return 'ИЮНЯ'
        case 6: return 'ИЮЛЯ'
        case 7: return 'АВГУСТА'
        case 8: return 'СЕНТЯБРЯ'
        case 9: return 'ОКТЯБРЯ'
        case 10: return 'НОЯБРЯ'
        case 11: return 'ДЕКАБРЯ'
        default: return 'ERR'
    }
}