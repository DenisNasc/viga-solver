import {createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import rootReducer, {RootReducer} from '../reducers';

const store = createStore(rootReducer, composeWithDevTools());

export default store;

export interface Store extends RootReducer {}
