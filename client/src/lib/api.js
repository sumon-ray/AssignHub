import { API_BASE_URL } from "./constants"

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}

const api = async (endpoint, options = {}) => {
  const token = getToken()
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const config = {
    ...options,
    headers,
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config)
    const data = await response.json()

    if (!response.ok) {
      const error = new Error(data.message || "Something went wrong")
      error.status = response.status
      throw error
    }

    return data
  } catch (error) {
    console.error("API call error:", error)
    throw error
  }
}

export default api
