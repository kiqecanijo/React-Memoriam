import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import userInfoReducer from ''
import scoreReducer from ''

//combinedReducers sound similar to combineReducers :/
const allreadyCombinedReducers = combineReducers({
  userInfoReducer,
  scoreReducer
})

const store = createStore(allreadyCombinedReducers, {
  userInfo: {
    name: 'exampleName',
    lastName: 'exampleLastName'
  },
  score: {
    currentScore: 0,
    maxScore: 0
  }
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

//ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
