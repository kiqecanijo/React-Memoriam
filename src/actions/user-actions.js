export const UPDATE_USER = 'user:updateUser'
export const RENAME_USER = 'user:renameUser'
export const ADD_CHAT = 'user:addUser'

export function updateUserInfo(newUserInfo) {
  return {
    type: UPDATE_USER,
    payload: {
      userInfo: newUserInfo
    }
  }
}
export function renameUser(newName, userInfo) {
  return {
    type: UPDATE_USER,
    payload: { newName, userInfo }
  }
}
export function addChat(message, userInfo) {
  return {
    type: ADD_CHAT,
    payload: { message, userInfo }
  }
}
