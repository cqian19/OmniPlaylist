/**
 * Created by cqian19 on 5/20/2017.
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducer from './reducers'

export default function configureStore() {
    const store = createStore(reducer, applyMiddleware(thunk, logger));
    return store;
}
