import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { fetchExchangeRate } from '../../store/slices/currencyReducer'

import Header from '../../components/Header'

export default function CurrencyRatesScreen() {

    const dispatch = useDispatch()

    const { rate } = useSelector(s => s.currency)

    useEffect(() => {
        dispatch(fetchExchangeRate({ cur: 'eur', goal: 'rub' }))
    }, [])

    useEffect(() => {
        console.log(rate);
    }, [rate])

    return (
        <View style={styles.container}>
            <Header headerText='Курсы валют'></Header>

            <View>
                <Text>Валюта</Text>
                <View>
                    <Text>Покупка</Text>
                    <Text>Продажа</Text>
                </View>
            </View>

            <View>
                <Text>{'USD'}</Text>
                <View>
                    <Text>{ rate }</Text>
                    <Text>{ rate }</Text>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#d3d3d3',
        height: '100%'
    },

})