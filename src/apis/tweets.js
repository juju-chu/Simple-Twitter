import { apiHelper } from './../utils/helpers'

export default {
  get() {
    return apiHelper.get(`/tweets`)
  },
  post({ newTweet }) {
    return apiHelper.post(`/tweets`, newTweet)
  },
}
