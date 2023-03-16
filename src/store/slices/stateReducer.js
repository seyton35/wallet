import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { storeData, getData, removeData } from "../../middleWare/asyncStorage";
import { translate } from "../../middleWare/translator/translator";
import { fetchAvailableCurrencies, setActiveBills, setAndStoreDefaultCurrencyAccount, setCurrencyArray, setDefaultCurrencyAccount } from "./currencyReducer";

export const executeCommand = createAsyncThunk(
    'state/executeCommand',
    async ({ command, message }, { dispatch }) => {
        switch (command) {
            case 'test':
                console.log(command);
                console.log('test')
                break;
            case 'message':
                console.log(message)
                console.log(command);
                break;
            case 'logOut':
                dispatch(logOutUser())
                dispatch(popToTop('register'))
                break;
        }
    }
)
export const initialization = createAsyncThunk(
    'state/initialization',
    async (_, { dispatch }) => {
        try {
            const data = await getData('userData')
            const language = await getData('language')
            if (data !== null) {
                dispatch(setUserDataWithoutStore(data))
                dispatch(setIsLogined(true))
                dispatch(fetchUserConfig(data.idUser))
                setTimeout(() => {
                    dispatch(popToTop('home'))
                }, 1500);
                dispatch(fetchAvailableCurrencies())
            } else setTimeout(() => {
                dispatch(setLanguage(language))
                dispatch(popToTop('login'))
            }, 1500);
        } catch (e) {
            console.log(e.message);
        }
    }
)

export const fetchUserConfig = createAsyncThunk(
    'state/fetchUserConfig',
    async (idUser, { dispatch }) => {
        try {
            const res = await fetch(
                'https://1220295-cj30407.tw1.ru/api/database/fetchUserConfig', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ idUser })
            })
            if (res.status == 200) {
                const data = await res.json()
                console.log('config', data.config);
                dispatch(storeAndSetAllPushNotificationSettings(data.config.pushNotificationSettings))
                dispatch(setDefaultCurrencyAccount(data.config.defaultCurrencyAccount))
                dispatch(storeAndSetLanguage(data.config.language))
            }
            else {
                const defaultCurrencyAccount = await getData('defaultCurrencyAccount')
                if (defaultCurrencyAccount !== null) dispatch(setDefaultCurrencyAccount(defaultCurrencyAccount))
                const pushNotificationSettings = await getData('pushNotificationSettings')
                if (pushNotificationSettings !== null) dispatch(setAllPushNotificationSettings(pushNotificationSettings))
            }
        } catch (e) {
            console.log(e.message);
        }
    }
)

export const postPushNotificationSettings = createAsyncThunk(
    'state/postPushNotificationSettings',
    async ({ flag, field }, { dispatch, getState }) => {
        try {
            dispatch(storeAndSetPushNotificationSettings({ flag, field }))
            const { pushNotificationSettings } = getState().state
            const { idUser } = getState().state.userData
            const res = await fetch(
                'https://1220295-cj30407.tw1.ru/api/operationsOnUserConfig/postPushNotificationSettings', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ idUser, pushNotificationSettings })
            })
            if (res.status !== 200) {
                dispatch(storeAndSetPushNotificationSettings({ flag: !flag, field }))
                dispatch(setToastAndroidMessage('попробуйте позже'))
            }
        } catch (e) {
            console.log(e.message);
        }
    }
)

export const postLanguage = createAsyncThunk(
    'state/postLanguage',
    async (language, { dispatch, getState }) => {
        try {
            dispatch(storeAndSetLanguage(language))
            const { idUser } = getState().state.userData
            const res = await fetch(
                'https://1220295-cj30407.tw1.ru/api/operationsOnUserConfig/postLanguage', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ idUser, language })
            })
        } catch (e) {
            console.log(e.message);
        }
    }
)

export const saveNotificationToken = createAsyncThunk(
    'state/saveNotificationToken',
    async ({ token, idUser }, { dispatch }) => {
        try {
            const res = await fetch(
                'https://1220295-cj30407.tw1.ru/api/auth/saveNotificationToken', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ idUser, token })
            })
            if (res.status == 200) {
                dispatch(setToken(token))
            }
        } catch (e) {
            console.log(e.message);
        }
    }
)

export const deleteAccount = createAsyncThunk(
    'state/deleteAccount',
    async (_, { dispatch, getState }) => {
        try {
            console.log("deleteAccount");
            const { idUser } = getState().state.userData
            const res = await fetch(
                'https://1220295-cj30407.tw1.ru/api/auth/deleteAccount', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ idUser })
            })
            const data = await res.json()
            if (res.status == 200) {
                dispatch(popToTop('login'))
                dispatch(removeUserData())
            }
        } catch (e) {
            console.log(e.message);
        }
    }
)

