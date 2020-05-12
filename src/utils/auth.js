import Cookies from 'js-cookie'

const userKey = 'username'
export function getUser () {
  return Cookies.get(userKey)
}

export function setUser (user) {
  return Cookies.set(userKey, user)
}

export function removeUser () {
  return Cookies.remove(userKey)
}
