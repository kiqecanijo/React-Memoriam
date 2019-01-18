import { UPDATE_CARDS, REORDER_CARDS, FLIP_CARDS, HIDE_CARDS, SHOW_CARDS } from '../actions/cards-actions.js'
const cards = (state = '', { type, payload }) => {
  switch (type) {
    case UPDATE_CARDS:
      let updated = payload.cards
      //Switch comments to alternate flip on click
      updated[payload.index] = { ...updated[payload.index], flipped: !updated[payload.index].flipped }
      //updated[payload.index] = { ...updated[payload.index], flipped: true }
      return updated
    case FLIP_CARDS:
      let flipped = payload.cards
      flipped = flipped.map(el => {
        return { ...el, flipped: !el.flipped }
      })
      return flipped
    case HIDE_CARDS:
      let hiden = payload.cards
      hiden = hiden.map(el => {
        return { ...el, flipped: false }
      })
      return hiden
    case SHOW_CARDS:
      let showed = payload.cards
      showed = showed.map(el => {
        return { ...el, flipped: true }
      })
      return showed
    case REORDER_CARDS:
      return payload.cards.sort((a, b) => {
        return 0.5 - Math.random()
      })
    default:
      return state
  }
}
export default cards
