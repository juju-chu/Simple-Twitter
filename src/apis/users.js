import { apiHelper } from './../utils/helpers'

export default {
  get({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
  getUsersTweets({ userId }) {
    return apiHelper.get(`/users/${userId}/tweets`)
  },
  getCurrentUser() {
    return apiHelper.get('/users/currentUser')
  },
  updateUser({ id, account, name, email, password, checkPassword }) {
    return apiHelper.put(`users/${id}`, {
      account,
      name,
      email,
      password,
      checkPassword,
    })
  },
  editInfo({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, formData)
  },
}
