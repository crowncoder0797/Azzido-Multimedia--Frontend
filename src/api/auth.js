import dynamicAPI from './dynamicAPI'
import { useMutation, useQueryClient } from 'react-query'
import useAuth from '../hooks/useAuth'

const url = '/api/auth'

const useAuthHook = () => {
  const { setAuth } = useAuth()
  const queryClient = useQueryClient()
  const postLogin = useMutation(
    async (obj) => await dynamicAPI('post', `${url}/login`, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries(['login']),
    }
  )

  const postRegister = useMutation(
    async (obj) => await dynamicAPI('post', `${url}/register`, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries(['register']),
    }
  )

  const postLogout = () => {
    setAuth(null)
    localStorage.removeItem('userRole')
    return localStorage.removeItem('userInfo')
  }

  const postForgotPassword = useMutation(
    async (obj) => await dynamicAPI('post', `${url}/forgot-password`, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries(['forgot password']),
    }
  )

  const postResetPassword = useMutation(
    async (obj) => await dynamicAPI('post', `${url}/reset-password`, obj),
    {
      retry: 0,
      onSuccess: () => queryClient.invalidateQueries(['reset password']),
    }
  )

  return { postLogin, postRegister, postLogout, postForgotPassword, postResetPassword }
}

export default useAuthHook
