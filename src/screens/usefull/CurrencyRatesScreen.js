import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../../components/Header'

import { fetchAwalableCurrency } from '../../store/slices/currencyReducer'

export default function CurrencyRatesScreen() {
    const { awalableCurrency } = useSelector(s => s.currency)

    const dispatch = useDispatch()

    const [rates, setRates] = useState([])

    useEffect(() => {
        async function fetchRates() {
            if (awalableCurrency.length == 0) {
                await dispatch(fetchAwalableCurrency())
            }
            try {
                const resRates = []
                for (let i = 0; i < awalableCurrency.length; i++) {
                    const cur = awalableCurrency[i];
                    if (cur.type != 'RUB') {
                        const res = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${cur.type.toLowerCase()}/rub.json`)
                        const data = await res.json()
                        resRates.push({
                            val: data.rub,
                            type: cur.type
                        })
                    }
                }
                setRates(resRates)
            } catch (e) {
                console.log(e.message)
            }
        }
        fetchRates()
    }, [])



    return (
        <View style={styles.container}>
            <Header headerText='Курсы валют'></Header>

            <View style={[styles.rateBlock, { paddingVertical: 0, paddingTop: 10 }]} >
                <Text style={styles.rateTitleTxt}>Валюта</Text>
                <View style={styles.rateValBox}>
                    <View style={styles.rateBoxItem}>
                        <Text style={styles.rateTitleTxt}>Покупка</Text>
                    </View>
                    <View style={styles.rateBoxItem}>
                        <Text style={styles.rateTitleTxt}>Покупка</Text>
                    </View>
                </View>
            </View>

            {rates.map((rate, index) => {
                let { type, val } = rate
                if (type == 'KZT') {
                    type = "100 " + type
                    val = (val * 100).toFixed(2)
                } else val = val.toFixed(2)
                return (
                    < View style={styles.rateBlock} key={index} >
                        <View style={styles.rateTitleBox}>
                            <View style={styles.ratePic}>
                                <Text style={styles.ratePicTxt}>@</Text>
                            </View>
                            <Text style={styles.rateCurTxt}>{type}</Text>
                        </View>
                        <View style={styles.rateValBox}>
                            <View style={styles.rateBoxItem}>
                                <Text style={styles.rateValTxt}>{val}</Text>
                            </View>
                            <View style={styles.rateBoxItem}>
                                <Text style={styles.rateValTxt}>{val}</Text>
                            </View>
                        </View>
                    </View>)
            })}

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#d3d3d3',
        height: '100%'
    },

    rateTitleTxt: {},

    rateBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        width: '100%',
        alignItems:'center'
    },
    rateTitleBox: {
        alignItems:'center',
        flexDirection:'row'
    },
    ratePic: {
        paddingRight: 10
    },
    ratePicTxt:{
        color:'red',
        fontSize:40,
        fontWeight:'bold'
    },
    rateCurTxt: {
        color: '#000',
        fontSize: 17,
        fontWeight: 'bold'
    },
    rateValBox: {
        width: '50%',
        flexDirection: 'row',
    },
    rateBoxItem: {
        width: '50%',
    },
    rateValTxt: {
        color: '#000',
        fontSize: 17,
    }
})