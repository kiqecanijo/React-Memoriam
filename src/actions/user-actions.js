export const UPDATE_USER = 'userReducer:updateUser'

export function updateUserInfo(newUserInfo) {
  return {
    type: UPDATE_USER,
    payload: {
      userInfo: newUserInfo
    }
  }
}
