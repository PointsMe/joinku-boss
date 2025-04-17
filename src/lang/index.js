import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import elementItLocale from 'element-ui/lib/locale/lang/it'
import elementFrLocale from 'element-ui/lib/locale/lang/fr';
import elementDeLocale from 'element-ui/lib/locale/lang/de';
import elementEsLocale from 'element-ui/lib/locale/lang/es';
import enLocale from './en'
import zhLocale from './zh'
import itLocale from './it'
import frLocale from './fr';
import deLocale from './de';
import esLocale from './es';

Vue.use(VueI18n)

const messages = {
  'en-US': {
    ...enLocale,
    ...elementEnLocale
  },
  'zh-CN': {
    ...zhLocale,
    ...elementZhLocale
  },
  'it': {
    ...itLocale,
    ...elementItLocale
  },
  'fr': {
      ...frLocale,
      ...elementFrLocale
  },
  'de': {
      ...deLocale,
      ...elementDeLocale
  },
  'es': {
      ...esLocale,
      ...elementEsLocale
  }
}

const i18n = new VueI18n({
  locale: localStorage.getItem('DefaultLanguage') || 'zh-CN', // set locale
  messages // set locale messages
})
localStorage.setItem('DefaultLanguage',localStorage.getItem('DefaultLanguage') || 'zh-CN');//进来页面存储对应语言

export default i18n

