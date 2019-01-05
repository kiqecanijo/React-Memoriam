import { UPDATE_USER } from '../actions/user-actions.js'

const userInfo = (state = '', { type, payload }) => {
  switch (type) {
    case UPDATE_USER:
      return payload.userInfo
    default:
      return state
  }
}

export default userInfo
