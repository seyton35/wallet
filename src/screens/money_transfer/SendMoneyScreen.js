import { useEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Entypo from 'react-native-vector-icons/Entypo'

import Header from '../../components/Header'
import Txt from '../../components/Txt'

import { LogoAssets } from '../../../assets/logoAssets'
import { countCut, getCurrencySymbol } from '../../middleWare/currencyFormater'
import { Picker } from '@react-native-picker/picker'
import { fetchExchangeRate, sendMoneyRequest, setErrorMessage } from '../../store/slices/currencyReducer'
import { translate } from '../../middleWare/translator/translator'


export default function SendMoneyScreen() {
    const { errormessage } = useSelector(s => s.currency)
    //receiver state
    const [phoneNumber, setPhoneNumber] = useState('+')
    const [isPhoneOk, setIsPhoneOk] = useState(false)
    const [comment, setComment] = useState()
    const [commentView, setCommentView] = useState(false)
    //currency acc's list
    const { currencyArray } = useSelector(s => s.currency)
    const [showAllCurrency, setShowAllCurrency] = useState(false)
    const [shownCurrencyLimit, setShownCurrencyLimit] = useState(3)
    const { defaultCurrencyAccount } = useSelector(s => s.currency)
    const [selectedCurrency, setSelectedCurrency] = useState(getDefaultCurrencyAccount())
    //receiver currency and rate
    const [pickerCurrency, setPickerCurrency] = useState(defaultCurrencyAccount)
    const [sum, setSum] = useState('')
    const [isSumOk, setIsSumOk] = useState(false)
    const { availableCurrencies } = useSelector(s => s.currency)
    const [moneyRequestLimits, setMoneyRequestLimits] = useState()

    const rate = useSelector(s => s.currency.rate)
    const { language } = useSelector(s => s.state)

    const dispatch = useDispatch()

    useEffect(() => {
        setMoneyRequestLimits({
            limMax: availableCurrencies[0]?.limMax,
            limMin: availableCurrencies[0]?.limMin
        })
    }, [])

    useEffect(() => {
        getRate()
    }, [pickerCurrency, selectedCurrency])

    function tr(text) {
        return translate(text, language)
    }

    function phoneNumHandler(num) {
        dispatch(setErrorMessage())
        if (num == '') {
            return setPhoneNumber('+')
        }
        reg = /\+\d{12}/
        if (num.search(reg) === -1) {
            setPhoneNumber(num)
            if (num.length == 12) {
                setIsPhoneOk(true)
            } else setIsPhoneOk(false)
        }
    }

    function getDefaultCurrencyAccount() {
        for (let i = 0; i < currencyArray.length; i++) {
            const acc = currencyArray[i];
            if (acc.type == defaultCurrencyAccount) return acc
        }
    }

    function selectCurrencyBtnHandler(currency) {
        dispatch(setErrorMessage())
        setSelectedCurrency(currency)
    }

    function moreCurrencyBtnHandler() {
        setShowAllCurrency(!showAllCurrency)
    }

    function pickerCurrencyHandler(cur) {
        dispatch(setErrorMessage())
        const { limMax, limMin } = moneyRequestLimits
        if (sum > limMax || sum < limMin) {
            setIsSumOk(false)
        }
        dispatch(setErrorMessage(tr('сумма платежа не должна выходить за пределы лимитов.')))
        setPickerCurrency(cur)
        for (let i = 0; i < availableCurrencies.length; i++) {
            const el = availableCurrencies[i];
            if (el.type == cur) {
                return setMoneyRequestLimits({
                    limMax: el.limMax,
                    limMin: el.limMin
                })
            }
        }
    }

    function sumHandler(val) {
        dispatch(setErrorMessage())
        const reg = /[^\d\.]/
        if (val.search(reg) === -1) {
            setSum(val)
            const { limMax, limMin } = moneyRequestLimits
            if (val > limMax || val < limMin) {
                setIsSumOk(false)
                dispatch(setErrorMessage(tr('сумма платежа не должна выходить за пределы лимитов.')))
            } else {
                setIsSumOk(true)
                dispatch(setErrorMessage())
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
        return `${multiplier} ${getCurrencySymbol(pickerCurrency)} = ${eq} ${getCurrencySymbol(selectedCurrency.type)}`
    }

    const showWriteOffAmmount = () => {
        let ammount = countCut(sum * rate)
        if (ammount < .1) {
            ammount = .1
        }
        return `${ammount} ${getCurrencySymbol(selectedCurrency.type)}`
    }

    function getRate() {
        if (selectedCurrency !== null && pickerCurrency !== null) {
            dispatch(fetchExchangeRate({ cur: pickerCurrency, goal: selectedCurrency.type }))
        }
    }

    function sendMoneyBtnHandler() {
        if (!isPhoneOk) {
            d
            dispatch(setErrorMessage(tr('некорректный номер')))
        } else if (selectedCurrency.count < sum * rate) {
            dispatch(setErrorMessage(tr('недостаточно средств на счету')))
        } else {
            dispatch(setErrorMessage())
            sendMoney()
        }
    }

    function sendMoney() {
        const request = {
            phoneNumber: Number(phoneNumber.slice(1)),
            sender: selectedCurrency.type,
            receiver: pickerCurrency,
            sum: Number(sum),
            rate,
            comment
        }
        dispatch(sendMoneyRequest(request)
        )
    }

    return (
        <View style={styles.container}>

            <Header headerText='Первести на Wallet' />

            {errormessage
                ? < View style={styles.errorView}>
                    <Txt style={styles.errorText}>{errormessage}</Txt>
                </View>
                : null
            }


            <ScrollView>

                <View style={styles.form}>
                    <Txt style={styles.formItemLabel}>Адресат</Txt>
                    <TextInput
                        style={styles.TextInput}
                        keyboardType='decimal-pad'
                        value={phoneNumber}
                        onChangeText={val => phoneNumHandler(val)}
                    ></TextInput>
                    {commentView

                        ? <TextInput
                            style={styles.TextInput}
                            value={comment}
                            onChangeText={setComment}
                            maxLength={100}
                            multiline
                            placeholder={tr('комментарий')}
                        ></TextInput>

                        : <TouchableOpacity
                            style={styles.commentOpacity}
                            onPress={() => setCommentView(true)}
                        >
                            {/* TODO: добавить  <Icon> */}
                            <Txt>комментарий</Txt>
                        </TouchableOpacity>
                    }
                </View>

                <View style={styles.form}>
                    <View style={[styles.blockView, { borderStyle: 'solid' }]}>
                        <Txt style={styles.labelTxt}>способы оплаты</Txt>
                        {currencyArray.map((currency, index) => {
                            if (index < shownCurrencyLimit || showAllCurrency) {
                                return <TouchableOpacity style={styles.currencyView} key={index}
                                    onPress={() => selectCurrencyBtnHandler(currency)}
                                >
                                    <Image
                                        source={LogoAssets['Wallet']}
                                        style={styles.currencyLogoPic}
                                    />
                                    <Txt style={styles.currencyTxt}>{countCut(currency.count)} {currency.type}</Txt>
                                    {currency.type == selectedCurrency.type
                                        ? <Entypo name='chevron-left' style={styles.moreCurrencyIcon} /> : null
                                    }
                                </TouchableOpacity>
                            }
                        })}
                    </View>
                    {currencyArray.length > shownCurrencyLimit && !showAllCurrency
                        ? <TouchableOpacity style={styles.moreCurrencyBtn}
                            onPress={moreCurrencyBtnHandler}
                        >
                            <Entypo name='dots-three-horizontal' style={styles.moreCurrencyIcon} />
                            <Txt style={styles.currencyTxt}>Другие способы оплаты</Txt>
                        </TouchableOpacity>
                        : null
                    }
                </View>

                <View style={styles.form}>
                    <Txt style={styles.hint}>Валюта счета</Txt>
                    <Picker
                        selectedValue={pickerCurrency}
                        onValueChange={pickerCurrencyHandler}
                    >
                        {
                            availableCurrencies.map((cur, index) => {
                                if (cur.requestAllowed)
                                    return (
                                        <Picker.Item
                                            key={index}
                                            label={cur.type}
                                            value={cur.type}
                                        />
                                    )
                            })
                        }
                    </Picker>
                    <TextInput
                        style={styles.TextInput}
                        value={sum}
                        onChangeText={val => sumHandler(val)}
                        keyboardType='decimal-pad'
                        placeholder={tr('сумма')}>
                    </TextInput>
                    {moneyRequestLimits
                        ? <Txt>{tr('от')} {moneyRequestLimits.limMin} {tr('до')} {moneyRequestLimits.limMax}</Txt>
                        : null
                    }
                    {sum != ''
                        ? <View style={styles.commissionBlock}>
                            <View style={styles.commissionBox}>
                                <Txt style={styles.commissionTxt}>комиссия Wallet:</Txt>
                                <Txt style={styles.commissionTxt}>0 {getCurrencySymbol(pickerCurrency)}</Txt>
                            </View>
                            {selectedCurrency.type == pickerCurrency
                                ? null
                                : <View style={styles.commissionBox}>
                                    <Txt style={styles.commissionTxt}>Курс конвертации:</Txt>
                                    <Txt style={styles.commissionTxt}>{showConversionRate()}</Txt>
                                </View>
                            }
                            <View style={[styles.commissionBox, {
                                borderTopColor: '#888',
                                borderTopWidth: 1
                            }]}>
                                <Txt style={styles.ammountTxt}>Итог к оплате:</Txt>
                                <Txt style={styles.ammountTxt}>{showWriteOffAmmount()}</Txt>
                            </View>
                        </View>
                        : null
                    }
                </View>

                <TouchableOpacity
                    style={styles.btn}
                    onPress={sendMoneyBtnHandler}
                >
                    <Txt style={styles.btnTxt}>Перевести</Txt>
                </TouchableOpacity>

            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    errorView: {
        paddingHorizontal: 10,
        paddingVertical: 2
    },
    errorText: {
        color: '#ff0000',
        fontSize: 13
    },

    form: {
        backgroundColor: '#fff',
        marginHorizontal: 7,
        marginTop: 7,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    formItemLabel: {
        fontSize: 12,
        color: '#888'
    },
    TextInput: {
        marginBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'gray'
    },
    commentOpacity: {
        paddingVertical: 10,
        paddingHorizontal: 5
    },

    blockView: {
        borderBottomColor: '#ddd',
        borderBottomWidth: 1.5,
        borderStyle: 'dotted',
        paddingVertical: 10,
        marginBottom: 10
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

    commissionBlock: {},
    commissionBox: {
        paddingVertical: 5,
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

    btn: {
        backgroundColor: '#00abfd',
        marginTop: 30,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 3,
        alignItems: 'center',
        alignSelf: 'center',
    },
    btnTxt: {
        color: '#fff',
        fontSize: 17,
    }
})