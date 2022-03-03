import { createContext } from 'react'

const AuthContext = createContext({
  isAuthenticated: false
})

export function AuthProvider({ children }) {
  return (
    <AuthContext.Provider value={{ isAuthenticated: true }}>
      {children}
    </AuthContext.Provider>
  )
}