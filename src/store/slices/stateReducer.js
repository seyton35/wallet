import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { storeData, getData, removeData } from "../../middleWare/asyncStorage";
import { fetchAwalableCurrency } from "./currencyReducer";

export const initialization = createAsyncThunk(
    'state/initialization',
    async (_, { dispatch }) => {
        try {
            const data = await getData('userData')
            console.log(data);
            if (data !== null) {
                dispatch(setUserDataWithoutStore(data))
                dispatch(setIsLogined(true))
                setTimeout(() => {
                    dispatch(popToTop('home'))
                }, 1500);
                dispatch(fetchAwalableCurrency())
            } else dispatch(popToTop('login'))
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
                dispatch(setErrorMessage(null))
                dispatch(storeAndSetUserData({
                    id: data.id,
                    phoneNumber: data.phoneNumber
                }))
                dispatch(setIsLogined(true))
                dispatch(popToTop('home'))
                dispatch(setToastAndroidMessage(data.message))
            } else dispatch(setErrorMessage(data.error))
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
                dispatch(setErrorMessage(null))
                dispatch(storeAndSetUserData({
                    id: data.id,
                    phoneNumber: data.phoneNumber
                }))
                dispatch(setIsLogined(true))
                dispatch(popToTop('home'))
                dispatch(setToastAndroidMessage(data.message))
            } else dispatch(setErrorMessage(data.error))
        } catch (e) {
            return e.message
        }
    }
)

function headerFormater(screen) {
    switch (screen) {
        case 'clientMoneyRequest': return '?????????????????? ????????'
        case 'transferBetweenCurrencyes': return '?????????????? ?????????? ??????????????'
        case 'login': return '????????'
        case 'register': return '??????????????????????'
        case 'error': return 'Error'

        default: return 'Wallet'
    }
}

const stateSlice = createSlice({
    name: 'state',
    initialState: {
        loading: false,
        currentScreen: 'greeting',
        prevScreen: null,
        navigationData: null,
        currentScreenHeaderText: null,
        stack: [],
        isLogined: false,
        userData: {
            idUser: null,
            login: null,
            phoneNumber: null,
        },
        toastAndroidMessage: null,
        errorMessage: null,
    },
    reducers: {
        navigate(state, action) {
            state.prevScreen =  state.currentScreen
            if (action.payload.data == null) {
                state.stack.push(action.payload)
                state.currentScreen = action.payload
            } else {
                state.stack.push(action.payload.screen)
                state.currentScreen = action.payload.screen
                state.navigationData = action.payload.data                
            }
        },
        popToTop(state, action) {
            state.stack = [action.payload]
            state.currentScreen = action.payload
        },
        backButtonPress(state, action) {
            if (state.stack.length > 1) {
                state.prevScreen = state.stack.pop()
                state.currentScreen = state.stack[state.stack.length - 1]
            }
        },
        setLogin(state, action) {
            state.userData.login = action.payload
        },
        setErrorMessage(state, action) {
            state.errorMessage = action.payload
        },
        setIdUser(state, action) {
            state.userData.idUser = action.payload
        },
        storeAndSetUserData(state, action) {
            state.userData.idUser = action.payload.id
            state.userData.phoneNumber = action.payload.phoneNumber
            storeData('userData', state.userData)
        },
        removeUserData(state, action) {
            setIsLogined(false)
            state.userData = {
                idUser: null,
                login: null,
                phoneNumber: null,
            }
            removeData('userData')
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
    popToTop,
    backButtonPress,
    setIdUser,
    setLogin,
    setPhoneNumber,
    storeAndSetUserData,
    setUserDataWithoutStore,
    removeUserData,
    setErrorMessage,
    setIsLogined,
    setToastAndroidMessage,

    getUserData,
} = stateSlice.actions


export default stateSlice.reducer