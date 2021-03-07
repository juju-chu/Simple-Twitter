import { apiHelper } from './../utils/helpers'

export default {
  get() {
    return apiHelper.get(`/tweets`)
  },
  getTweet({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}`)
  },
  getTweetReplies({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}/replies`)
  },
  post({ newTweet }) {
    return apiHelper.post(`/tweets`, newTweet)
  },
}
