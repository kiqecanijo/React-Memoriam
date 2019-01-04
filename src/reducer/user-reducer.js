import { UPDATE_USER } from ''

const userInfoReducer = (state = '', { type, payload }) => {
  switch (type) {
    case UPDATE_USER:
      return payload.userInfo
    default:
      return state
  }
}

export default userInfoReducer
