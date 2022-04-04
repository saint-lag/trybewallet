import { createStore, combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';

const rootReducer = combineReducers({ user, wallet });
const store = createStore(rootReducer);

export default store;

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
