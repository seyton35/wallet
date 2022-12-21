export function allRus(date) {
    const d = new Date(new Date(date).getTime())
    const month = monthRUS(d.getMonth())
    const day = d.getDate()
    const year = d.getFullYear()
    const hour = addZero(d.getHours())
    const minute = addZero(d.getMinutes())
    const second = addZero(d.getSeconds())


    return '' + day + ' ' + month + ' ' + year + ' г. ' + hour + ':' + minute + ':' + second
}

function addZero(num) {
    if (num < 10) {
        num = "0" + num
    }
    return num
}

function monthRUS(month) {
    switch (month) {
        case 0: return 'янв.'
        case 1: return 'фев.'
        case 2: return 'марта'
        case 3: return 'апр.'
        case 4: return 'майа'
        case 5: return 'июня'
        case 6: return 'июля'
        case 7: return 'авг.'
        case 8: return 'сен.'
        case 9: return 'ноя.'
        case 10: return 'окт.'
        case 11: return 'дек.'
        default: return 'err'
    }
}