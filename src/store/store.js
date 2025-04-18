import {compose,createStore,applyMiddleware } from 'redux';
import {logger} from 'redux-logger';
import { rootReducer } from './root-reducer';

const middlewares = [logger]

const composeEnhacers = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, undefined, composeEnhacers);


// root reducer
