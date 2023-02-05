import { useEffect, useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/Entypo'

import Header from '../../components/Header'

import { LogoAssets } from '../../../assets/logoAssets'

import { billPayment, fetchExchangeRate } from '../../store/slices/currencyReducer'
import { countCut } from '../../middleWare/currencyFormater'

export default function BillPaymentScreen() {
    const { bill } = useSelector(s => s.state.navigationData)
    const { currencyArray } = useSelector(s => s.currency)
    const { rate } = useSelector(s => s.currency)

    const [showAllCurrency, setShowAllCurrency] = useState(false)
    const [shownCurrencyLimit, setShownCurrencyLimit] = useState(3)
    const { defaultCurrencyAccount } = useSelector(s => s.currency)
    const [selectedCurrency, setSelectedCurrency] = useState(getDefaultCurrencyAccount())

    const dispatch = useDispatch()

    useEffect(() => {
        const firstCur = selectedCurrency.type
        const billCur = bill.sender.currency
        if (billCur !== firstCur) {
            dispatch(fetchExchangeRate({
                cur: billCur,
                goal: firstCur
            }))

        }
    }, [selectedCurrency])

    function getDefaultCurrencyAccount() {
        for (let i = 0; i < currencyArray.length; i++) {
            const acc = currencyArray[i];
            if (acc.type == defaultCurrencyAccount) return acc
        }
    }

    function calculateCost() {
        if (selectedCurrency.type == bill.sender.currency) {
            return `${bill.sender.sum} ${selectedCurrency.type}`
        } else {
            return `${countCut(bill.sender.sum * rate)} ${selectedCurrency.type}`
        }
    }

    function selectCurrencyBtnHandler(currency) {
        setSelectedCurrency(currency)
    }

    function payBtnHandler() {
        Alert.alert(
            'Оплатита',
            'вы действительно хотите оплатить счет?',
            [
                {
                    text: 'отмена',
                    onPress: () => null
                },
                {
                    text: 'оплатить',
                    onPress: () => {
                        pay()
                    }
                },
            ]
        )
    }

    function pay() {
        dispatch(billPayment({
            idUser: bill.receiver.id,
            idBill: bill._id,
            currencyType: selectedCurrency.type,
            rate
        }))
    }

    function moreCurrencyBtnHandler() {
        setShowAllCurrency(!showAllCurrency)
    }

    return (
        <View style={styles.container}>
            <Header headerText={bill.type} />

            <ScrollView style={styles.screenScroll}>

                <View style={styles.cardView}>
                    <View style={styles.blockView}>
                        <Text style={styles.labelTxt}>Адресат</Text>
                        <Text style={styles.text}>{bill.sender.number}</Text>
                    </View>
                    <View style={styles.blockView}>
                        <Text style={styles.labelTxt}>Дата</Text>
                        <Text style={styles.text}>{bill.registerDate}</Text>
                    </View>
                    {bill.comment
                        ? <View style={styles.blockView}>
                            <Text style={styles.labelTxt}>Комментарий</Text>
                            <Text style={styles.text}>{bill.comment}</Text>
                        </View>
                        : null
                    }
                </View>

                <View style={styles.cardView}>
                    <View style={[styles.blockView, { borderStyle: 'solid' }]}>
                        <Text style={styles.labelTxt}>способы оплаты</Text>
                        {currencyArray.map((currency, index) => {
                            if (index < shownCurrencyLimit || showAllCurrency) {
                                return <TouchableOpacity style={styles.currencyView} key={index}
                                    onPress={() => selectCurrencyBtnHandler(currency)}
                                >
                                    <Image
                                        source={LogoAssets['Wallet']}
                                        style={styles.currencyLogoPic}
                                    />
                                    <Text style={styles.currencyTxt}>{countCut(currency.count)} {currency.type}</Text>
                                    {currency.type == selectedCurrency.type
                                        ? <Icon name='chevron-left' style={styles.moreCurrencyIcon} /> : null
                                    }
                                </TouchableOpacity>
                            }
                        })}
                    </View>
                    {currencyArray.length > shownCurrencyLimit && !showAllCurrency
                        ? <TouchableOpacity style={styles.moreCurrencyBtn}
                            onPress={moreCurrencyBtnHandler}
                        >
                            <Icon name='dots-three-horizontal' style={styles.moreCurrencyIcon} />
                            <Text style={styles.currencyTxt}>Другие способы оплаты</Text>
                        </TouchableOpacity>
                        : null
                    }
                </View>

                <View style={styles.cardView}>
                    <View style={styles.blockView}>
                        <Text style={styles.labelTxt}>сумма</Text>
                        <Text style={styles.text}>{bill.sender.sum} {bill.sender.currency}</Text>
                    </View>
                    <View style={styles.costBlockView}>
                        <View style={styles.costItem}>
                            <Text style={styles.commissionTxt}>коммисия Wallet</Text>
                            <Text style={styles.commissionTxt}>0,00 {bill.sender.currency}</Text>
                        </View>
                        <View style={styles.costItem}>
                            <Text style={styles.commissionTxt}>коммисия</Text>
                            <Text style={styles.commissionTxt}>0,00 {bill.sender.currency}</Text>
                        </View>
                        {selectedCurrency.type != bill.sender.currency // TODO: 1большей валюты = ххх меньшей
                            ? <View style={styles.costItem}>
                                <Text style={styles.costDataTxt}>курс конвертации</Text>
                                <Text style={styles.costDataTxt}>1 {bill.sender.currency} = {1 * rate} {selectedCurrency.type}</Text>
                            </View>
                            : null
                        }
                        <View style={styles.costItem}>
                            <Text style={[styles.costDataTxt, { color: '#000' }]}>итого к оплате</Text>
                            <Text style={[styles.costDataTxt, { color: '#000', fontWeight: "bold" }]}>{calculateCost()}</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.payBtn}
                    onPress={payBtnHandler}>
                    <Text style={styles.payBtnTxt}>Оплатить</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        height: '100%'
    },
    screenScroll: {
        alignSelf: 'stretch'
    },

    cardView: {
        backgroundColor: '#fff',
        marginTop: 5,
        marginHorizontal: 5,
        paddingBottom: 20,
        paddingHorizontal: 15,
        borderRadius: 4
    },
    blockView: {
        borderBottomColor: '#ddd',
        borderBottomWidth: 1.5,
        borderStyle: 'dotted',
        paddingVertical: 10
    },
    labelTxt: {
        color: '#444',
        fontSize: 12
    },
    text: {
        color: 'gray',
        fontSize: 17
    },
    currencyView: {
        flexDirection: 'row',
        paddingTop: 10,
        alignItems: 'center'
    },
    currencyLogoPic: {
        width: 30,
        height: 30,
        borderRadius: 20,
    },
    currencyTxt: {
        fontSize: 17,
        color: '#000',
        paddingLeft: 5
    },

    moreCurrencyBtn: {
        paddingTop: 10,
        flexDirection: 'row',

    },
    moreCurrencyIcon: {
        fontSize: 17,
        color: '#000',
        alignSelf: 'center'
    },

    costBlockView: {
        paddingTop: 10
    },
    costItem: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    costDataTxt: {
        fontSize: 14,
        color: '#444',
    },

    payBtn: {
        backgroundColor: '#00abfd',
        marginTop: 50,
        padding: 10,
        alignItems: 'center',
        alignSelf: 'center',
        width: 150,
        borderRadius: 3
    },
    payBtnTxt: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold'
    }
})