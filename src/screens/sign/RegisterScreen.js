import { useState } from 'react'
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../../components/Header'
import Txt from '../../components/Txt'
import ModalButtonList from '../../components/ModalButtonList'

import { popToTop, registerNewUser, setErrorMessage, setLanguage } from '../../store/slices/stateReducer'

export default function RegisterScreen() {
    const [showSelectLanguage, setShowSelectLanguage] = useState(false)

    const [phoneNumber, setPhoneNumber] = useState('+')
    const [password, setPassword] = useState()
    const [repeatPassword, setRepeatPassword] = useState()

    const [isPhoneOk, setIsPhoneOk] = useState(false)
    const [isPasswordOk, setIsPasswordOk] = useState(false)

    const { language, availableLanguages, errorMessage } = useSelector(s => s.state)

    const dispatch = useDispatch()

    function phoneNumHandler(val) {
        let num = val.split('')
        num.shift()
        num = num.join('')

        reg = /\D/
        if (num.search(reg) === -1) {
            setPhoneNumber('+' + num)
            if (num.length === 11) {
                setIsPhoneOk(true)
                dispatch(setErrorMessage())
            } else {
                setIsPhoneOk(false)
                if (num.length > 11) {
                    dispatch(setErrorMessage('слишком длинный номер'))
                } else dispatch(setErrorMessage())
            }
        }
    }

    function passwordHandler(val) {
        setPassword(val)
        if (val.length >= 6) {
            setIsPasswordOk(true)
        } else setIsPasswordOk(false)
    }

    function repeatPasswordHandler(val) {
        setRepeatPassword(val)
        if (val !== password) {
            dispatch(setErrorMessage('повторный пароль не совпадает'))
        } else {
            dispatch(setErrorMessage())
        }
    }

    function checkRepeatPassword() {
        if (repeatPassword === password) {
            dispatch(setErrorMessage())
            return true
        } else {
            dispatch(setErrorMessage('повторный пароль не совпадает'))
            return false
        }
    }

    async function enterBtnHandler() {
        const check = checkRepeatPassword()
        if (isPhoneOk && isPasswordOk && check) {
            dispatch(registerNewUser({
                phoneNumber, password
            }))
        } else dispatch(setErrorMessage('некорректный логин или пароль'))
    }

    function changeAuth() {
        dispatch(setErrorMessage())
        dispatch(popToTop('login'))
    }

    function genRandomNumber() {
        let num = '+79'
        num += Math.random() * 1000000000000000
        num = num.slice(0, 12)
        setPhoneNumber(num)
        setIsPhoneOk(true)
    }

    function selectLanguage(language) {
        dispatch(setLanguage(language))
        setShowSelectLanguage(false)
    }

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.choiceLangBtn}
                onPress={() => setShowSelectLanguage(true)}
            >
                <AntDesign name='earth' style={styles.choiceLangIcon} />
            </TouchableOpacity>

            <ModalButtonList
                visible={showSelectLanguage}
                onPress={(res) => selectLanguage(res)}
                onClose={() => setShowSelectLanguage(false)}
                data={availableLanguages} >
            </ModalButtonList>

            <Header showHeaderButton={false} />

            {errorMessage
                ? < View style={styles.errorView}>
                    <Txt style={styles.errorText}>{errorMessage}</Txt>
                </View>
                : null
            }

            <View style={styles.changeAuthBox}>
                <Txt style={styles.changeAuthTxt}>уже есть кошелек?</Txt>
                <TouchableOpacity
                    style={styles.changeAuthBtn}
                    onPress={changeAuth}
                >
                    <Txt style={styles.changeAuthBtnTxt}>войти</Txt>
                </TouchableOpacity>
            </View>

            <View style={styles.formView}>

                <View style={styles.titleView}>
                    <Txt style={styles.titleText}>Регистрация</Txt>
                </View>


                <View style={styles.inputView}>
                    <Txt style={styles.text}>мобильный номер</Txt>
                    <TextInput style={styles.input}
                        value={phoneNumber}
                        onChangeText={phoneNumHandler}
                        keyboardType='decimal-pad'
                        autoFocus={true}
                    ></TextInput>
                    <TouchableOpacity style={styles.genRandNumber}
                        onPress={genRandomNumber}
                    >
                        <FontAwesome5 style={styles.genRandNumberIcon}
                            name="dice"
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.inputView}>
                    <Txt style={styles.text}>пароль</Txt>
                    <TextInput style={styles.input}
                        value={password}
                        onChangeText={passwordHandler}
                        passwordRules={true}
                        secureTextEntry={true}
                    ></TextInput>
                </View>

                <View style={styles.inputView}>
                    <Txt style={styles.text}>пароль повторно</Txt>
                    <TextInput style={styles.input}
                        value={repeatPassword}
                        onChangeText={repeatPasswordHandler}
                        passwordRules={true}
                        secureTextEntry={true}
                    ></TextInput>
                </View>

            </View>

            <TouchableOpacity style={styles.btn}
                onPress={enterBtnHandler}
            >
                <Txt style={styles.btnText}>зарегистрироваться</Txt>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    changeAuthBox: {
        flexDirection: 'row',
        marginHorizontal: 15,
        marginTop: 5,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
    },
    changeAuthTxt: {
        fontSize: 17,
        color: '#000',
        marginRight: 5
    },
    changeAuthBtn: {
        backgroundColor: '#97cbff',
        paddingHorizontal: 5,
        paddingVertical: 3,
        borderRadius: 10,
    },
    changeAuthBtnTxt: {
        fontSize: 17,
        color: '#000',
        fontWeight: 'bold'
    },
    errorView: {
        paddingHorizontal: 10,
        paddingVertical: 2
    },
    errorText: {
        color: '#ff0000',
        fontSize: 13
    },
    genRandNumber: {
        position: 'absolute',
        bottom: 10,
        left: '93%'
    },
    genRandNumberIcon: {
        fontSize: 20,
        color: '#777'
    },
    formView: {
        backgroundColor: '#fff',
        marginHorizontal: 7,
        marginTop: 7,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 4
    },
    titleView: {},
    titleText: {
        color: '#000',
        fontSize: 20
    },
    inputView: {
        borderBottomWidth: 2,
        borderBottomColor: '#808080',
        marginVertical: 10
    },
    text: {
        color: '#000',
        fontSize: 15
    },
    input: {
        paddingVertical: 5
    },
    btn: {
        backgroundColor: '#00abfd',
        marginTop: 15,
        width: 200,
        paddingVertical: 10,
        borderRadius: 3,
        alignItems: 'center',
        alignSelf: 'center',
    },
    btnText: {
        color: '#fff',
        fontSize: 17
    }
})