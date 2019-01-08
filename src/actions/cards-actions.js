export const UPDATE_CARDS = 'cards:updateCards'
export const REORDER_CARDS = 'cards:reorderCards'

export function updateCards(newCards) {
  return {
    type: UPDATE_CARDS,
    payload: {
      cards: newCards
    }
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
