export const UPDATE_CARDS = 'cardsReducer:updateCards'
export const REORDER_CARDS = 'cardsReducer:reorderCards'

export function updateCards(newCards) {
  return {
    type: UPDATE_CARDS,
    payload: {
      cards: newCards
    }
  }
}
export function reorderCards(newCards) {
  return {
    type: REORDER_CARDS,
    payload: {
      cards: newCards.sort((a, b) => {
        return 0.5 - Math.random()
      })
    }
  }
}
