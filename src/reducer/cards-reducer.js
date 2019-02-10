import { UPDATE_CARDS, REORDER_CARDS, FLIP_CARDS, HIDE_CARDS, SHOW_CARDS, SET_CARDS } from '../actions/cards-actions.js'
import openSocket from 'socket.io-client'
let socket = openSocket('http://localhost:3001')

const cards = (state = '', { type, payload }) => {
  switch (type) {
    case SET_CARDS:
      return payload.cards

    case UPDATE_CARDS:
      let updated = payload.cards
      // TODO improve this
      const solved =
        updated.filter(el => el.flipped).length >= 2 &&
        !updated.filter(el => el.flipped).reduce((acc, current) => {
          const result = acc !== current.path ? current.path : false
          return result
        }, false)
          ? true
          : false || false

      solved && (updated = updated.map(el => (el.flipped ? { ...el, solved: true } : el)))

      payload.cards.filter(el => el.flipped).length > 1 && (updated = updated.map(el => ({ ...el, flipped: false })))

      updated[payload.index] = { ...updated[payload.index], flipped: !updated[payload.index].flipped }
      socket.emit('update cards', updated)
      return updated

    case FLIP_CARDS:
      let flipped = payload.cards
      flipped = flipped.map(el => {
        return { ...el, flipped: !el.flipped }
      })
      socket.emit('update cards', flipped)
      return flipped

    case HIDE_CARDS:
      let hiden = payload.cards
      hiden = hiden.map(el => {
        return { ...el, flipped: false }
      })
      socket.emit('update cards', hiden)

      return hiden
    case SHOW_CARDS:
      let showed = payload.cards
      showed = showed.map(el => {
        return { ...el, flipped: true }
      })
      socket.emit('update cards', showed)

      return showed
    case REORDER_CARDS:
      const reordered = payload.cards.sort((a, b) => {
        return 0.5 - Math.random()
      })
      socket.emit('update cards', reordered)
      return reordered
    default:
      return state
  }
}
export default cards
