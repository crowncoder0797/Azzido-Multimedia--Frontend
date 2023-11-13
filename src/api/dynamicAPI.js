import axios from 'axios'
import { config } from '../utils/customLocalStorage'

const dynamicAPI = async (method, url, obj = {}) => {
  try {
    switch (method) {
      case 'get':
        return await axios
          .get(`${process.env.REACT_APP_BACKEND_URL}${url}`, config())
          .then((res) => res.data)

      case 'post':
        return await axios
          .post(`${process.env.REACT_APP_BACKEND_URL}${url}`, obj, config())
          .then((res) => res.data)

      case 'put':
        return await axios
          .put(`${process.env.REACT_APP_BACKEND_URL}${url}`, obj, config())
          .then((res) => res.data)

      case 'delete':
        return await axios
          .delete(`${process.env.REACT_APP_BACKEND_URL}${url}`, config())
          .then((res) => res.data)
    }
  } catch (error) {
    throw error.response.data.error
  }
}

export default dynamicAPI
