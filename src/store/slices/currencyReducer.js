import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { storeData } from "../../middleWare/asyncStorage";
import { popToTop } from "./stateReducer";


export const fetchAllCurrencyes = createAsyncThunk(
    'currency/fetchAllCurrencyes',
    async (idUser, { dispatch }) => {
        try {
            const res = await fetch(
                'http://1220295-cj30407.tw1.ru/api/database/fetchAllCurrencyes', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    idUser,
                })
            })
            const data = await res.json()
            if (res.status == 200) {
                dispatch(setCurrencyArray(data.currencyesArr))
            } else {
                dispatch(setToastMessage(data.message))
            }
        } catch (e) {
            return e.message
        }
    }
)

export const postDefaultCurrencyAccount = createAsyncThunk(
    'currency/postDefaultCurrencyAccount',
    async ({ currency }, { dispatch, getState }) => {
        try {
            const { idUser } = getState().state.userData
            const res = await fetch(
                'http://1220295-cj30407.tw1.ru/api/operationsOnUserConfig/postDefaultCurrencyAccount', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    currency, idUser
                })
            })
            const data = await res.json()
            if (res.status == 200) {
                dispatch(setDefaultCurrencyAccount(currency))
            } else {
                dispatch(setToastMessage(data.message))
            }
        } catch (e) {
            return e.message
        }
    }
)

export const fetchExchangeRate = createAsyncThunk(
    'currency/fetchExchangeRate',
    async ({ cur, goal },) => {
        try {
            cur = cur.toLowerCase()
            goal = goal.toLowerCase()
            const res = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${cur}/${goal}.json`)
            const data = await res.json()
            return data[`${goal}`]
        } catch (e) {
            return e.message
        }
    }
)

export const currencyСonversion = createAsyncThunk(
    'currency/currencyСonversion',
    async ({ sum, rate, recipient, donor }, { dispatch, getState }) => {
        try {
            const { idUser, phoneNumber } = getState().state.userData
            const res = await fetch(
                'http://1220295-cj30407.tw1.ru/api/transaction/currencyConversion', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    idUser,
                    phoneNumber,
                    sum,
                    rate,
                    recipient,
                    donor
                })
            })
            const data = await res.json()
            console.log(data);

            if (res.status == 200) {
                dispatch(setErrorMessage(null))
                dispatch(popToTop('home'))
                dispatch(setToastMessage(data.message))
                dispatch(resetValueAfterRequest())
            } else dispatch(setErrorMessage(data.message))

        } catch (e) {
            return e.message
        }
    }
)

export const fetchAvailableCurrencies = createAsyncThunk(
    'currency/fetchAvailableCurrencies',
    async () => {
        try {
            const res = await fetch(
                'http://1220295-cj30407.tw1.ru/api/database/fetchAvailableCurrencies', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
            })
            if (res.status == 200) {
                const data = await res.json()
                return data.availableCurrencies
            } else return []
        } catch (e) {
            return e.message
        }
    }
)

export const clientMoneyRequest = createAsyncThunk(
    'currency/clientMoneyRequest',
    async ({ receiver, sender, currency, sum, comment }, { dispatch }) => {
        try {
            const res = await fetch(
                'http://1220295-cj30407.tw1.ru/api/transaction/clientMoneyRequest', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    receiver, sender,
                    currency, sum, comment
                })
            })
            const data = await res.json()
            if (res.status == 200) {
                dispatch(setErrorMessage(null))
                dispatch(setToastMessage(data.message))
                dispatch(setRequestStatus(data.status))
                dispatch(resetValueAfterRequest())
                dispatch(popToTop('home'))
            } else dispatch(setErrorMessage(data.message))
        } catch (e) {
            return e.message
        }
    }
)

export const fetchActiveBills = createAsyncThunk(
    'currency/fetchActiveBills',
    async (idUser, { dispatch }) => {
        try {
            console.log("fetchActiveBills whith :", idUser);
            const res = await fetch(
                'http://1220295-cj30407.tw1.ru/api/dataBase/fetchActiveBills', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ idUser })
            })
            const data = await res.json()
            if (res.status == 200) {
                dispatch(setActiveBills(data.activeBills))
            }
            if (res.status == 204) return

        } catch (e) {
            return e.message
        }
    }
)

export const billPayment = createAsyncThunk(
    'currency/billPayment',
    async ({ idUser, idBill, currencyType, rate }, { dispatch }) => {
        try {
            const res = await fetch(
                'http://1220295-cj30407.tw1.ru/api/transaction/billPayment', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ idUser, idBill, currencyType, rate })
            })
            const data = await res.json()
            dispatch(setToastMessage(data.message))
            if (res.status == 200 || res.status == 202) {
                dispatch(fetchActiveBills(idUser))
                dispatch(popToTop('home'))
            } else {
            }


        } catch (e) {
            return e.message
        }
    }
)

export const rejectBill = createAsyncThunk(
    'currency/rejectBill',
    async ({ idUser, idBill }, { dispatch }) => {
        try {
            console.log(idUser, idBill);
            const res = await fetch(
                'http://1220295-cj30407.tw1.ru/api/transaction/rejectBill', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ idUser, idBill })
            })
            const data = await res.json()
            if (res.status == 200) {
                dispatch(setToastMessage(data.message))
                dispatch(fetchActiveBills(idUser))
            } else dispatch(setToastMessage(data.message))


        } catch (e) {
            return e.message
        }
    }
)

export const fetchClosedBills = createAsyncThunk(
    'currency/fetchClosedBills',
    async (idUser, { dispatch }) => {
        try {
            const res = await fetch(
                'http://1220295-cj30407.tw1.ru/api/database/fetchClosedBills', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ idUser })
            })
            const data = await res.json()
            if (res.status == 200) {
                dispatch(setClosedBills(data.closedBills))
            }
            // else dispatch(setToastMessage(data.message))


        } catch (e) {
            return e.message
        }
    }
)

export const fetchBillsByCategory = createAsyncThunk(
    'currency/fetchBillsByCategory',
    async ({ idUser, category, timeRange }, { dispatch }) => {
        try {
            const res = await fetch(
                'http://1220295-cj30407.tw1.ru/api/database/fetchBillsByCategory', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ idUser, category, timeRange })
            })
            const data = await res.json()
            if (res.status == 200) {
                dispatch(setBillsByCategory(data.billsByCategory))
            }

        } catch (e) {
            return e.message
        }
    }
)

export const fetchAvailableCurrencyRates = createAsyncThunk(
    'currency/fetchAvailableCurrencyRates',
    async (_, { getState, dispatch }) => {
        const availableCurrencies = getState().currency.availableCurrencies
        try {
            const resRates = []
            for (let i = 0; i < availableCurrencies.length; i++) {
                const cur = availableCurrencies[i];
                if (cur.type != 'RUB') {
                    const res = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${cur.type.toLowerCase()}/rub.json`)
                    const data = await res.json()
                    resRates.push({
                        val: data.rub,
                        type: cur.type
                    })
                }
            }
            dispatch(setAvailableCurrencyRates(resRates))
        } catch (e) {
            console.log(e.message)
        }
    }
)

