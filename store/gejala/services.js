import axios from 'axios'
import { baseUrl, getItem } from '../../constants/utils'

export const getGejala = async () => {
  const token = await getItem('token')
  try {
    const response = await axios.get(`${baseUrl}/symptoms/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
  } catch (error) {
    const err = error.response ? error.response : error
    return Promise.reject(err)
  }
}
