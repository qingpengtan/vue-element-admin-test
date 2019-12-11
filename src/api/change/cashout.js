import request from '@/utils/request'

export default {
    cashOutList(params) {
      return request({
        url: '/money/money_withdraw',
        method: 'get',
        params
      })
    },

}