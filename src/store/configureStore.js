/* global __DEVELOPMENT__ __USE_GA__ __DEVTOOLS__ */
/* eslint global-require: 0 */

import { compose, createStore, applyMiddleware } from 'redux';
import DevTools from '../pages/DevTools';
import reducers from '../state';
import sagas from '../sagas';
import createSagaMiddleware from 'redux-saga';

export default function configureStore(initialState = {}) {
    const middlewares = [];
    const sagaMiddleware = createSagaMiddleware();
    middlewares.push(sagaMiddleware);

    if (__DEVELOPMENT__) {
        const createLogger = require('redux-logger');
        const logger = createLogger({ predicate:
            (getState, action) => action.type !== 'EFFECT_TRIGGERED' &&
                                  action.type !== 'EFFECT_RESOLVED' });
        middlewares.push(logger);
    }

    let createStoreWithMiddleware = applyMiddleware(...middlewares);

    createStoreWithMiddleware = compose(
            createStoreWithMiddleware,
            DevTools.instrument()
        );

    const finalCreateStore = createStoreWithMiddleware(createStore);
    const store = finalCreateStore(reducers, initialState);
    sagaMiddleware.run(sagas);

    if (__DEVELOPMENT__) {
        if (module.hot) {
            // Enable Webpack hot module replacement for reducers
            module.hot.accept('../state', () => {
                const nextReducer = require('../state');
                store.replaceReducer(nextReducer);
            });
        }
    }

    return store;
}
