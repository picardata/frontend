export default {
  created () {
    this.$axios.interceptors.request.use(
      (config) => {
        this.$store.commit('loader/loading', true)
        console.log(config)
        return config
      },
      (error) => {
        this.$store.commit('loader/loading', false)
        return Promise.reject(error)
      }
    )

    this.$axios.interceptors.response.use(
      (response) => {
        this.$store.commit('loader/loading', false)
        console.log(response)
        return response
      },
      (error) => {
        this.$store.commit('loader/loading', false)
        return Promise.reject(error)
      }
    )
  }
}
