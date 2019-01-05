import { UPDATE_CARDS, REORDER_CARDS } from '../actions/cards-actions.js'

const cards = (state = '', { type, payload }) => {
  switch (type) {
    case UPDATE_CARDS:
      return payload.cards
    case UPDATE_CARDS:
      return payload.cards
    default:
      return state
  }
}

export default cards
