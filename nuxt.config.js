require('dotenv').config()
export default {
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'stylesheet', type: 'text/css', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Poppins' },
      { rel: 'icon', type: 'image/png', href: 'favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700' },
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.6.3/css/all.css', integrity: 'sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/', crossorigin: 'anonymous' }
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js' },
      { src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js' },
      { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.1/Chart.min.js' },
      { src: 'https://unpkg.com/vue-chartjs/dist/vue-chartjs.min.js' }
    ]
  },

  loading: { color: '#fff' },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'assets/css/nucleo/css/nucleo.css',
    'assets/sass/argon.scss',
    'assets/css/picardata-icon.css',
    'assets/css/picardata-icon2.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~plugins/vee-validate.js',
    '~plugins/vue-js-modal.js',
    '~plugins/truncate.js',
    '~/plugins/dashboard/dashboard-plugin',
    { src: '~/plugins/dashboard/full-calendar', ssr: false },
    { src: '~/plugins/dashboard/world-map', ssr: false }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/moment',
    '@nuxtjs/fontawesome'
  ],

  fontawesome: {
    icons: {
      solid: true,
      brands: true
    }
  },
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/style-resources',
    'nuxt-stripe-module'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
  },
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },
  styleResources: {
    scss: '@/assets/scss/_variables.scss'
  },
  publicRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL || 'http://api.local.picardata.com',
      browserBaseURL: process.env.BASE_URL || 'http://api.local.picardata.com'
    },
    stripe: {
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_51IuaxHGpyuP14g89LB1U1V4CNGsz8JteNvEoqSohLLffRo32zjrH2qYbKsxRAq2Z0LXth3JZY5lUyA6bvkI2RfoQ002aFkcfVb'
    }
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ['vee-validate/dist/rules'],
    /*
    ** You can extend webpack config here
    */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    extend (config, ctx) {

    },
    extractCSS: process.env.NODE_ENV === 'production',
    babel: {
      compact: true,
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk'
          }
        ]
      ]
    }
  },
  env: {
    apiUrl: process.env.BASE_URL || 'http://api.local.picardata.com'
  },
  router: {
    middleware: ['auth']
  },
  auth: {
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/books'
    },
    strategies: {
      local: {
        token: {
          property: 'token',
          required: true
        },
        user: {
          property: 'user',
          autoFetch: true
        },
        endpoints: {
          login: { url: '/api/login', method: 'post', propertyName: 'token' },
          logout: { url: '/api/logout', method: 'post' },
          user: { url: '/api/users/me', method: 'get' }
        }
      }
    }
  }
}
