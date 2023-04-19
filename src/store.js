import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import  { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const initialState = {};

const middleware = [thunk];

const store = configureStore({
    preloadedState: initialState,
    reducer: rootReducer
    }
);

export default store;
