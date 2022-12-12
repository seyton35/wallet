import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { storeData, getData } from "../../middleWare/asyncStorage";

export const initialization = createAsyncThunk(
    'state/initialization',
    async (_, { dispatch }) => {
        try {
            const data = await getData('userData')
            console.log(data);
            if (data !== null) {
                dispatch(setIsLogined(true))
                dispatch(setUserDataWithoutStore(data))
                dispatch(navigate('home'))
            } else dispatch(setCurrentScreen('login'))
            return data.idUser
        } catch (e) {
            console.log(e.message);
        }
    }
)

export const registerNewUser = createAsyncThunk(
    'state/registerNewUser',
    async ({ phoneNumber, password }, { dispatch }) => {
        try {
            const res = await fetch(
                'http://192.168.31.254:8000/api/auth/registerNewUser', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ phoneNumber, password })
            })
            const data = await res.json()
            console.log(data);
            if (res.status === 200) {
                console.log('registered');
                dispatch(setIsLogined(true))
                dispatch(storeAndSetUserData({
                    id: data.id,
                    phoneNumber: data.phoneNumber
                }))
                dispatch(setToastAndroidMessage(data.message))
            } else dispatch(setServerErrorMessage(data.error))
        } catch (e) {
            return e.message
        }
    }
)

export const loginUser = createAsyncThunk(
    'state/loginUser',
    async ({ phoneNumber, password }, { dispatch }) => {
        try {
            const res = await fetch('http://192.168.31.254:8000/api/auth/loginUser', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ phoneNumber, password })
            })
            const data = await res.json()
            if (res.status === 200) {
                console.log('logined');
                dispatch(setIsLogined(true))
                dispatch(storeAndSetUserData({
                    id: data.id,
                    phoneNumber: data.phoneNumber
                }))
                dispatch(setToastAndroidMessage(data.message))
            } else dispatch(setServerErrorMessage(data.error))
        } catch (e) {
            return e.message
        }
    }
)

function headerFormater(screen) {
    switch (screen) {
        case 'clientMoneyRequest': return 'выставить счет'
        case 'transferBetweenCurrencyes': return 'перевод между счетами'
        case 'login':  return 'Вход'
        case 'register': return 'Регистрация'
        case 'error': return 'Error'

        default: return 'Wallet'
    }
}

const stateSlice = createSlice({
    name: 'state',
    initialState: {
        loading:false,
        currentScreen: 'greeting',
        currentScreenHeaderText: null,
        stack: [],
        isLogined: false,
        userData: {
            idUser: null,
            login: null,
            phoneNumber: null,
        },
        toastAndroidMessage: null,
        serverErrorMessage: null,
    },
    reducers: {
        setCurrentScreenHeaderText(state, action) {
            state.currentScreenHeaderText = action.payload
        },
        navigate(state, action) {
            state.stack.push(action.payload)
            state.currentScreen = action.payload
            state.currentScreenHeaderText = headerFormater(action.payload)
        },
        backButtonPress(state, action) {
            console.log('backButtonPress');
            console.log(state.stack);
            if (state.stack.length > 1) {
                state.stack.pop()
                // navigate(state.stack[state.stack.length - 1])
                state.currentScreen = state.stack[state.stack.length - 1]
                state.currentScreenHeaderText = headerFormater(state.stack[state.stack.length - 1])
            }
        },
        setLogin(state, action) {
            state.userData.login = action.payload
        },
        setServerErrorMessage(state, action) {
            state.serverErrorMessage = action.payload
        },
        setIdUser(state, action) {
            state.userData.idUser = action.payload
        },
        storeAndSetUserData(state, action) {
            state.userData.idUser = action.payload.id
            state.userData.phoneNumber = action.payload.phoneNumber
            storeData('userData', state.userData)
        },
        setUserDataWithoutStore(state, action) {
            state.userData = action.payload
        },
        setsetPhoneNumber(state, action) {
            state.userData.phoneNumber = action.payload
        },
        setIsLogined(state, action) {
            state.isLogined = action.payload
        },
        setToastAndroidMessage(state, action) {
            state.toastAndroidMessage = action.payload
        },

        getUserData(state, action) {
            console.log('getUserData');
            // return state.userData
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginUser.rejected, (state, action) => {
                console.log('loginUser is rejected');
                console.log(action.payload);
            })

        builder
            .addCase(registerNewUser.rejected, (state, action) => {
                console.log('registerNewUser is rejected');
                console.log(action.payload);
            })
        builder
            .addCase(initialization.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(initialization.pending, (state, action) => {
                state.loading = true
            })
    }
})

export const {
    navigate,
    setCurrentScreenHeaderText,
    backButtonPress,
    setIdUser,
    setLogin,
    setPhoneNumber,
    storeAndSetUserData,
    setUserDataWithoutStore,
    setServerErrorMessage,
    setIsLogined,
    setToastAndroidMessage,

    getUserData,
} = stateSlice.actions


export default stateSlice.reducer