import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store/store'
import App from './App';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

const AppComponent = () => (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>
);

ReactDOM.render(<AppComponent />, document.getElementById('root'));
registerServiceWorker();
