/**** 认证 ****/

import http from '@/utils/http'
export function login (params) {
  return http.postJson('/login', params)
}
