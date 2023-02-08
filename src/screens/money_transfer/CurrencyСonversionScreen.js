import { Picker } from '@react-native-picker/picker'
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { fetchExchangeRate, resetMessage, currencyСonversion, setErrorMessage } from '../../store/slices/currencyReducer'

import Header from '../../components/Header'
import { countCut, getCurrencySymbol } from '../../middleWare/currencyFormater'
import OcticonsIcon from 'react-native-vector-icons/Octicons'
import EntypoIcon from 'react-native-vector-icons/Entypo'

export default function CurrencyСonversionScreen() {
    const { selectedCurrency } = useSelector(s => s.currency)
    const [donor, setDonor] = useState()
    const [receiver, setReceiver] = useState()
    const [sum, setSum] = useState('')
    const currencyAccountsArray = useSelector(s => s.currency.currencyArray)
    const { availableCurrencies } = useSelector(s => s.currency)

    const getLimmits = () => {
        for (let i = 0; i < availableCurrencies.length; i++) {
            const cur = availableCurrencies[i];
            if (cur.type == receiver) {
                const { limMin, limMax } = cur
                return { limMin, limMax }
            }
        }
    }

    const [limmits, setLimmits] = useState(getLimmits())

    const [message, setMessage] = useState(null)
    const error = useSelector(s => s.currency.error)

    const rate = useSelector(s => s.currency.rate)

    const dispatch = useDispatch()

    useEffect(() => {
        if (selectedCurrency !== null) {
            setReceiver(selectedCurrency.type)
            for (let i = 0; i < currencyAccountsArray.length; i++) {
                const cur = currencyAccountsArray[i];
                if (cur.type !== selectedCurrency.type) {
                    return setDonor(cur.type)
                }
            }
        }
    }, [selectedCurrency])

    useEffect(() => {
        getRate()
        setLimmits(getLimmits())
    }, [receiver])

    useEffect(() => {
        getRate()
    }, [donor])



    const swapCurrencies = () => {
        const cup = donor
        setDonor(receiver)
        setReceiver(cup)
    }

    const setPickerHandler = (title, val) => {
        if (title == 'donor') {
            if (receiver == val) {
                swapCurrencies()
            } else {
                setDonor(val)
            }
        } else {
            if (donor == val) {
                swapCurrencies()
            } else {
                setReceiver(val)
            }
        }
    }

    const resetSum = () => {
        setSum('')
    }

    const sumHandler = (val) => {
        if (val == '') return setSum('')

        const reg = /\.[\d]{3,}/g
        const num = Number(val)
        if (!isNaN(num)) {
            if (val.search(reg) == -1) {
                setSum(val)
            }
        }
    }

    const showConversionRate = () => {
        let multiplier = 1
        for (let i = 0; i < 10; i++) {
            if (1 > rate * multiplier) {
                multiplier *= 10
            }
            else i = 10
            continue
        }
        const eq = countCut(rate * multiplier)
        return `${multiplier} ${getCurrencySymbol(receiver)} = ${eq} ${getCurrencySymbol(donor)}`
    }

    const showWriteOffAmmount = () => {
        let ammount = countCut(sum * rate)
        if (ammount < .1) {
            ammount = .1
        }
        return `${ammount} ${getCurrencySymbol(donor)}`
    }

    function getRate() {
        if (donor !== null && receiver !== null) {
            dispatch(fetchExchangeRate({ cur: receiver, goal: donor }))
        }
    }

    function conversion() {
        if (sum <= 0) {
            setMessage('введите сумму')
            return
        }
        if (!message) {
            dispatch(currencyСonversion({
                sum: Number(sum),
                rate,
                recipient: receiver,
                donor
            }))
        }
    }

    function showErrors() {
        if (message) return <Text style={styles.message}>{message}</Text>
        else if (error) return <Text style={styles.message}>{error}</Text>
    }

    return (
        <View style={styles.container}>
            <Header headerText='Платеж' />
            {showErrors()}
            <ScrollView style={styles.screenScroll}>

                <View style={styles.titleBox}>
                    <Text style={styles.titleTxt}>Перевод между счетами</Text>
                </View>
                <View style={styles.form}>
                    <View style={styles.pickersBox}>

                        <View style={styles.switchCurrBtnBox}>
                            <Pressable style={styles.switchCurrBtn}
                                onPress={swapCurrencies}
                            >
                                <OcticonsIcon name='arrow-switch' style={styles.icon} />
                            </Pressable>
                        </View>

                        <View style={styles.pickerBox}>
                            <Text style={styles.labelTxt}>со счета</Text>
                            <Picker
                                selectedValue={donor}
                                onValueChange={(val) => setPickerHandler('donor', val)}
                                style={styles.picker}
                            >
                                {currencyAccountsArray.map((cur, index) => {
                                    return (
                                        <Picker.Item
                                            key={index}
                                            label={`Счет Wallet: ${countCut(cur.count)} ${cur.type}`}
                                            value={cur.type}
                                        />
                                    )
                                })}
                            </Picker>
                            <Text style={styles.labelTxt}>на счет</Text>
                            <Picker
                                selectedValue={receiver}
                                onValueChange={(val) => setPickerHandler('receiver', val)}
                                style={styles.picker}
                            >
                                {currencyAccountsArray.map((cur, index) => {
                                    return (
                                        <Picker.Item
                                            key={index}
                                            label={`Счет Wallet: ${countCut(cur.count)} ${cur.type}`}
                                            value={cur.type}
                                        />
                                    )
                                })}
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.inputBlock}>
                        <View style={styles.inputLabelBox}>
                            {sum != ''
                                ? <Text style={styles.inputLabelTxt}>Сумма в {getCurrencySymbol(receiver)}</Text>
                                : null
                            }
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder='Сумма'
                            value={sum}
                            onChangeText={sumHandler}
                            keyboardType='decimal-pad'
                        />
                        {sum !== ''
                            ? <Pressable style={styles.inputCrossBox}
                                onPress={resetSum}
                            >
                                <EntypoIcon style={styles.inputCrossIcon} name='cross' />
                            </Pressable>
                            : null
                        }
                        <View style={styles.limitBox}>
                            {limmits
                                ? <Text style={styles.limitTxt}>От {limmits.limMin} {getCurrencySymbol(receiver)} до {limmits.limMax} {getCurrencySymbol(receiver)}</Text>
                                : null
                            }
                        </View>
                    </View>

                    {sum != ''
                        ? <View style={styles.commissionBlock}>
                            <View style={styles.commissionBox}>
                                <Text style={styles.commissionTxt}>комиссия Wallet:</Text>
                                <Text style={styles.commissionTxt}>0 {getCurrencySymbol(receiver)}</Text>
                            </View>
                            <View style={styles.commissionBox}>
                                <Text style={styles.commissionTxt}>Курс конвертации:</Text>
                                <Text style={styles.commissionTxt}>{showConversionRate()}</Text>
                            </View>
                            <View style={styles.commissionBox}>
                                <Text style={styles.ammountTxt}>Будет зачислено:</Text>
                                <Text style={styles.ammountTxt}>{sum} {getCurrencySymbol(receiver)}</Text>
                            </View>
                            <View style={styles.commissionBox}>
                                <Text style={styles.ammountTxt}>Будет списано:</Text>
                                <Text style={styles.ammountTxt}>{showWriteOffAmmount()}</Text>
                            </View>
                        </View>
                        : null
                    }


                    <TouchableOpacity style={styles.conversionBtn}
                        onPress={conversion}
                    >
                        <Text style={styles.conversionBtnTxt}>Перевести</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView >
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 40,
        width: '100%',
    },
    screenScroll: {
        paddingHorizontal: 10
    },

    titleBox: {
        paddingVertical: 15,
        paddingHorizontal: 5
    },
    titleTxt: {
        color: '#000',
        fontSize: 25,
        fontWeight: 'bold'
    },

    form: {
        paddingVertical: 25,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    pickersBox: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingBottom: 20,
        borderBottomColor: '#d1d1d1',
    },
    switchCurrBtnBox: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    switchCurrBtn: {
        position: 'absolute',
        padding: 5,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 40,
        borderColor: '#999',
        borderWidth: 1,
        transform: [{
            rotate: '90deg'
        }]
    },
    icon: {
        color: '#000',
        fontSize: 22,
    },
    labelTxt: {
        color: '#888',
        fontSize: 14
    },
    pickerBox: {
        width: '80%'
    },
    picker: {
        borderBottomColor: '#d1d1d1',
        borderBottomWidth: 2,
    },

    inputBlock: {
        paddingHorizontal: 20,
        marginTop: 30
    },
    inputLabelBox: {
        justifyContent: 'center',
        marginLeft: 5
    },
    inputLabelTxt: {
        position: 'absolute',
        color: '#00abfd'
    },
    input: {
        color: '#000',
        borderBottomWidth: 2,
        borderBottomColor: '#999'
    },
    inputCrossBox: {
        position: 'absolute',
        top: 25,
        right: 15
    },
    inputCrossIcon: {
        color: '#888',
        fontSize: 20
    },
    limitBox: {},
    limitTxt: {
        color: '#888',
        fontSize: 12
    },

    commissionBlock: {
        paddingTop: 10,
        paddingHorizontal: 20
    },
    commissionBox: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    commissionTxt: {
        color: '#888',
        fontSize: 14
    },
    ammountTxt: {
        color: '#000',
        fontSize: 14
    },

    conversionBtn: {
        backgroundColor: '#00abfd',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 30,
        marginHorizontal: 10,
        marginTop: 20
    },
    conversionBtnTxt: {
        color: '#fff',
        fontSize: 17,
    },
})