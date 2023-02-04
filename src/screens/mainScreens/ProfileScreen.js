import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import BottomTabsPanel from '../../components/BottomTabsPanel'
import ListArrowButton from '../../components/ListArrowButton'
import { logOutUser, popToTop } from '../../store/slices/stateReducer'

export default function ProfileScreen() {

    const { phoneNumber } = useSelector(s => s.state.userData)

    const dispatch = useDispatch()

    function signOutBtnHandler() {
        Alert.alert(
            "выйти из кошелька",
            "в следующий раз вам придется ввести номер кошелька и пароль",
            [
                {
                    text: 'отмена',
                    onPress: null
                },
                {
                    text: 'выйти',
                    onPress: () => {
                        dispatch(logOutUser())
                        dispatch(popToTop('login'))
                    }
                }
            ]
        )
    }

    return (
        <View style={styles.container}>

            <ScrollView>
                <View style={styles.phoneNumberView}>
                    <Text style={styles.phoneNumberTitleTxt}>номер Wallet кошелька</Text>
                    <Text style={styles.phoneNumberTxt}>+{phoneNumber}</Text>
                    {/* TODO: сделать маску для номера */}
                </View>

                <ListArrowButton screen='settings' title='Настройки' />
                <ListArrowButton screen='help' title='Помощь' />

                <TouchableOpacity style={styles.signOutBtn}
                    onPress={signOutBtnHandler}
                >
                    <Text style={styles.signOutBtnTxt}>выйти из приложения</Text>
                </TouchableOpacity>
            </ScrollView>

            <BottomTabsPanel />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    phoneNumberView: {
        alignItems: 'center',
        padding: 10,
    },
    phoneNumberTitleTxt: {
        color: '#000',
    },
    phoneNumberTxt: {
        color: '#000',
        fontSize: 25,
        fontWeight: 'bold'
    },
    signOutBtn: {
        marginTop: 20,
        padding: 5,
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: '#b1b1b1'
    },
    signOutBtnTxt: {
        fontSize: 17
    }
})