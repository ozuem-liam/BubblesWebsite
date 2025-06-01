'use client'

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { useRouter } from 'nextjs-toploader/app'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'
import { Account, authService, UserData } from '../lib/auth'

interface AuthContextType {
  user: Account | null
  token: string | null
  login: (user: UserData) => void
  logout: () => void
  isAuthenticated: boolean
  loading: boolean
  // refreshToken: () => Promise<void>;
}

// Cookie-only token storage utility
const tokenStorage = {
  get: (): string | null => {
    return Cookies.get('token') || null
  },

  set: (token: string): void => {
    Cookies.set('token', token, {
      expires: 4 / 24, // 4 hours
      path: '/',
      sameSite: 'strict',
      secure: window.location.protocol === 'https:',
    })
  },

  remove: (): void => {
    Cookies.remove('token', { path: '/' })
  },

  isTokenExpired: (token: string): boolean => {
    try {
      const decoded = jwtDecode<{ exp: number }>(token)
      return decoded.exp * 1000 < Date.now()
    } catch {
      return true
    }
  },
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Account | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = tokenStorage.get()

      if (storedToken) {
        // Check if token is expired
        if (tokenStorage.isTokenExpired(storedToken)) {
          tokenStorage.remove()
          setLoading(false)
          return
        }

        try {
          const response = await authService.getProfileData(storedToken)

          if (response.code === 200 && response.data?.account) {
            setUser(response.data.account)
            setToken(storedToken)
          } else {
            // Invalid token response
            tokenStorage.remove()
          }
        } catch (error) {
          console.error('Auth initialization error:', error)
          tokenStorage.remove()
        }
      }

      setLoading(false)
    }

    initializeAuth()
  }, [])

  // Auto-logout on token expiration
  useEffect(() => {
    if (!token) return

    const checkTokenExpiry = () => {
      if (tokenStorage.isTokenExpired(token)) {
        logout()
      }
    }

    // Check every minute
    const interval = setInterval(checkTokenExpiry, 60000)
    return () => clearInterval(interval)
  }, [token])

  const login = async (userData: UserData) => {
    try {
      tokenStorage.set(userData.token)

      const response = await authService.getProfileData(userData.token)

      if (response.code === 200 && response.data?.account) {
        setUser(response.data.account)
        setToken(userData.token)
        return true
      } else {
        tokenStorage.remove()
        throw new Error('Invalid user data received')
      }
    } catch (error) {
      tokenStorage.remove()
      throw error
    }
  }

  const logout = () => {
    tokenStorage.remove()
    setUser(null)
    setToken(null)
    router.push('/')
  }

  // const refreshToken = async () => {
  //   const currentToken = tokenStorage.get();
  //   if (!currentToken) {
  //     logout();
  //     return;
  //   }

  //   try {
  //     // Assuming you have a refresh endpoint
  //     const response = await authService.refreshToken(currentToken);

  //     if (response.code === 200 && response.data?.token) {
  //       tokenStorage.set(response.data.token);
  //       setToken(response.data.token);
  //     } else {
  //       logout();
  //     }
  //   } catch (error) {
  //     console.error('Token refresh failed:', error);
  //     logout();
  //   }
  // };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        // refreshToken,
        isAuthenticated: !!user && !!token,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
