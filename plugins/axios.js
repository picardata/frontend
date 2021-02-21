export default function ({ $axios, $store }) {
  $axios.onRequest((config) => {
    config.headers.Authorization = 'Bearer ' + $store.token
  })

  $axios.baseURL = process.env.apiUrl
}
