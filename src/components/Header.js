import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

import { useDispatch } from 'react-redux'

import { backButtonPress } from '../store/slices/stateReducer'


export default function Header({ headerText ='Wallet', showHeaderButton = true }) {

  const dispatch = useDispatch()

  function navigate() {
    dispatch(backButtonPress())
  }


  return (

    < View style={styles.header} >
      {showHeaderButton
        ?
        <TouchableOpacity style={styles.headerButton}
          onPress={navigate}
        >
          <Icon name="arrowleft" style={styles.headerButtonIcon}/>
        </TouchableOpacity>
        : null
      }
      <Text style={styles.headerText}>{headerText}</Text>
    </View >

  )
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    width:'100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row'
  },
  headerButton: {
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