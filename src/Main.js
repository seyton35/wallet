import { StyleSheet, ToastAndroid, View } from 'react-native'
import { createContext, useEffect, useMemo, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'

import Stack from './navigation/Stack'
import Greeting from './screens/noStack/Greeting'

import { initialization } from './store/slices/stateReducer'
import { SocketReducer } from './middleWare/socket_routes'
import LoginScreen from './screens/sign/LoginScreen'

export const SocketContext = createContext()

export default function Main() {
  const stateToastMessage = useSelector(s => s.state.toastAndroidMessage)
  const currencyToastMessage = useSelector(s => s.currency.toastAndroidMessage)
  const isLogined = useSelector(s => s.state.isLogined)

  const [initialized, setInitialized] = useState(false)
  const socket = useRef(null)

  const dispatch = useDispatch()

  useEffect(() => {
    if (stateToastMessage) ToastAndroid.show(stateToastMessage, 0)
  }, [stateToastMessage])

  useEffect(() => {
    if (currencyToastMessage) ToastAndroid.show(currencyToastMessage, 0)
  }, [currencyToastMessage])


  async function init() {
    const data = await dispatch(initialization())
    setInitialized(true)
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

  function selectScreen() {
    return <LoginScreen></LoginScreen>
    return <Greeting></Greeting>
    if (!initialized) return <Greeting></Greeting>
    else if (initialized) {
      if (isLogined) return <Stack></Stack>
      else return <LoginScreen></LoginScreen>
    }
  }

  return (
    <View style={styles.container}>
      <SocketContext.Provider
        value={socket.current}>
        {selectScreen()}
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