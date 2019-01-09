import { UPDATE_CARDS, REORDER_CARDS } from '../actions/cards-actions.js'
const cards = (state = '', { type, payload }) => {
  switch (type) {
    case UPDATE_CARDS:
      return payload.cards
    case REORDER_CARDS:
      return payload.cards.sort((a, b) => {
        return 0.5 - Math.random()
      })
    default:
      return state
  }
}
export default cards
