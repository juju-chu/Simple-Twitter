import { apiHelper } from '../utils/helpers'

export default {
  signIn ({ email, password }) {
    return apiHelper.post('/users/signin', { email, password })
  }
}