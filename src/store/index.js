import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./slices/currencyReducer";
import stateReducer from "./slices/stateReducer";

export default configureStore({
    reducer: {
        currency: currencyReducer,
        state: stateReducer
    },
})