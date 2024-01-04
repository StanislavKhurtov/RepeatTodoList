import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  headers: {
    'API-KEY': '407432d0-8fb3-48b8-9578-523f43ccc02f',
  },
  withCredentials: true,
})
