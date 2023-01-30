export function getCurrencySymbol(currency) {
    let symbol
    switch (currency) {
        case 'RUB': symbol = '\u20bd'; break
        case 'USD': symbol = '\u0024'; break
        case 'EUR': symbol = '\u20AC'; break
        case 'UAH': symbol = '\u20B4'; break
        case 'KZT': symbol = '\u20b8'; break
        default:
            symbol = 'err'; break
    }
    return symbol
}