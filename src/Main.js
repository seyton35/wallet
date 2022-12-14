import { Alert, BackHandler, Button, StyleSheet, ToastAndroid, View } from 'react-native'
import { createContext, useEffect, useMemo, useRef } from 'react'

import { io } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'


import Stack from './navigation/Stack'


import { backButtonPress, initialization } from './store/slices/stateReducer'
import { SocketReducer } from './middleWare/socket_routes'

export const SocketContext = createContext()

export default function Main() {
  const stateToastMessage = useSelector(s => s.state.toastAndroidMessage)
  const currencyToastMessage = useSelector(s => s.currency.toastAndroidMessage)
  const isLogined = useSelector(s => s.state.isLogined)
  const currentScreen = useSelector(s => s.state.currentScreen)

  const socket = useRef(null)

  const dispatch = useDispatch()

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )
    return () => backHandler.remove()
  }, [])

  useEffect(() => {
    if (stateToastMessage) ToastAndroid.show(stateToastMessage, 0)
  }, [stateToastMessage])

  useEffect(() => {
    if (currencyToastMessage) ToastAndroid.show(currencyToastMessage, 0)
  }, [currencyToastMessage])

  function backAction() {
    console.log(['home','register','login'].includes(currentScreen));
    console.log(currentScreen);
    if(['home','register','login'].includes(currentScreen)){
      Alert.alert("выход", "покинуть приложение?", [
        {
          text: "нет",
          onPress: () => null,
          style: "cancel"
        },
        { text: "да", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    }else dispatch(backButtonPress())
  }

  async function init() {
    const data = await dispatch(initialization())
    if (socket.current) {
      socket.current.on('/', (data, cb) => {
        const sock = socket.current
        SocketReducer(sock, data, cb, dispatch)
      })
      socket.current.emit('/', {
        way: 'SUBSCRIBE_BY_ID',
        id: data.payload
      }
      )
    }
  }

  useMemo(async () => {
    socket.current = await io('http://192.168.31.254:8000', { transports: ['websocket'] })
    init()
  }, [true])


  return (
    <View style={styles.container}>
      <Button title='screen' onPress={()=>console.log(currentScreen)}></Button>
      <SocketContext.Provider
        value={socket.current}>
        <Stack></Stack>
      </SocketContext.Provider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%'
  }
})