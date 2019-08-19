// import colors from 'vuetify/es5/util/colors';
const colors = require('vuetify/es5/util/colors');

let API_URL = '';
let FRONT_URL = '';

if (process.env.NODE_ENV === 'production') {
  API_URL = 'https://api.apuntus.com';
  FRONT_URL = 'https://apuntus.com';
} else {
  API_URL = 'http://127.0.0.1:8000';
  FRONT_URL = 'http://localhost:3000';
}

const page = {
  title: 'Apuntus',
  short_name: 'Apuntus',
  description: '',
  safe_img: `${FRONT_URL}/images/safe_image.png`,
  safe_img_alt: 'Image of Apuntus',
  favicon: `${FRONT_URL}/images/logo_apuntus.ico`
};

module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: page.title,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1,  user-scalable=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: `${page.description}`
      },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: `${page.title}` },
      { name: 'twitter:description', content: `${page.description}` },
      { name: 'twitter:image', content: `${page.safe_img}` },
      { name: 'twitter:image:alt', content: `${page.safe_img_alt}` },

      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: `${page.title}` },
      { property: 'og:image', content: `${page.safe_img}` },
      { property: 'og:site_name', content: `${page.title}` },
      { property: 'og:description', content: `${page.description}` }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: page.favicon },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp'
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/3.8.95/css/materialdesignicons.css'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/styles.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/vue-components',
    '~/plugins/vuelidate',
    '~/plugins/auth'
    // { src: '~/plugins/ga', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: ['@nuxtjs/vuetify'],
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
    background_color: '#fff',
    theme_color: '#64B5F6'
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],

    theme: {
      themes: {
        light: {
          primary: colors.default.blue.darken2,
          accent: colors.default.grey.darken3,
          secondary: colors.default.amber.darken3,
          info: colors.default.teal.lighten1,
          warning: colors.default.amber.base,
          error: colors.default.deepOrange.accent4,
          success: colors.default.green.accent3
        },
        dark: {
          primary: colors.default.blue.darken2,
          accent: colors.default.grey.darken3,
          secondary: colors.default.amber.darken3,
          info: colors.default.teal.lighten1,
          warning: colors.default.amber.base,
          error: colors.default.deepOrange.accent4,
          success: colors.default.green.accent3
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
