import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer/Index'

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ || compose
const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        composeEnhancers()
    )
)
export default store