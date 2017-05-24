import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import configureStore from './core/store';
import App from './containers/AppContainer';

const render = (Component) => {
    ReactDOM.render(
        <Provider store={configureStore()}>
            <AppContainer>
                <Component/>
            </AppContainer>
        </Provider>,
        document.getElementById('root')
    );
};

render(App);

if (module.hot) {
    module.hot.accept('./containers/AppContainer', () => {
        const NextApp = require('./containers/AppContainer').default;
        render(NextApp);
    })
}