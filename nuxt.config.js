// import colors from 'vuetify/es5/util/colors';
const colors = require('vuetify/es5/util/colors');

let API_URL = '';
let FRONT_URL = '';

if (process.env.NODE_ENV === 'production') {
  API_URL = 'https://api.apuntes.baultix.com';
  FRONT_URL = 'https://apuntes.baultix.com';
} else {
  API_URL = 'http://127.0.0.1:8000';
  FRONT_URL = 'http://localhost:3000';
}

const page = {
  title: 'Apuntus',
  short_name: 'Apuntus',
  description: 'Encontra los mejores apuntes compartido por estudiantes',
  siteName: 'Apuntus',
  safeImg: {
    url: `${FRONT_URL}/images/safe_image.png`,
    alt: 'Image of Apuntus'
  },
  favicon: `${FRONT_URL}/images/apuntus-original.ico`
};

module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  env: {
    FRONT_URL,
    API_URL
  },

  head: {
    title: page.title,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1,  user-scalable=no'
      },
      { hid: 'twitter-card', name: 'twitter:card', content: 'summary' },
      {
        hid: 'og-site_name',
        property: 'og:site_name',
        content: `${page.siteName}`
      },
      { hid: 'og-type', property: 'og:type', content: 'website' },

      {
        hid: 'description',
        name: 'description',
        content: `${page.description}`
      },
      {
        hid: 'og-description',
        property: 'og:description',
        content: `${page.description}`
      },
      {
        hid: 'twitter-title',
        name: 'twitter:title',
        content: `${page.title}`
      },
      { hid: 'og-title', property: 'og:title', content: `${page.title}` },
      {
        hid: 'twitter-image-alt',
        name: 'twitter:image:alt',
        content: `${page.safeImg.alt}`
      },
      {
        hid: 'twitter-image',
        name: 'twitter:image',
        content: `${page.safeImg.url}`
      },
      { hid: 'og-image', property: 'og:image', content: `${page.safeImg.url}` }
    ],

    link: [
      { rel: 'icon', type: 'image/x-icon', href: page.favicon },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/3.8.95/css/materialdesignicons.css'
      }
    ]

    // script: [{ src: 'https://apis.google.com/js/api.js' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/styles.css', 'animate.css', 'filepond/dist/filepond.min.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/vue-components',
    '@/plugins/vuelidate',
    '@/plugins/auth',
    // '@/plugins/fix-vuetify-breakpoints',
    { src: '@/plugins/ga', ssr: false },
    { src: '@/plugins/vue-filepond', ssr: false },
    { src: '@/plugins/scroll-reveal', ssr: false },
    { src: '@/plugins/position', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'cookie-universal-nuxt'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: API_URL
  },

  workbox: {},

  manifest: {
    name: page.title,
    short_name: page.short_name,
    lang: 'en-US',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#2196f3',
    theme_color: '#1769aa'
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['@/assets/variables.scss'],

    theme: {
      themes: {
        light: {
          primary: colors.default.blue.base,
          accent: colors.default.grey.base,
          secondary: colors.default.amber.base,
          info: colors.default.teal.base,
          warning: colors.default.amber.base,
          error: colors.default.red.base,
          success: colors.default.green.base
        },
        dark: {
          primary: colors.default.blue.base,
          accent: colors.default.grey.base,
          secondary: colors.default.amber.base,
          info: colors.default.teal.base,
          warning: colors.default.amber.base,
          error: colors.default.red.base,
          success: colors.default.green.base
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
