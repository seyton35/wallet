import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
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

            <View style={styles.phoneNumberView}>
                <Text style={styles.phoneNumberTitleTxt}>номер кошелька</Text>
                <Text style={styles.phoneNumberTxt}>+{phoneNumber}</Text>
            </View>

            <TouchableOpacity style={styles.signOutBtn}
                onPress={signOutBtnHandler}
            >
                <Text style={styles.signOutBtnTxt}>выйти из приложения</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        padding: 5,
        width: 200,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 20,
        backgroundColor: '#b1b1b1'
    },
    signOutBtnTxt: {
        fontSize: 17
    }
})