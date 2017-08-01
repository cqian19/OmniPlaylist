/**
 * Created by cqian19 on 5/20/2017.
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducer from './reducers'

const store = configureStore();

function configureStore() {
    return createStore(reducer, applyMiddleware(thunk, logger));
}

export default store;