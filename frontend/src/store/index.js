import {configureStore} from "@reduxjs/toolkit";
import logReducer from "./slices/logSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
    reducer: {
        log: logReducer,
        user: userReducer,
        
        devTools: process.env.NODE_ENV !== "production",
    },
})