//Library
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../RootReducer/RootReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    // Root
    key: 'root',
    // Storage Method (React Native)
    storage: AsyncStorage,
    // Whitelist (Save Specific Reducers)
    whitelist: [
        'product',
    ],

};

const root = rootReducer()

const persistedReducer = persistReducer(persistConfig, root);
const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
)

let persistor = persistStore(store);


export { store, persistor };

