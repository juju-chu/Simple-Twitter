import { apiHelper } from './../utils/helpers'

export default {
  get ({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
  updateUser ({ id, account, name, email, password, checkPassword }) {
    return apiHelper.put(`users/${id}`, { account, name, email, password, checkPassword })
  }
}
