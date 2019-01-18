import { UPDATE_USER, ADD_CHAT } from '../actions/user-actions.js'

const userInfo = (state = '', { type, payload }) => {
  switch (type) {
    case UPDATE_USER:
      return { ...payload.userInfo, name: payload.newName }
    case ADD_CHAT:
      return { ...payload.userInfo, chat: [...payload.userInfo.chat, payload.message] }
    default:
      return state
  }
}

export default userInfo
