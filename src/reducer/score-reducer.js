import { UPDATE_SCORE } from '../actions/score-actions.js'

const score = (state = '', { type, payload }) => {
  switch (type) {
    case UPDATE_SCORE:
      return payload.score
    default:
      return state
  }
}

export default score
