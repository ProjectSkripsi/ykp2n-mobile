import axios from 'axios'
import { baseUrl } from '../../constants/utils'

export const loginService = async (email, password) => {
  try {
    const response = await axios.post(`${baseUrl}/user/login`, {
      email,
      password,
    })

    return response
  } catch (error) {
    const err = error.response ? error.response : error
    return Promise.reject(err)
  }
}
