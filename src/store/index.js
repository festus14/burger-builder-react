import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import ingredients from "./reducers/ingredients";
import ui from "./reducers/ui";
import orders from "./reducers/orders";
import auth from "./reducers/auth";
import user from "./reducers/user";

const appReducer = combineReducers({
  ingredients,
  ui,
  orders,
  auth,
  user,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_APP") {
    state = undefined;
  }
  return appReducer(state, action);
};

let composeEnhancers = compose;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const middleware = composeEnhancers(applyMiddleware(thunkMiddleware));

const store = createStore(rootReducer, {}, middleware);

export default store;
