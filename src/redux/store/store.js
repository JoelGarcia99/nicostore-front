import thunk from "redux-thunk";
import {authReducer} from "../reducers/authReducer";
import { carritoReducer } from "../reducers/carritoReducer";
import { productReducer } from "../reducers/productReducer";

const {combineReducers, createStore, applyMiddleware, compose} = require("redux");

// You should do this always since you probably are
// gonna use several reducers in the same app, and 
// redux does not support many reducers at the same
// time by default
const reducers = combineReducers({
  auth: authReducer,
  prod: productReducer,
  cart: carritoReducer,
});


// If you wana use several middlewares, you should use next code
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
  reducers,
  // this is necessary in order to show redux status on your
  // browser. You don't need to do this if you are not going
  // to analyze redux state on a browser.
  //
  // here we're using thunk because you are gonna be triggering
  // some asynchronous functions, so, this middleware will help
  composeEnhancers(
    applyMiddleware( thunk )
  )
);
