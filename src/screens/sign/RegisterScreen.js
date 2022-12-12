import { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { registerNewUser } from '../../store/slices/stateReducer'

export default function RegisterScreen({ navigation }) {
    const [phoneNumber, setPhoneNumber] = useState('+')
    const [password, setPassword] = useState()
    const [repeatPassword, setRepeatPassword] = useState()
    const [error, setError] = useState()

    const [isPhoneOk, setIsPhoneOk] = useState(false)
    const [isPasswordOk, setIsPasswordOk] = useState(false)

    const serverErrorMessage = useSelector(s => s.state.serverErrorMessage)

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
                setError()
            } else {
                setIsPhoneOk(false)
                if (num.length > 11) {
                    setError('слишком длинный номер')
                } else setError()
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
            setError('повторный пароль не совпадает')
        } else {
            setError()
        }
    }

    function checkRepeatPassword() {
        if (repeatPassword === password) {
            setError()
            return true
        } else {
            setError('повторный пароль не совпадает')
            return false
        }
    }

    async function enterBtnHandler() {
        const check = checkRepeatPassword()
        if (isPhoneOk && isPasswordOk && check) {
            dispatch(registerNewUser({
                phoneNumber, password
            }))
        } else setError('некорректный логин или пароль')
    }

    function errorShow() {
        if (serverErrorMessage) {
            return (
                < View style={styles.errorView}>
                    <Text style={styles.errorText}>{serverErrorMessage}</Text>
                </View>
            )
        } else if (error) {

            return (
                < View style={styles.errorView}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )
        }
    }

    return (
        <View style={styles.container}>
            {errorShow()}

            <View style={styles.formView}>

                <View style={styles.titleView}>
                    <Text style={styles.titleText}>Регистрация</Text>
                </View>

                {/* <View style={styles.inputView}>
                    <Text style={styles.text}>логин</Text>
                    <TextInput style={styles.input}
                        value={login}
                        onChangeText={setLogin}
                        autoFocus={true}
                    ></TextInput>
                </View> */}

                <View style={styles.inputView}>
                    <Text style={styles.text}>мобильный номер</Text>
                    <TextInput style={styles.input}
                        value={phoneNumber}
                        onChangeText={phoneNumHandler}
                        keyboardType='decimal-pad'
                        autoFocus={true}
                    ></TextInput>
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.text}>пароль</Text>
                    <TextInput style={styles.input}
                        value={password}
                        onChangeText={passwordHandler}
                        passwordRules={true}
                        secureTextEntry={true}
                    ></TextInput>
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.text}>пароль повторно</Text>
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
                <Text style={styles.btnText}>зарегистрироваться</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d3d3d3',
    },
    errorView: {
        paddingHorizontal: 10,
        paddingVertical: 2
    },
    errorText: {
        color: '#ff0000',
        fontSize: 13
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