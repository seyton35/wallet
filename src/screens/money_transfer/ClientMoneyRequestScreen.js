import { Alert, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../../components/Header'
import Txt from '../../components/Txt'

import { clientMoneyRequest, resetMessage, setErrorMessage } from '../../store/slices/currencyReducer'
import { translate } from '../../middleWare/translator/translator'

export default function ClientMoneyRequestScreen() {
  const [commentView, setCommentView] = useState(false)
  const [commentText, setCommentText] = useState()
  const { defaultCurrencyAccount } = useSelector(s => s.currency)
  const [pickerCurrency, setPickerCurrency] = useState(defaultCurrencyAccount)
  const [phoneNumber, setPhoneNumber] = useState('+')
  const [sum, setSum] = useState()
  const [moneyRequestLimits, setMoneyRequestLimits] = useState()

  const [isPhoneOk, setIsPhoneOk] = useState(false)
  const [isSumOk, setIsSumOk] = useState(false)

  const { availableCurrencies } = useSelector(s => s.currency)
  const { errormessage } = useSelector(s => s.currency)

  const { language } = useSelector(s => s.state)
  const sender = useSelector(s => s.state.userData.phoneNumber)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetMessage())
    setMoneyRequestLimits({
      limMax: availableCurrencies[0]?.limMax,
      limMin: availableCurrencies[0]?.limMin
    })

  }, [])

  function tr(text) {
    return translate(text, language)
  }

  function phoneNumHandler(num) {
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

  function pickerCurrencyHandler(cur) {
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

  function MoneyRequestoBtnHandler() {
    if (isPhoneOk && isSumOk) {
      Alert.alert(
        tr("выставить счет"),
        tr('вы действительно хотите выставить счет?'),
        [
          {
            text: tr('отмена'),
            onPress: () => null
          },
          {
            text: tr('выставить'),
            onPress: () => makeRequest()
          },
        ]
      )
    }
  }

  async function makeRequest() {
    dispatch(clientMoneyRequest({
      receiver: phoneNumber,
      sender,
      currency: pickerCurrency,
      sum,
      comment: commentText,
    }))
  }

  return (
    <View style={styles.container}>
      <Header headerText='Выставить счет' />

      {errormessage
        ? < View style={styles.errorView}>
          <Txt style={styles.errorText}>{errormessage}</Txt>
        </View>
        : null
      }

      <ScrollView>
        <View style={styles.form}>
          <Txt style={styles.hint}>Адресат</Txt>
          <TextInput
            style={styles.TextInput}
            keyboardType='decimal-pad'
            value={phoneNumber}
            onChangeText={val => phoneNumHandler(val)}
          ></TextInput>
          {commentView

            ? <TextInput
              style={styles.TextInput}
              value={commentText}
              onChangeText={setCommentText}
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
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={MoneyRequestoBtnHandler}
        >
          <Txt style={styles.btnTxt}>Выставить</Txt>
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
  hint: {
    fontSize: 12
  },
  TextInput: {
    borderBottomWidth: 2,
    borderBottomColor: 'gray'
  },
  commentOpacity: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  btn: {
    backgroundColor: '#00abfd',
    marginTop: 150,
    width: 200,
    padding: 10,
    borderRadius: 3,
    alignItems: 'center',
    alignSelf: 'center',
  },
  btnTxt: {
    color: '#fff',
    fontSize: 17,
  }
})