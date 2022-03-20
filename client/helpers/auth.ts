import cookie from 'js-cookie'
import Router from 'next/router';

// set in cookie
export const setCookie = (key: string, value: string) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1
    })
  }
}

// remove from cookie
export const removeCookie = (key: string) => {
  if (process.browser) cookie.remove(key)
}

// get from cookie such as stored token
export const getCookie = (key: string) => {
  if (process.browser) cookie.get(key)
}

// set in localstorage
export const setLocalStorage = (key: string, value: string) => {
  if (process.browser) localStorage.setItem(key, JSON.stringify(value))
}

// remove from localStorage
export const removeLocalStorage = (key: string) => {
  if (process.browser) localStorage.removeItem(key)
}

// authenticate
export const authenticate = (response: any, next: () => void) => {
  setCookie('token', response.data.token)
  setLocalStorage('user', response.data.user)
  next()
}

// access user info from localStorage
export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = cookie.get('token')
    if (cookieChecked) {
      if (localStorage.getItem('user')) {
        return JSON.parse(`${localStorage.getItem('user')}`)
      } else {
        return false
      }
    }
  }
}

// logout
export const logout = () => {
  removeCookie('token')
  removeLocalStorage('user')
  Router.push('/login')
}
