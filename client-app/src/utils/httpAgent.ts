import axios, { AxiosResponse } from "axios"

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

axios.defaults.baseURL = "http://localhost:5000/api"

axios.interceptors.response.use(async (response) => {
  try {
    await sleep(1000)
    return response
  } catch (error) {
    console.log(error)
    return await Promise.reject(error)
  }
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data

export const HttpAgent = {
  get: async <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: async <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
  put: async <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: async <T>(url: string) => axios.delete<T>(url).then(responseBody),
}
