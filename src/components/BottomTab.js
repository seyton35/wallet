import { StyleSheet, TouchableOpacity, } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux';

import Txt from './Txt';

import { popToTop } from '../store/slices/stateReducer';

export default function BottomTab({ tabName }) {
    const { currentScreen } = useSelector(s => s.state)

    function isActiveText() {
        if (currentScreen == tabName) {
            return { color: '#000' }
        }
    }

    function isActiveIcon() {
        if (currentScreen == tabName) {
            return { color: '#00abfd' }
        }
    }

    function buttonTextFormater(key) {
        switch (key) {
            case 'home': return 'главная'
            case 'allServices': return 'услуги'
            case 'history': return 'история'
            case 'cards': return 'карты'
            case 'profile': return 'профиль'
        }
    }

    function buttonIconFormater(key) {
        switch (key) {
            case 'home': return <Entypo name='wallet' style={[styles.tabIcon, isActiveIcon()]} />
            case 'allServices': return <MaterialCommunityIcons name='bank-transfer' style={[styles.tabIcon, isActiveIcon()]} />
            case 'history': return <MaterialCommunityIcons name='clock' style={[styles.tabIcon, isActiveIcon()]} />
            case 'cards': return <MaterialCommunityIcons name='credit-card' style={[styles.tabIcon, isActiveIcon()]} />
            case 'profile': return <Ionicons name='person-circle' style={[styles.tabIcon, isActiveIcon()]} />
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
            <Txt style={[styles.tabBtnTxt, isActiveText()]}>{buttonTextFormater(tabName)}</Txt>
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
        color: '#555',
        fontSize: 14
    },
    tabIcon: {
        color: '#555',
        fontSize: 20
    }
})