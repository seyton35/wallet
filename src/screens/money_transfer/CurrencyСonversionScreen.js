import { Picker } from '@react-native-picker/picker'
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { fetchExchangeRate, resetMessage, currency–°onversion, setErrorMessage } from '../../store/slices/currencyReducer'

import Header from '../../components/Header'

export default function Currency–°onversionScreen() {
    const [pickerCurrency, setPickerCurrency] = useState()
    const [sum, setSum] = useState(0)
    const [message, setMessage] = useState(null)
    const [transferResult, setTransferResult] = useState(0)


    const idUser = useSelector(s => s.state.userData.idUser)

    const currency = useSelector(s => s.currency.selectedCurrency)
    const currencyArray = useSelector(s => s.currency.currencyArray)
    const rateStatus = useSelector(s => s.currency.rateStatus)
    const rate = useSelector(s => s.currency.rate)
    const error = useSelector(s => s.currency.error)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(resetMessage())
        for (let i = 0; i < currencyArray.length; i++) {
            const cur = currencyArray[i];
            if (cur.type !== currency.type) {
                setPickerCurrency(cur.type)
                return
            }
        }
    }, [])

    useEffect(() => {
        getRate()
    }, [pickerCurrency])

    function getRate() {
        if (pickerCurrency !== null) {
            dispatch(fetchExchangeRate({ cur: currency.type, goal: pickerCurrency }))
        }
    }

    function summHandler(num) {
        if (num == '') return setSum(0)
        if (num[0] == '.') num = '0' + num
        const reg = /[^0-9\.]/
        if (num.search(reg) === -1) {
            setSum(num)
            const deposit = num * rate
            for (let i = 0; i < currencyArray.length; i++) {
                const cur = currencyArray[i];
                if (cur.type === pickerCurrency) {
                    setTransferResult(deposit)
                    if (deposit > cur.count) {
                        setMessage('–Ĺ–Ķ–ī–ĺ—Ā—ā–į—ā–ĺ—á–Ĺ–ĺ —Ā—Ä–Ķ–ī—Ā—ā–≤ –Ĺ–į —Ā—á–Ķ—ā—É')
                        return
                    } else {
                        setMessage(null)
                        return
                    }
                }
            }

        }
    }

    function conversion() {
        if (sum <=0) {
            setMessage('–≤–≤–Ķ–ī–ł—ā–Ķ —Ā—É–ľ–ľ—É')
            return 
        }
        if (!message) {
            dispatch(currency–°onversion({
                id: idUser,
                sum: Number(sum),
                rate,
                recipient: currency.type,
                donor: pickerCurrency
            }))
        }
    }

    function showErrors() {
        if (message) return <Text style={styles.message}>{message}</Text>
        else if (error) return <Text style={styles.message}>{error}</Text>
    }

    return (
        <View style={styles.container}>
            <Header headerText='–Ņ–Ķ—Ä–Ķ–≤–ĺ–ī –ľ–Ķ–∂–ī—É —Ā—á–Ķ—ā–į–ľ–ł' />
            {showErrors()}
            <ScrollView style={styles.screenScroll}>


                <Text style={styles.text}>–≤—č–Ī–Ķ—Ä–ł—ā–Ķ —Ā—á–Ķ—ā</Text>
                <Picker
                    selectedValue={pickerCurrency}
                    onValueChange={setPickerCurrency}
                >
                    {
                        currencyArray.map((cur, index) => {
                            if (cur.type !== currency.type) {
                                return (
                                    <Picker.Item
                                        key={index}
                                        label={`${cur.type}   ${cur.count.toFixed(3)}...`}
                                        value={cur.type}
                                    />
                                )
                            }
                        })
                    }
                </Picker>
                <Text style={styles.text}>–≤–≤–Ķ–ī–ł—ā–Ķ —Ā—É–ľ–ľ—É –≤ {currency.type}</Text>
                <TextInput
                    style={styles.sumRequest}
                    keyboardType='decimal-pad'
                    placeholder={'0'}
                    value={sum}
                    onChangeText={num => summHandler(num)}
                />
                {rateStatus === 'complete'
                    ? <Text>1 {currency.type} = {rate} {pickerCurrency}</Text>
                    : <Text>{rateStatus}</Text>
                }
                <Text style={styles.text}>–Ī–Ķ–∑ –ļ–ĺ–ľ–ľ–ł—Ā–ł–ł</Text>
                <Text style={styles.text}>–ł—ā–ĺ—Ä–≥–ĺ</Text>
                <Text style={styles.transferResult}>- {transferResult} {pickerCurrency}</Text>
                <Text style={styles.transferSum}>+ {sum} {currency.type}</Text>
                <TouchableOpacity
                    style={styles.conversionBtn}
                    onPress={conversion}
                >
                    <Text style={styles.conversionBtnTxt}>–Ņ–Ķ—Ä–Ķ–≤–Ķ—Ā—ā–ł</Text>
                </TouchableOpacity>
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 40,
        width: '100%',
        backgroundColor: '#d3d3d3',
    },
    screenScroll: {
        paddingHorizontal: 10
    },
    serviceTouchArea: {
        marginLeft: 5,
        marginRight: 5,
    },
    sumRequest: {
        // backgroundColor:'#d1d1d1',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderBottomColor: '#d1d1d1',
        borderTopColor: '#d1d1d1',
    },
    message: {
        color: '#ff0000',
        paddingLeft:10
    },
    text: {
        color: '#000',
        fontSize: 17,
    },
    transferResult: {
        fontSize: 20,
        color: '#000',
    },
    transferSum: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000'
    },
    conversionBtn: {
        backgroundColor: '#00abfd',
        margin: 100,
        padding: 10,
        alignItems: 'center',
        borderRadius: 3
    },
    conversionBtnTxt: {
        color: '#000',
        fontSize: 25,
        fontWeight: 'bold'
    }
})