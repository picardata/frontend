export default {
  created () {
    this.$axios.interceptors.request.use(
      (config) => {
        const loader = config.loader === undefined ? true : config.loader
        this.$store.commit('loader/loading', loader)
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
        return response
      },
      (error) => {
        this.$store.commit('loader/loading', false)
        return Promise.reject(error)
      }
    )
  }
}
