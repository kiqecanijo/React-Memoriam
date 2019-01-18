export const UPDATE_CARDS = 'cards:updateCards'
export const REORDER_CARDS = 'cards:reorderCards'
export const FLIP_CARDS = 'cards:flipCards'
export const HIDE_CARDS = 'cards:hideCards'
export const SHOW_CARDS = 'cards:showCards'
export const SET_CARDS = 'cards:setCards'

export function updateCards(cards, index) {
  return {
    type: UPDATE_CARDS,
    payload: { cards, index }
  }
}
export function setCards(cards) {
  return {
    type: SET_CARDS,
    payload: { cards }
  }
}

export function flipCards(cards, index) {
  return {
    type: FLIP_CARDS,
    payload: { cards, index }
  }
}
export function hideCards(cards, index) {
  return {
    type: HIDE_CARDS,
    payload: { cards }
  }
}
export function showCards(cards, index) {
  return {
    type: SHOW_CARDS,
    payload: { cards }
  }
}
export function reorderCards(cards) {
  return {
    type: REORDER_CARDS,
    payload: {
      cards: cards
    }
  }
}
