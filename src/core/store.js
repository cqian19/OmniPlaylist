/**
 * Created by cqian19 on 5/20/2017.
 */
import { createStore } from 'redux';
import reducer from './reducers'

export default function configureStore() {
    const store = createStore(reducer);
    return store;
}
