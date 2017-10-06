import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import store from './core/store';
import routes from './home/routes';
import App from './containers/AppContainer';

const render = (appRoutes) => {
    ReactDOM.render(
        <Provider store={store}>
            <AppContainer>
                <App routes={appRoutes}/>
            </AppContainer>
        </Provider>,
        document.getElementById('root')
    );
};

render(routes);

if (module.hot) {
    module.hot.accept('./home/routes', () => {
        const newRoutes = require('./home/routes').default;
        render(newRoutes);
    })
}