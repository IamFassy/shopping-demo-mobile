import { combineReducers } from "redux";
import productReducer from "../Reducers/ProductReducer";

export default function rootReducer() {
    return combineReducers({
        product: productReducer,
    })
} 