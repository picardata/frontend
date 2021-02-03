export default function ({ $axios, $store }) {
  $axios.onRequest((config) => {
    console.log('Setting Token:' + $store.token)
    config.headers.Authorization = 'Bearer ' + $store.token
  })

  $axios.baseURL = process.env.apiUrl
}
