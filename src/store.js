import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import blogsReducer from "./slices/blogSlice";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

const rootReducer = combineReducers({
     blogs: blogsReducer
})

const persistConfig = {
     key: "root",
     storage,
     whitelist: ["likedBlogs"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
     reducer: persistedReducer,
     middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
               serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
               },
          }),
});

const persistedStore = persistStore(store);

export { store, persistedStore };