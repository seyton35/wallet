import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { popToTop } from "./stateReducer";


export const fetchAllCurrencyes = createAsyncThunk(
    'currency/fetchAllCurrencyes',
    async (idUser, { dispatch }) => {
        try {
            const res = await fetch(
                'http://192.168.31.254:8000/api/database/fetchAllCurrencyes', {
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

export const fetchExchangeRate = createAsyncThunk(
    'currency/fetchExchangeRate',
    async ({ cur, goal },) => {
        cur = cur.toLowerCase()
        goal = goal.toLowerCase()
        try {
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
    async ({ id, sum, rate, recipient, donor }, { dispatch }) => {
        try {
            const res = await fetch(
                'http://192.168.31.254:8000/api/transaction/currencyConversion', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    id,
                    sum,
                    rate,
                    recipient,
                    donor
                })
            })
            const data = await res.json()
            console.log(data);

            if (res.status == 200) {
                dispatch(popToTop('home'))
                dispatch(setToastMessage(data.message))
                dispatch(resetValueAfterRequest())
                // dispatch(fetchAllCurrencyes()) TODO: 
            } else dispatch(setErrorMessage(data.message))

        } catch (e) {
            return e.message
        }
    }
)

export const fetchAwalableCurrency = createAsyncThunk(
    'currency/fetchAwalableCurrency',
    async (_, { rejectWithValue }) => {
        try {
            //TODO: запрос на курсы доступных валют
            // const res = await fetch(`myApi/awalableCurencyArray.json`)
            // const data = await res.json()
            return [
                { type: 'USD', limMin: 1, limMax: 10000 },
                { type: 'UAH', limMin: 1, limMax: 30000 },
                { type: 'RUB', limMin: 1, limMax: 100000 },
                { type: 'EUR', limMin: 1, limMax: 10000 },
                { type: 'BTC', limMin: 0.0001, limMax: 1 },
                { type: 'KZT', limMin: 100, limMax: 100000 },
                { type: 'JPU', limMin: 100, limMax: 200000 },
            ]
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const clientMoneyRequest = createAsyncThunk(
    'currency/clientMoneyRequest',
    async ({ receiver, sender, currency, sum, comment, socket }, { dispatch }) => {
        try {
            const res = await fetch(
                'http://192.168.31.254:8000/api/transaction/clientMoneyRequest', {
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
                dispatch(setToastMessage(data.message))
                dispatch(setRequestStatus(data.status))
                dispatch(resetValueAfterRequest())
                dispatch(popToTop('home'))
                socket.emit("/", {
                    way: 'CHECK_YOUR_ISSUES',
                    id: data.receiverId
                });
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
                'http://192.168.31.254:8000/api/dataBase/fetchActiveBills', {
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
    async ({ idUser, idBill, currencyType }, { dispatch }) => {
        try {
            const res = await fetch(
                'http://192.168.31.254:8000/api/transaction/billPayment', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ idUser, idBill, currencyType })
            })
            const data = await res.json()
            if (res.status == 200) {
                dispatch(setToastMessage(data.message))
                dispatch(fetchActiveBills(idUser))
            } else {
                dispatch(setToastMessage(data.message))
            }


        } catch (e) {
            return e.message
        }
    }
)

export const rejectBillPayment = createAsyncThunk(
    'currency/rejectBillPayment',
    async ({ idUser, idBill }, { dispatch }) => {
        try {
            console.log(idUser, idBill);
            const res = await fetch(
                'http://192.168.31.254:8000/api/transaction/rejectBillPayment', {
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
                'http://192.168.31.254:8000/api/database/fetchClosedBills', {
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

const currencySlice = createSlice({
    name: 'currency',
    initialState: {
        currencyArray: [],
        selectedCurrency: null,
        rateStatus: null,
        error: null,
        rate: null,
        transferStatus: null,
        awalableCurrency: [],
        toastAndroidMessage: null,
        requestStatus: null,
        activeBills: [],
        closedBills: []
    },
    reducers: {
        addCurrency(state, action) {// TODO: сохранение нового кошеля в базу в asyn
            state.currencyArray.push({
                type: action.payload.currency,
                value: 0
            })
        },
        setCurrencyArray(state, action) {
            state.currencyArray = action.payload
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
            state.error = action.payload
        },
        resetValueAfterRequest(state, action) {
            state.selectedCurrency = null
            state.rateStatus = null
            state.error = null
            state.rate = null
            state.transferStatus = null
            state.toastAndroidMessage = null
            state.requestStatus = null
        },
        resetMessage(state, action) {
            state.error = null
        },
        setActiveBills(state, action) {
            state.activeBills = action.payload
        },
        setClosedBills(state, action) {
            state.closedBills = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExchangeRate.fulfilled, (state, action) => {
                state.rateStatus = 'complete'
                state.rate = action.payload
            })
            .addCase(fetchExchangeRate.pending, (state, action) => {
                state.rateStatus = 'loading'
            })
            .addCase(fetchExchangeRate.rejected, (state, action) => {
                state.rateStatus = 'rejected',
                    state.error = action.payload
            })

        builder

            .addCase(currencyСonversion.pending, (state, action) => {
                state.transferStatus = 'loading'
            })
            .addCase(currencyСonversion.rejected, (state, action) => {
                state.transferStatus = 'rejected',
                    state.error = action.payload
            })

        builder
            .addCase(fetchAwalableCurrency.fulfilled, (state, action) => {
                state.awalableCurrency = action.payload
            })
            .addCase(fetchAwalableCurrency.rejected, (state, action) => {
                state.error = action.payload
            })
    }

})

export const {
    addCurrency,
    setCurrencyArray,
    selectCurrency,
    setRequestStatus,
    setToastMessage,
    setErrorMessage,
    resetValueAfterRequest,
    resetMessage,
    setActiveBills,
    setClosedBills
} = currencySlice.actions

export default currencySlice.reducer