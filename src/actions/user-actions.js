export const UPDATE_USER = 'user:updateUser'
export const RENAME_USER = 'user:V'

export function updateUserInfo(newUserInfo) {
  return {
    type: UPDATE_USER,
    payload: {
      userInfo: newUserInfo
    }
  }
}
export function renameUser(newName) {
  return {
    type: UPDATE_USER,
    payload: {
      userInfo: {
        name: newName
      }
    }
  }
}
