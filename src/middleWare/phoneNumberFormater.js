export const phoneNumberMask1 = (number) => {
    number = String(number)
    let phoneNumber = '+'
    for (let i = 0; i < number.length; i++) {
        const char = number[i];
        if (i == 1 || i == 4) {
            phoneNumber += ' '
        }
        if (i == 7 || i == 9) {
            phoneNumber += '-'
        }
        phoneNumber += char
    }
    return phoneNumber
}