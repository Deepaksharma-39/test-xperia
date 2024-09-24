import { configureStore, combineReducers } from '@reduxjs/toolkit';
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
import storage from "redux-persist/lib/storage";
import { settingsReducer } from './slice/settings-slice';
import { projectsReducer } from './slice/project-slice';
import { bannersReducer } from './slice/banner-slice';
import { blogsReducer } from './slice/blog-slice';
import { servicesReducer } from './slice/service-slice';
import { loadingReducer } from './slice/loading-slice';
import { teamsReducer } from './slice/team-slice';


const persistConfig = {
    key: "xperia",
    version: 1,
    storage,
    blacklist: ["product"],
};

const rootReducer = combineReducers({
    settings: settingsReducer,
    projects: projectsReducer,
    banners: bannersReducer,
    blogs: blogsReducer,
    service: servicesReducer,
    loading: loadingReducer,
    teams:teamsReducer
    
    // product: productReducer, // Uncomment if you have a product slice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);
