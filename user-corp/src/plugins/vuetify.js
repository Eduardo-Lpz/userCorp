import Vue from 'vue';
import Vuetify from 'vuetify/lib';//framework
import '@mdi/font/css/materialdesignicons.css';
import { es, en } from 'vuetify/es5/locale';


Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        base: '#fc0845',
        primary: '#15202b',
        secondary: '#1fa2f2',
        tertiary: '#1a344a',
        accent: '#ffffff',
        info: '#90aecf',
        success: '#4CAF50',
        error: '#FF5252',
        warning: '#FFC107',
      },
      dark: {
        primary: '#fc0845',
        secondary: '#fc0845',
        tertiary: '#fc0845',
        accent: '#fc0845',
        info: '#fc0845',
        success: '#fc0845',
        error: '#fc0845',
        warning: '#fc0845',
      },
    },
  },
    lang: {
      locales: { es, en },
      current: 'en',
    },
  icons: {
    iconfont: 'mdi',
  },
});