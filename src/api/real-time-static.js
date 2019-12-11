import request from '@/utils/request'

export default {
    realTimeStatic(params) {
        return request({
          url: '/data/realtime_data',
          method: 'get',
          params
        })
      }
}