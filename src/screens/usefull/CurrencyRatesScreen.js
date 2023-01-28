import { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { flag40x40Assets } from '../../../assets/flag40x40Assets'

import Header from '../../components/Header'
import Loading from '../../components/Loading'
import { fetchAvailableCurrencyRates } from '../../store/slices/currencyReducer'

export default function CurrencyRatesScreen() {
    const { availableCurrencyRates } = useSelector(s => s.currency)
    const { pending } = useSelector(s => s.currency)

    const dispatch = useDispatch()

    useEffect(() => {
        if (availableCurrencyRates.length == 0) {
            dispatch(fetchAvailableCurrencyRates())
        }
    }, [])

    return (
        <View style={styles.container}>
            <Header headerText='Курсы валют' />

            {pending
                ?
                <Loading />
                : <>
                    <View style={[styles.rateBlock, { paddingVertical: 0, paddingTop: 10 }]} >
                        <Text style={styles.rateTitleTxt}>Валюта</Text>
                        <View style={styles.rateValBox}>
                            <View style={styles.rateBoxItem}>
                                <Text style={styles.rateTitleTxt}>Покупка</Text>
                            </View>
                            <View style={styles.rateBoxItem}>
                                <Text style={styles.rateTitleTxt}>Продажа</Text>
                            </View>
                        </View>
                    </View>

                    {availableCurrencyRates.map((rate, index) => {
                        let { type, val } = rate
                        const flag = type
                        if (type == 'KZT') {
                            type = "100 " + type
                            val = (val * 100).toFixed(2)
                        } else val = val.toFixed(2)
                        return (
                            < View style={styles.rateBlock} key={index} >
                                <View style={styles.rateTitleBox}>
                                    <View style={styles.ratePic}>
                                        <Image
                                            source={flag40x40Assets[flag]}
                                            style={{ width: 40, height: 40, borderRadius: 20, }}
                                        />
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
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        height: '100%'
    },

    availableCurrencyListStatusView: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignSelf: 'center',
        flexDirection: 'row'
    },
    availableCurrencyListStatusText: {
        fontSize: 17,
        color: '#000'
    },

    rateTitleTxt: {},

    rateBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        width: '100%',
        alignItems: 'center'
    },
    rateTitleBox: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    ratePic: {
        paddingRight: 10,
        paddingVertical: 5
    },
    ratePicTxt: {
        color: 'red',
        fontSize: 40,
        fontWeight: 'bold'
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