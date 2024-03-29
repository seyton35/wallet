import { useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux'
// import { flag40x40Assets } from '../../../assets/flag40x40Assets'

import BottomTabsPanel from '../../components/BottomTabsPanel'
import ListArrowButton from '../../components/ListArrowButton'
import ModalButtonList from '../../components/ModalButtonList'
import Txt from '../../components/Txt'

import { phoneNumberMask1 } from '../../middleWare/phoneNumberFormater'
import { translate } from '../../middleWare/translator/translator'
import { logOutUser, popToTop, postLanguage } from '../../store/slices/stateReducer'

export default function ProfileScreen() {
    const [showSelectLanguage, setShowSelectLanguage] = useState(false)

    const { phoneNumber } = useSelector(s => s.state.userData)
    const { language, availableLanguages } = useSelector(s => s.state)

    const dispatch = useDispatch()

    function tr(text) {
        return translate(text, language)
    }

    function signOutBtnHandler() {
        Alert.alert(
            tr("выйти из кошелька"),
            tr("в следующий раз вам придется ввести номер кошелька и пароль"),
            [
                {
                    text: tr('отмена'),
                    onPress: null
                },
                {
                    text: tr('выйти'),
                    onPress: () => {
                        dispatch(logOutUser())
                        dispatch(popToTop('login'))
                    }
                }
            ]
        )
    }

    function selectLanguageHandler() {
        setShowSelectLanguage(true)
    }

    function selectLanguage(language) {
        dispatch(postLanguage(language))
        setShowSelectLanguage(false)
    }

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.choiceLangBtn}
                onPress={selectLanguageHandler}
            >
                <AntDesign name='earth' style={styles.choiceLangIcon} />
            </TouchableOpacity>

            <ModalButtonList
                visible={showSelectLanguage}
                onPress={(res) => selectLanguage(res)}
                onClose={() => setShowSelectLanguage(false)}
                data={availableLanguages} >
                {/* <Image source={flag40x40Assets.UAH} style={{ width: 40, height: 40, marginRight:10}} /> */}
            </ModalButtonList>

            <ScrollView>
                <View style={styles.phoneNumberView}>
                    <Txt style={styles.phoneNumberTitleTxt}>номер Wallet кошелька</Txt>
                    <Txt style={styles.phoneNumberTxt}>{phoneNumberMask1(phoneNumber)}</Txt>
                </View>

                <ListArrowButton screen='settings' title='Настройки' />
                <ListArrowButton screen='help' title='Помощь' />

                <TouchableOpacity style={styles.signOutBtn}
                    onPress={signOutBtnHandler}
                >
                    <Txt style={styles.signOutBtnTxt}>выйти из приложения</Txt>
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
        right: 10,
        zIndex: 100
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