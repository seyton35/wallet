import { Alert, BackHandler, StyleSheet, ToastAndroid, View } from 'react-native'
import { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging'
import PushNotification from 'react-native-push-notification'
import { useDispatch, useSelector } from 'react-redux'

import Stack from './navigation/Stack'

import {
  backButtonPress,
  navigate,
  initialization,
  setToastAndroidMessage,
  saveNotificationToken,
  popToTop,
  executeCommand
} from './store/slices/stateReducer'
import { translate } from './middleWare/translator/translator'

export default function Main() {
  const stateToastMessage = useSelector(s => s.state.toastAndroidMessage)
  const currentScreen = useSelector(s => s.state.currentScreen)
  const { idUser } = useSelector(s => s.state.userData)
  const { language } = useSelector(s => s.state)

  const dispatch = useDispatch()

  function tr(text, slice = false) {
    translate(text, language, slice)
  }

  async function init() {
    dispatch(initialization())
  }

  const navigationMessageHandler = notification => {
    const data = JSON.parse(notification?.data?.data)
    const { screen } = notification.data
    console.log(screen, data);
    dispatch(navigate({ screen, data }))
  }

  const messageHandler = notification => {
    console.log('just notification');
  }

  function messagingChanel() {
    PushNotification.configure({
      onRegister: token => {
        console.log("TOKEN:", token);
      },

      onNotification: notification => {
        const navigation = notification?.data?.navigation
        if (navigation) {
          navigationMessageHandler(notification)
        } else {
          messageHandler(notification)
        }
      },
    })
    PushNotification.createChannel({
      channelId: 'chanel_1',
      channelName: 'chanel 1',
      playSound: true,
      soundName: 'coins',
    })

    messaging().onMessage(getMessage)
    messaging().setBackgroundMessageHandler(getMessage)
  }

  const getMessage = async (message) => {
    const { title, body } = message.notification
    const { data } = message
    const { command, commandMessage } = data
    if (title && body) {
      PushNotification.localNotification({
        channelId: 'chanel_1',
        title: tr(title, true),
        message: tr(body, true),
        playSound: true,
        soundName: 'coins',
        userInfo: data
      })
    }
    if (command) {
      dispatch(executeCommand({ command, message: commandMessage }))
    }
  }

  const getToken = async () => {
    const token = await messaging().getToken()
    dispatch(saveNotificationToken({ token, idUser }))
  }

  useEffect(() => {
    init()
    messagingChanel()
  }, [])

  useEffect(() => {
    if (idUser) {
      getToken()
    }
  }, [idUser])

  useEffect(() => {
    const backAction = () => {
      if (['register', 'login', 'home',]
        .includes(currentScreen)) {
        Alert.alert("выход", "покинуть приложение?", [
          {
            text: "нет",
            onPress: () => null,
            style: "cancel"
          },
          { text: "да", onPress: () => BackHandler.exitApp() }
        ]);
      } else if (['allServices', 'history', 'cards', 'profile']
        .includes(currentScreen)) {
        dispatch(popToTop('home'))
      } else dispatch(backButtonPress())
      return true;
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )
    return () => backHandler.remove()
  }, [currentScreen])

  useEffect(() => {
    if (stateToastMessage) {
      ToastAndroid.show(stateToastMessage, 0)
      dispatch(setToastAndroidMessage(null))
    }
  }, [stateToastMessage])

  return (
    <View style={styles.container}>
      <Stack></Stack>
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