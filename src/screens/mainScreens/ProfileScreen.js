import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux'
import BottomTabsPanel from '../../components/BottomTabsPanel'
import ListArrowButton from '../../components/ListArrowButton'
import { phoneNumberMask1 } from '../../middleWare/phoneNumberFormater'
import { logOutUser, popToTop, postLanguage } from '../../store/slices/stateReducer'

export default function ProfileScreen() {

    const { phoneNumber } = useSelector(s => s.state.userData)
    const { language } = useSelector(s => s.state)

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

            <TouchableOpacity style={styles.choiceLangBtn}
                onPress={() => {
                    if (language == 'ru') {
                        dispatch(postLanguage('en'))
                    } else {
                        dispatch(postLanguage('ru'))
                    }
                }}
            >
                <AntDesign name='earth' style={styles.choiceLangIcon} />
            </TouchableOpacity>

            <ScrollView>
                <View style={styles.phoneNumberView}>
                    <Text style={styles.phoneNumberTitleTxt}>номер Wallet кошелька</Text>
                    <Text style={styles.phoneNumberTxt}>{phoneNumberMask1(phoneNumber)}</Text>
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
    choiceLangBtn: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    choiceLangIcon: {
        fontSize: 25,
        color: '#00abfd'
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