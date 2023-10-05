// Import necessary dependencies
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Import your user reducer

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // Import Redux Persist storage (localStorage or sessionStorage)

// Configuration for Redux Persist
const persistConfig = {
  key: "root", // Key under which data will be stored in storage
  version: 1,  // Version of the persisted data
  storage,     // Storage mechanism (localStorage or sessionStorage)
};

// Combine all reducers (in this case, only 'userReducer')
const rootReducer = combineReducers({ user: userReducer });

// Create a persisted reducer by wrapping the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with Redux Toolkit
export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create a Redux Persist store to handle data persistence
export const persistor = persistStore(store);
