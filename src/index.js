import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import userInfo from './reducer/user-reducer.js'
import cards from './reducer/cards-reducer.js'
//combinedReducers sound similar to combineReducers :/
const allreadyCombinedReducers = combineReducers({
  userInfo,
  cards
})

const store = createStore(allreadyCombinedReducers, {
  userInfo: {
    name: 'exampleName',
    lastName: 'exampleLastName',
    score: false,
    debug: true
  },
  cards: [
    { flipped: false, solved: false, path: './static/puppy1.jpg' },
    { flipped: false, solved: false, path: './static/puppy1.jpg' },
    { flipped: false, solved: false, path: './static/puppy2.jpg' },
    { flipped: false, solved: false, path: './static/puppy2.jpg' },
    { flipped: false, solved: false, path: './static/puppy3.jpg' },
    { flipped: false, solved: false, path: './static/puppy3.jpg' },
    { flipped: false, solved: false, path: './static/puppy4.jpg' },
    { flipped: false, solved: false, path: './static/puppy4.jpg' },
    { flipped: false, solved: false, path: './static/puppy5.jpg' },
    { flipped: false, solved: false, path: './static/puppy5.jpg' },
    { flipped: false, solved: false, path: './static/puppy6.jpg' },
    { flipped: false, solved: false, path: './static/puppy6.jpg' },
    { flipped: false, solved: false, path: './static/puppy7.jpg' },
    { flipped: false, solved: false, path: './static/puppy7.jpg' },
    { flipped: false, solved: false, path: './static/puppy8.jpg' },
    { flipped: false, solved: false, path: './static/puppy8.jpg' }
  ]
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
//serviceWorker.register()
serviceWorker.unregister()
