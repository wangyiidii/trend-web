/**趋势投资 模拟回测 */
import http from '@/utils/http'

/**获取指数 */
export function getIndexs () {
  return http.get('/trend/indexs', '')
}

/**获取指数数据 */
export function getIndexData (url, params) {
  return http.get(url, params)
}

