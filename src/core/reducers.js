/**
 * Created by cqian19 on 5/20/2017.
 */

import { combineReducers } from 'redux';
import { headerReducer } from './header';
import { navbarReducer } from './navbar';
import { importbarReducer } from './importbar';

export default combineReducers({
    header: headerReducer,
    navbar: navbarReducer,
    importbar: importbarReducer
})