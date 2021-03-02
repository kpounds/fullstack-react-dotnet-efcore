import axios, { AxiosResponse } from "axios"

axios.defaults.baseURL = "http://localhost:5000/api"

const responseBody = <T>(response: AxiosResponse<T>) => response.data

export const HttpAgent = {
  get: async <T>(url: string): Promise<T> => axios.get(url).then(responseBody),
  post: async <T>(url: string, body: {}): Promise<T> => axios.post(url, body).then(responseBody),
  put: async <T>(url: string, body: {}): Promise<T> => axios.put(url, body).then(responseBody),
  delete: async <T>(url: string): Promise<T> => axios.delete(url).then(responseBody),
}
