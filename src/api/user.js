import request from '@/utils/request'

export default {
    Login(data) {
        return request({
          url: '/base/login',
          method: 'post',
          data
        })
      }
}