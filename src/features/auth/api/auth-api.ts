import { instance } from '@/common/api/common.api'
import { ResponseType } from '@/common/types/common.types'
import { AuthParamsType } from '@/features/auth/api/auth-api.types'

export const authAPI = {
  login(data: AuthParamsType) {
    return instance.post<ResponseType<{ userId?: number }>>('auth/login', data)
  },
  logout() {
    return instance.delete<ResponseType>('auth/login')
  },
  me() {
    return instance.get<ResponseType<{ email: string; id: number; login: string }>>('auth/me')
  },
}
