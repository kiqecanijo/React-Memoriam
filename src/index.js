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
    lastName: 'exampleLastName'
  },
  cards: [
    { id: 1, value: 1, revealed: false, solved: false, image: './static/puppy1.jpg' },
    { id: 2, value: 1, revealed: false, solved: false, image: './static/puppy1.jpg' },
    { id: 3, value: 2, revealed: false, solved: false, image: './static/puppy2.jpg' },
    { id: 4, value: 2, revealed: false, solved: false, image: './static/puppy2.jpg' },
    { id: 5, value: 3, revealed: false, solved: false, image: './static/puppy3.jpg' },
    { id: 6, value: 3, revealed: false, solved: false, image: './static/puppy3.jpg' },
    { id: 7, value: 4, revealed: false, solved: false, image: './static/puppy4.jpg' },
    { id: 8, value: 4, revealed: false, solved: false, image: './static/puppy4.jpg' },
    { id: 9, value: 5, revealed: false, solved: false, image: './static/puppy5.jpg' },
    { id: 10, value: 5, revealed: false, solved: false, image: './static/puppy5.jpg' },
    { id: 11, value: 6, revealed: false, solved: false, image: './static/puppy6.jpg' },
    { id: 12, value: 6, revealed: false, solved: false, image: './static/puppy6.jpg' },
    { id: 13, value: 7, revealed: false, solved: false, image: './static/puppy7.jpg' },
    { id: 14, value: 7, revealed: false, solved: false, image: './static/puppy7.jpg' },
    { id: 15, value: 8, revealed: false, solved: false, image: './static/puppy8.jpg' },
    { id: 16, value: 8, revealed: false, solved: false, image: './static/puppy8.jpg' }
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
