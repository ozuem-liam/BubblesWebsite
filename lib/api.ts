const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
export const WEB_DOMAIN = process.env.WEB_DOMAIN || 'https://bubblesng.com/'

export const api = {
  async post<T>(endpoint: string, body: any, token?: string): Promise<T> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      }

      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      })

      return response.json()
    } catch (error: any) {
      throw new Error(`API request failed with status ${error.message}`)
    }
  },

  async get<T>(endpoint: string, token?: string): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers,
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    return response.json()
  },

  async patch<T>(endpoint: string, body: any, token?: string): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers: headers,
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    return response.json()
  },

  async put<T>(endpoint: string, body: any, token?: string): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    return response.json()
  },

  async delete<T>(endpoint: string, token?: string): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers,
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    return response.json()
  },
}
