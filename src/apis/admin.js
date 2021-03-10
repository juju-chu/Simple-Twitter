import { apiHelper } from '../utils/helpers'

export default {
  users: {
    get() {
      return apiHelper.get('admin/users')
    },
  },
  tweets: {
    get() {
      return apiHelper.get('/admin/tweets')
    },
  },
}
