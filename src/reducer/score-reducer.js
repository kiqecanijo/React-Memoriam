import { UPDATE_SCORE } from ''

const scoreReducer = (state = '', { type, payload }) => {
  switch (type) {
    case UPDATE_SCORE:
      return payload.score
    default:
      return state
  }
}

export default scoreReducer
