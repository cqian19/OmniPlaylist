import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './core/store';
import AppContainer from './containers/AppContainer';

ReactDOM.render(
    <Provider store={configureStore()}>
        <AppContainer />
    </Provider>,
    document.getElementById('root')
);
