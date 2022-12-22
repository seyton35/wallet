import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux';
import { popToTop } from '../store/slices/stateReducer';

export default function BottomTab(prop) {
    const { tabName } = prop

    function buttonFormater(key) {
        switch (key) {
            case 'home': return 'главная'
            case 'services': return 'услуги'
            case 'history': return 'история'
            case 'cards': return 'карты'
            case 'profile': return 'профиль'
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
            <Text style={styles.tabBtnTxt}>{buttonFormater(tabName)}</Text>
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
        backgroundColor:'#fff'
    },
    tabBtnTxt:{
    }
})