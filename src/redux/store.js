import {applyMiddleware, combineReducers, createStore} from "redux";
import authReducer from "./auth_reducer";
import thunk from "redux-thunk";

let RootReducer = combineReducers({
    authReducer,
})

export let store = createStore(RootReducer, applyMiddleware(thunk))