
import { Buffer } from 'buffer'

// This function is simply to extract the token from the localStorage and return it
export const getTokenFromLocalStorage = () => {
  return window.localStorage.getItem('outsourcd-token')
}

export const getPayload = () => {
  const token = getTokenFromLocalStorage()
  if (!token) return false
  const splitToken = token.split('.')
  if (splitToken.length !== 3) return false
  return JSON.parse(Buffer.from(splitToken[1], 'base64'))
}

export const userIsAuthenticated = () => {
  const payload = getPayload()
  if (!payload) return false
  const currentTime = Math.round(Date.now() / 1000)
  return currentTime < payload.expiry
}