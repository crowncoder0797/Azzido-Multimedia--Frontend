import axios from 'axios'
import { config } from '../utils/customLocalStorage'
import { apiUrl } from '../constants'

const dynamicAPI = async (method, url, obj = {}) => {
  try {
    switch (method) {
      case 'get':
        return await axios
          .get(`${apiUrl}${url}`, config())
          .then((res) => res.data)

      case 'post':
        return await axios
          .post(`${apiUrl}${url}`, obj, config())
          .then((res) => res.data)

      case 'put':
        return await axios
          .put(`${apiUrl}${url}`, obj, config())
          .then((res) => res.data)

      case 'delete':
        return await axios
          .delete(`${apiUrl}${url}`, config())
          .then((res) => res.data)
    }
  } catch (error) {
    throw error.response.data.error
  }
}

export default dynamicAPI
