import { ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { useDispatch, useSelector } from 'react-redux'
import Dialog from 'react-native-dialog'

import { clientMoneyRequest, fetchAwalableCurrency, resetValueAfterRequest } from '../../store/slices/currencyReducer'
import { SocketContext } from '../../Main'

export default function ClientMoneyRequestScreen({ navigation }) {
  const [commentView, setCommentView] = useState(false)
  const [commentText, setCommentText] = useState()
  const [pickerCurrency, setPickerCurrency] = useState()
  const [phoneNumber, setPhoneNumber] = useState('+')
  const [sum, setSum] = useState()
  const [MoneyRequestLimits, setMoneyRequestLimits] = useState()
  const [error, setError] = useState()

  const [isPhoneOk, setIsPhoneOk] = useState(false)
  const [isSumOk, setIsSumOk] = useState(false)
  const [dialogVisible, setDialogVisible] = useState(false)

  const currencyArray = useSelector(s => s.currency.awalableCurrency)
  const toastMessage = useSelector(s => s.currency.toastMessage)
  const requestStatus = useSelector(s => s.currency.requestStatus)
  const serverErrorMessage = useSelector(s => s.currency.serverErrorMessage)

  const sender = useSelector(s => s.state.userData.phoneNumber)
  const socket = useContext(SocketContext)

  const dispatch = useDispatch()

  useEffect(() => {
    if (requestStatus == 'success') {
      goToHomeScreen()
    }
  }, [requestStatus])

  useEffect(() => {
    dispatch(fetchAwalableCurrency())
  }, [true])

  function goToHomeScreen() {
    navigation.navigate('home')
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
      const { limMax, limMin } = MoneyRequestLimits
      if (val > limMax || val < limMin) {
        setIsSumOk(false)
        setError('сумма платежа не должна выходить за пределы лимитов.')
      } else {
        setIsSumOk(true)
        setError()
      }
    }
  }

  function MoneyRequestoBtnHandler() {
    if (isPhoneOk && isSumOk) {
      setDialogVisible(true)
    }
  }

  function cancelDialog() {
    setDialogVisible(false)
  }

  async function acceptDialog() {
    setDialogVisible(false)
    dispatch(clientMoneyRequest({
      receiver: phoneNumber,
      sender,
      currency: pickerCurrency,
      sum,
      comment: commentText,
      socket
    }))
  }

  function errorShow() {
    if (serverErrorMessage) {
      return (
        < View style={styles.errorView}>
          <Text style={styles.errorText}>{serverErrorMessage}</Text>
        </View>
      )
    } else if (error) {

      return (
        < View style={styles.errorView}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )
    }
  }

  return (
    <View style={styles.container}>

      <Dialog.Container
        visible={dialogVisible}
        onBackdropPress={cancelDialog}
      >
        <Dialog.Description>
          вы действительно хотите выставить счет?
        </Dialog.Description>
        <Dialog.Button label="нет" onPress={cancelDialog} />
        <Dialog.Button label="да" onPress={acceptDialog} />
      </Dialog.Container>

      {errorShow()}

      <ScrollView>
        <View style={styles.form}>
          <Text style={styles.hint}>Адресат</Text>
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
              placeholder='комментарий'
            ></TextInput>

            : <TouchableOpacity
              style={styles.commentOpacity}
              onPress={() => setCommentView(true)}
            >
              {/* TODO: добавить  <Icon> */}
              <Text>комментарий</Text>
            </TouchableOpacity>
          }
        </View>
        <View style={styles.form}>
          <Text style={styles.hint}>Валюта счета</Text>
          <Picker
            selectedValue={pickerCurrency}
            onValueChange={val => pickerCurrencyHandler(val)}
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
            placeholder='сумма'>
          </TextInput>
          {MoneyRequestLimits
            ? <Text>от {MoneyRequestLimits.limMin} до {MoneyRequestLimits.limMax}</Text>
            : null
          }
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={MoneyRequestoBtnHandler}
        >
          <Text style={styles.btnTxt}>выставить</Text>
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