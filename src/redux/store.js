import { createStore } from "redux";
import reducer from "./reducers";
import { persistStore } from "redux-persist"

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);
