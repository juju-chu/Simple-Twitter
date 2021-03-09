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
    return apiHelper.post(`/tweets`, { description: newTweet })
  },
  addLike({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/like`, null)
  },
  deleteLike({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/unlike`, null)
  },
  reply({ id, comment }) {
    return apiHelper.post(`/tweets/${id}/replies`, { comment })
  }
}
