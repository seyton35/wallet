import { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { backButtonPress } from '../store/slices/stateReducer'


export default function Header({ headerText }) {
  const currentScreen = useSelector(s => s.state.currentScreen)
  const [showHeader, setShowHeader] = useState(false)
  const [showHeaderButton, setShowHeaderButton] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    if (
      currentScreen == 'login' ||
      currentScreen == 'register' ||
      currentScreen == 'home'
    ) setShowHeaderButton(false)
    else setShowHeaderButton(true)

    if (currentScreen == 'greeting') setShowHeader(false)
    else setShowHeader(true)


  }, [currentScreen])

  function navigate() {
    dispatch(backButtonPress())
  }


  return (
    <>
      {showHeader
        ?
        < View style={styles.header} >
          {showHeaderButton
            ?
            <TouchableOpacity style={styles.headerButton}
              onPress={navigate}
            >
              <Text style={styles.headerButtonIcon}>{'<'}</Text>
            </TouchableOpacity>
            : null
          }
          <Text style={styles.headerText}>{headerText}</Text>
        </View >
        : null
      }
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row'
  },
  headerButton: {
    backgroundColor: '#c0c0c0',
    borderRadius: 14,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  headerButtonIcon: {
    fontSize: 25,
    color: '#000',
    fontWeight: 'bold'
  },
  headerText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 25,
    marginLeft: 10,
  }
})