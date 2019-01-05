import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import userInfo from './reducer/user-reducer.js'
import score from './reducer/score-reducer.js'
import cards from './reducer/cards-reducer.js'
//combinedReducers sound similar to combineReducers :/
const allreadyCombinedReducers = combineReducers({
  userInfo,
  score,
  cards
})

const store = createStore(allreadyCombinedReducers, {
  userInfo: {
    name: 'exampleName',
    lastName: 'exampleLastName'
  },
  score: {
    currentScore: 0,
    maxScore: 0
  },
  cards: [
    { value: 1, revealed: false, solved: false, image: './static/puppy1.jpg' },
    { value: 1, revealed: false, solved: false, image: './static/puppy1.jpg' },
    { value: 2, revealed: false, solved: false, image: './static/puppy2.jpg' },
    { value: 2, revealed: false, solved: false, image: './static/puppy2.jpg' },
    { value: 3, revealed: false, solved: false, image: './static/puppy3.jpg' },
    { value: 3, revealed: false, solved: false, image: './static/puppy3.jpg' },
    { value: 4, revealed: false, solved: false, image: './static/puppy4.jpg' },
    { value: 4, revealed: false, solved: false, image: './static/puppy4.jpg' },
    { value: 5, revealed: false, solved: false, image: './static/puppy5.jpg' },
    { value: 5, revealed: false, solved: false, image: './static/puppy5.jpg' },
    { value: 6, revealed: false, solved: false, image: './static/puppy6.jpg' },
    { value: 6, revealed: false, solved: false, image: './static/puppy6.jpg' },
    { value: 7, revealed: false, solved: false, image: './static/puppy7.jpg' },
    { value: 7, revealed: false, solved: false, image: './static/puppy7.jpg' },
    { value: 8, revealed: false, solved: false, image: './static/puppy8.jpg' },
    { value: 8, revealed: false, solved: false, image: './static/puppy8.jpg' }
  ]
})

console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

//ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
