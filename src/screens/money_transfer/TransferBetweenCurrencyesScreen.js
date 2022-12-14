import { Picker } from '@react-native-picker/picker'
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { fetchExchangeRate, resetMessage, transferBetweenCurrencyes } from '../../store/slices/currencyReducer'

export default function ClientMoneyRequestScreen() {
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
        if(num == '') return setSum(0)
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
                        setMessage('недостаточно средств на счету')
                        return
                    } else {
                        setMessage(null)
                        return
                    }
                }
            }

        }
    }

    function transfer() {
        if (!message) {
            console.log(idUser);
            dispatch(transferBetweenCurrencyes({
                id: idUser,
                sum,
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
            {showErrors()}
            <Text style={styles.text}>выберите счет</Text>
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
            <Text style={styles.text}>введите сумму в {currency.type}</Text>
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
            <Text style={styles.text}>без коммисии</Text>
            <Text style={styles.text}>иторго</Text>
            <Text style={styles.transferResult}>- {transferResult} {pickerCurrency}</Text>
            <Text style={styles.transferSum}>+ {sum} {currency.type}</Text>
            <TouchableOpacity
                style={styles.transferBtn}
                onPress={transfer}
            >
                <Text style={styles.transferBtnTxt}>перевести</Text>
            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        paddingHorizontal:10,
        backgroundColor: '#d3d3d3',
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
        color: '#ff0000'
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
        fontWeight:'bold',
        color: '#000'
    },
    transferBtn: {
        backgroundColor: '#00abfd',
        margin: 100,
        padding: 10,
        alignItems: 'center',
        borderRadius: 3
    },
    transferBtnTxt: {
        color: '#000',
        fontSize: 25,
        fontWeight: 'bold'
    }
})