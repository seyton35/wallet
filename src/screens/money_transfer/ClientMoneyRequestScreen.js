import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { useDispatch, useSelector } from 'react-redux'

import { SocketContext } from '../../Main'
import { clientMoneyRequest, resetMessage, setErrorMessage } from '../../store/slices/currencyReducer'

import Header from '../../components/Header'

export default function ClientMoneyRequestScreen() {
  const [commentView, setCommentView] = useState(false)
  const [commentText, setCommentText] = useState()
  const [pickerCurrency, setPickerCurrency] = useState()
  const [phoneNumber, setPhoneNumber] = useState('+')
  const [sum, setSum] = useState()
  const [moneyRequestLimits, setMoneyRequestLimits] = useState()

  const [isPhoneOk, setIsPhoneOk] = useState(false)
  const [isSumOk, setIsSumOk] = useState(false)

  const currencyArray = useSelector(s => s.currency.awalableCurrency)
  const { errorMessage } = useSelector(s => s.currency)

  const sender = useSelector(s => s.state.userData.phoneNumber)
  const socket = useContext(SocketContext)

  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(resetMessage())
    setMoneyRequestLimits({
      limMax: currencyArray[0]?.limMax,
      limMin: currencyArray[0]?.limMin
    })

  }, [])

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
    for (let i = 0; i < currencyArray.length; i++) {
      const el = currencyArray[i];
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
        dispatch(setErrorMessage('?????????? ?????????????? ???? ???????????? ???????????????? ???? ?????????????? ??????????????.'))
      } else {
        setIsSumOk(true)
        dispatch(setErrorMessage())
      }
    }
  }

  function MoneyRequestoBtnHandler() {
    if (isPhoneOk && isSumOk) {
      Alert.alert(
        "?????????????????? ????????",
        '???? ?????????????????????????? ???????????? ?????????????????? ?????????',
        [
          {
            text: '????????????',
            onPress: () => null
          },
          {
            text: '??????????????????',
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
      socket
    }))
  }

  return (
    <View style={styles.container}>
      <Header headerText='?????????????????? ????????' />

      {errorMessage
        ? < View style={styles.errorView}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
        : null
      }

      <ScrollView>
        <View style={styles.form}>
          <Text style={styles.hint}>??????????????</Text>
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
              placeholder='??????????????????????'
            ></TextInput>

            : <TouchableOpacity
              style={styles.commentOpacity}
              onPress={() => setCommentView(true)}
            >
              {/* TODO: ????????????????  <Icon> */}
              <Text>??????????????????????</Text>
            </TouchableOpacity>
          }
        </View>
        <View style={styles.form}>
          <Text style={styles.hint}>???????????? ??????????</Text>
          <Picker
            selectedValue={pickerCurrency}
            onValueChange={pickerCurrencyHandler}
          >
            {
              currencyArray.map((cur, index) => {
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
            placeholder='??????????'>
          </TextInput>
          {moneyRequestLimits
            ? <Text>???? {moneyRequestLimits.limMin} ???? {moneyRequestLimits.limMax}</Text>
            : null
          }
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={MoneyRequestoBtnHandler}
        >
          <Text style={styles.btnTxt}>??????????????????</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
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