import Vuex from 'vuex'
import Cookie from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: {
      token: null
    },
    mutations: {
      setToken (state, token) {
        state.token = token
      },
      clearToken (state) {
        state.token = null
      }
    },
    actions: {
      async authenticateUser (vuexContext, authData) {
        const authUrl =
          process.env.apiUrl + '/api/login/'
        if (!authData.isLogin) {
          await this.$axios
            .$post(process.env.apiUrl + '/api/users/', {
              username: authData.email,
              password: authData.password
            })
        }
        return this.$axios
          .$post(authUrl, {
            username: authData.email,
            password: authData.password
          })
          .then((result) => {
            vuexContext.commit('setToken', result.accessToken)
            localStorage.setItem('token', result.accessToken)
            localStorage.setItem(
              'tokenExpiration',
              new Date().getTime() + Number.parseInt(result.accessToken) * 1000
            )
            Cookie.set('jwt', result.accessToken)
            Cookie.set(
              'expirationDate',
              new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
            )
            this.$axios.setToken(result.accessToken, 'Bearer')
          })
      },
      initAuth (vuexContext, req) {
        let token
        let expirationDate
        if (req) {
          if (!req.headers.cookie) {
            return
          }
          const jwtCookie = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('jwt='))
          if (!jwtCookie) {
            return
          }
          token = jwtCookie.split('=')[1]
          expirationDate = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('expirationDate='))
            .split('=')[1]
        } else if (process.client) {
          token = localStorage.getItem('token')
          expirationDate = localStorage.getItem('tokenExpiration')
        }
        if (new Date().getTime() > +expirationDate || !token) {
          vuexContext.dispatch('logout')
          return
        }
        vuexContext.commit('setToken', token)
      },
      logout (vuexContext) {
        vuexContext.commit('clearToken')
        Cookie.remove('jwt')
        Cookie.remove('expirationDate')
        if (process.client) {
          localStorage.removeItem('token')
          localStorage.removeItem('tokenExpiration')
        }
      }
    },
    getters: {
      isAuthenticated (state) {
        return state.token != null
      }
    }
  })
}

export default createStore
