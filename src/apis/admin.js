import { apiHelper } from '../utils/helpers'

export default {
  users: {
    get() {
      return apiHelper.get('admin/users')
    }
  }
}