const currencySlice = createSlice({
    name: 'currency',
    initialState: {
        currencyArray: [],
        defaultCurrencyAccount: null,
        selectedCurrency: null,
        rateStatus: null,
        errormessage: null,
        pending: false,
        rate: null,
        transferStatus: null,
        availableCurrencies: [],
        availableCurrencyRates: [],
        toastAndroidMessage: null,
        requestStatus: null,
        activeBills: [],
        closedBills: [],
        billsByCategory: [],
    },
    reducers: {
        setCurrencyArray(state, action) {
            state.currencyArray = action.payload
        },
        setDefaultCurrencyAccount(state, action) {
            state.defaultCurrencyAccount = action.payload
        },
        setAndStoreDefaultCurrencyAccount(state, action) {
            state.defaultCurrencyAccount = action.payload
            storeData('defaultCurrencyAccount', action.payload)
        },
        selectCurrency(state, action) {
            state.selectedCurrency = action.payload
        },
        setRequestStatus(state, action) {
            state.requestStatus = action.payload
        },
        setToastMessage(state, action) {
            state.toastAndroidMessage = action.payload
        },
        setErrorMessage(state, action) {
            state.errormessage = action.payload
        },
        resetValueAfterRequest(state, action) {
            state.selectedCurrency = null
            state.rateStatus = null
            state.errormessage = null
            state.rate = null
            state.transferStatus = null
            state.toastAndroidMessage = null
            state.requestStatus = null
        },
        resetMessage(state, action) {
            state.errormessage = null
        },
        setAavailableCurrencyRates(state, action) {
            state.availableCurrencyRates = action.payload
        },
        setActiveBills(state, action) {
            state.activeBills = action.payload
        },
        setClosedBills(state, action) {
            state.closedBills = action.payload
        },
        setBillsByCategory(state, action) {
            state.billsByCategory = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExchangeRate.fulfilled, (state, action) => {
                state.rateStatus = 'complete'
                state.rate = action.payload
            })
            .addCase(fetchExchangeRate.pending, (state, action) => { state.rateStatus = 'loading' })
            .addCase(fetchExchangeRate.rejected, (state, action) => {
                state.rateStatus = 'rejected',
                    state.errormessage = action.payload
            })

        builder
            .addCase(currencyСonversion.pending, (state, action) => { state.transferStatus = 'loading' })
            .addCase(currencyСonversion.rejected, (state, action) => {
                state.transferStatus = 'rejected',
                    state.errormessage = action.payload
            })
        builder
            .addCase(fetchAvailableCurrencies.fulfilled, (state, action) => { state.availableCurrencies = action.payload })
            .addCase(fetchAvailableCurrencies.rejected, (state, action) => { state.errormessage = action.payload })
        builder
            .addCase(fetchClosedBills.fulfilled, (state, action) => { state.pending = false })
            .addCase(fetchClosedBills.pending, (state, action) => { state.pending = true })
        builder
            .addCase(fetchAvailableCurrencyRates.fulfilled, (state, action) => { state.pending = false })
            .addCase(fetchAvailableCurrencyRates.pending, (state, action) => { state.pending = true })
    }

})

export const {
    addCurrency,
    setDefaultCurrencyAccount,
    setAndStoreDefaultCurrencyAccount,
    setCurrencyArray,
    selectCurrency,
    setRequestStatus,
    setToastMessage,
    setErrorMessage,
    resetValueAfterRequest,
    resetMessage,
    setAavailableCurrencyRates: setAvailableCurrencyRates,
    setActiveBills,
    setClosedBills,
    setBillsByCategory
} = currencySlice.actions

export default currencySlice.reducer