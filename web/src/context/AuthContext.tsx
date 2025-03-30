import React, { createContext, useState, useContext, ReactNode } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  token: string | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)



export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"))
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token)

  const login = (token: string) => {
    localStorage.setItem("token",`Bearer ${token}` )
    setToken(token)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
