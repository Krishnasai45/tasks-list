import { createStore, applyMiddleware, compose } from "redux"
// import thunk from "redux-thunk";
import  reducer  from "./reducer";



const rootReducer = reducer;
const thunk = (store) => (next) => (action) => {
    typeof action === "function" ? action(store.dispatch) : next(action);
  };
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
 export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );