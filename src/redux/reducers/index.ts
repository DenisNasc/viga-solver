import {combineReducers} from 'redux';
import viga, {VigaReducer} from './viga';

const reducers = {viga};

const rootReducer = combineReducers(reducers);

export default rootReducer;

export interface RootReducer {
  viga: VigaReducer;
}
