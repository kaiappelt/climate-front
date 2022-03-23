import { createStore } from "redux";
import { contactReducer } from "../redux/reducers/contactReducer";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = createStore(contactReducer, composeWithDevTools());