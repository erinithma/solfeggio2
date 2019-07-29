import sound from './sound'
import { combineReducers } from 'redux'

const createRootReducer = () => combineReducers({
  sound
});

export default createRootReducer;
