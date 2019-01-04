export const UPDATE_SCORE = 'productsReducer:updatePhone'

export function updateScore(newScore) {
  return {
    type: UPDATE_SCORE,
    payload: {
      score: newScore
    }
  }
}
