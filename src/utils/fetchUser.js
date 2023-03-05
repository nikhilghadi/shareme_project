export const fetchUser = () => {
  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user') ) : localStorage.clear()
  return userInfo
}
export const fetchCurrentUser = () => {
  const userInfo = localStorage.getItem('current_user') !== 'undefined' ? JSON.parse(localStorage.getItem('current_user') ) : localStorage.clear()
  return userInfo
}