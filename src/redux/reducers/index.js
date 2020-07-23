import { combineReducers } from "redux";
import table from './TableReducer';
import settings from './SettingsReducer';
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage";
import immutableTransform from 'redux-persist-transform-immutable';

const persistConfig = {
  transforms: [immutableTransform()],
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  table,
  settings,
});

export default persistReducer(persistConfig, rootReducer);