export const logOutUser = createAsyncThunk(
    'state/logOutUser',
    async (_, { dispatch, getState }) => {
        try {
            console.log("logOutUser");
            const { idUser } = getState().state.userData
            const { token } = getState().state
            dispatch(removeUserData())
            dispatch(setCurrencyArray([]))
            dispatch(setActiveBills([]))
            const res = await fetch(
                'https://1220295-cj30407.tw1.ru/api/auth/deleteNotificationToken', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ idUser, token })
            })
        } catch (e) {
            console.log(e.message);
        }
    }
)

export const registerNewUser = createAsyncThunk(
    'state/registerNewUser',
    async ({ phoneNumber, password }, { dispatch, getState }) => {
        try {
            const res = await fetch(
                'https://1220295-cj30407.tw1.ru/api/auth/registerNewUser', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ phoneNumber, password })
            })
            const data = await res.json()
            console.log(data);
            if (res.status === 200) {
                const { language } = getState().state
                dispatch(postLanguage(language))
                dispatch(setErrorMessage(null))
                dispatch(storeAndSetUserData({
                    id: data.id,
                    phoneNumber: data.phoneNumber
                }))
                dispatch(setAndStoreDefaultCurrencyAccount(data.defaultCurrencyAccount))
                dispatch(setIsLogined(true))
                dispatch(popToTop('home'))
                dispatch(fetchAvailableCurrencies())
                dispatch(setToastAndroidMessage(data.message))
            } else dispatch(setErrorMessage(data.error))
        } catch (e) {
            return e.message
        }
    }
)

export const loginUser = createAsyncThunk(
    'state/loginUser',
    async ({ phoneNumber, password }, { dispatch, getState }) => {
        try {
            const res = await fetch('https://1220295-cj30407.tw1.ru/api/auth/loginUser', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ phoneNumber, password })
            })
            const data = await res.json()
            console.log(data);
            if (res.status === 200) {
                console.log('logined');
                const { language } = getState().state
                dispatch(postLanguage(language))
                dispatch(fetchUserConfig(data.id))
                dispatch(setErrorMessage(null))
                dispatch(storeAndSetUserData({
                    id: data.id,
                    phoneNumber: data.phoneNumber
                }))
                dispatch(setIsLogined(true))
                dispatch(popToTop('home'))
                dispatch(fetchAvailableCurrencies())
                dispatch(setToastAndroidMessage(data.message))
            } else dispatch(setErrorMessage(data.error))
        } catch (e) {
            return e.message
        }
    }
)

const stateSlice = createSlice({
    name: 'state',
    initialState: {
        language: 'ru',
        availableLanguages: ['ru', 'en', 'ua'],
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
        token: null,
        pushNotificationSettings: {
            refill: null,
            writeOff: null,
            incomingBill: null,
            promotions: null,
        },
        toastAndroidMessage: null,
        errorMessage: null,
    },
    reducers: {
        setLanguage(state, action) {
            state.language = action.payload
        },
        storeAndSetLanguage(state, action) {
            storeData('language', action.payload)
            state.language = action.payload
        },
        navigate(state, action) {
            state.prevScreen = state.currentScreen
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
        setToken(state, action) {
            state.token = action.payload
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
            state.token = null
            state.pushNotificationSettings = {
                refill: null,
                writeOff: null,
                incomingBill: null,
                promotions: null,
            }
            removeData('userData')
            removeData('defaultCurrencyAccount')
            removeData('pushNotificationSettings')
            removeData('language')
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
            state.toastAndroidMessage = translate(action.payload, state.language)
        },
        storeAndSetPushNotificationSettings(state, action) {
            state.pushNotificationSettings[action.payload.field] = action.payload.flag
            storeData('pushNotificationSettings', state.pushNotificationSettings)
        },
        storeAndSetAllPushNotificationSettings(state, action) {
            state.pushNotificationSettings = action.payload
            storeData('pushNotificationSettings', state.pushNotificationSettings)
        },
        setAllPushNotificationSettings(state, action) {
            state.pushNotificationSettings = action.payload
        },
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
    setLanguage,
    storeAndSetLanguage,
    navigate,
    popToTop,
    backButtonPress,
    setToken,
    setIdUser,
    setLogin,
    setPhoneNumber,
    storeAndSetUserData,
    setUserDataWithoutStore,
    removeUserData,
    setErrorMessage,
    setIsLogined,
    setToastAndroidMessage,
    storeAndSetPushNotificationSettings,
    storeAndSetAllPushNotificationSettings,
    setAllPushNotificationSettings,
} = stateSlice.actions


export default stateSlice.reducer