import { apiHelper } from './../utils/helpers'

export default {
  get({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
  getUsersTweets({ userId }) {
    return apiHelper.get(`/users/${userId}/tweets`)
  },
  getUsersRepliedTweets({ userId }) {
    return apiHelper.get(`/users/${userId}/replied_tweets`)
  },
  getUsersLikes({ userId }) {
    return apiHelper.get(`/users/${userId}/likes`)
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
  getFollowings({ userId }) {
    return apiHelper.get(`/users/${userId}/followings`)
  },
  getFollowers({ userId }) {
    return apiHelper.get(`/users/${userId}/followers`)
  },
}
