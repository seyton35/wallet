import { StyleSheet, Text, TouchableOpacity, } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { useDispatch } from 'react-redux';

import { popToTop } from '../store/slices/stateReducer';

export default function BottomTab(prop) {
    const { tabName } = prop

    function buttonTextFormater(key) {
        switch (key) {
            case 'home': return 'главная'
            case 'services': return 'услуги'
            case 'history': return 'история'
            case 'cards': return 'карты'
            case 'profile': return 'профиль'
        }
    }

    function buttonIconFormater(key) {
        switch (key) {
            case 'home': return <Entypo name='wallet' style={styles.tabIcon} />
            case 'services': return <MaterialCommunityIcons name='bank-transfer' style={styles.tabIcon} />
            case 'history': return <MaterialCommunityIcons name='clock' style={styles.tabIcon} />
            case 'cards': return <MaterialCommunityIcons name='credit-card' style={styles.tabIcon} />
            case 'profile': return <Ionicons name='person-circle' style={styles.tabIcon} />
        }
    }

    const dispatch = useDispatch()

    function tabBtnHandler() {
        dispatch(popToTop(tabName))
    }

    return (
        <TouchableOpacity style={styles.container}
            onPress={tabBtnHandler}
        >
            {buttonIconFormater(tabName)}
            <Text style={styles.tabBtnTxt}>{buttonTextFormater(tabName)}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '20%',
        height: 50,
        borderColor: 'gray',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderLeftWidth: 1,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    tabBtnTxt: {
    },
    tabIcon: {
        color: 'black',
        fontSize: 20
    }
})