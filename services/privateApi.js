import axios from 'axios'
import { useRouter } from 'next/router';
import { getToken, destroyToken } from './auth/token'

class privateApi {
  

  constructor() {
    // axios.defaults.baseURL = 'http://52.68.248.212:8001/api/'
    axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`
    axios.defaults.headers.common['Accept'] = `application/json`
  }

  async check(slug = '')  {

    const router = useRouter();

    axios.post(`${slug}`)
          .then((res) => {
            if(res.data.data.redirect) router.push('/auth/otp')
          })
          .catch((err) => {
            // return err.response.data.errors;
            console.log(err)
          });
  }

  async get(slug = '') {
    try {
      const response = await axios.get(`${slug}`)

      return response
    } catch (error) {
      if (error.response.status == 401) {
        destroyToken()
      }

      return error.response
    }
  }

  async post(slug, params)  {
    try {
      const response = await axios.post(`${slug}`, params)

      console.log('post res', response)

      return response
    } catch (error) {
      if (error.response.status == 401) {
        destroyToken()
      }

      return error.response
    }
  }

  async update(slug, params) {
    try {
      const response = await axios.put(`${slug}`, params)

      return response
    } catch (error) {
      if (error.response.status == 401) {
        destroyToken()
      }

      return error.response
    }
  }

  async delete(slug) {
    try {
      const response = await axios.delete(`${slug}`)

      return response
    } catch (error) {
      if (error.response.status == 401) {
        destroyToken()
      }

      return error.response
    }
  }
}

export default new privateApi()
