import {createStore,combineReducers} from 'redux';
import diamondsReducer from './reducers/diamondsReducer';


const reducer=combineReducers({diamondsReducer})
const store=createStore(reducer)
window.store=store;

export default store;