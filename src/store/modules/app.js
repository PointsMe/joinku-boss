import Cookies from 'js-cookie'

const app = {
  state: {
    // 中英文
    language: Cookies.get('language') || 'zh',
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    businesessList: {},
    // 选中的商家的id
    currentOrgId: '',
    selYear: '',
    nickname: ''
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    // 中英文
    SET_LANGUAGE: (state, language) => {
      state.language = language;
      Cookies.set('language', language);
    },
    SET_BUSINESSESS_LIST: (state, data) => {
      state.businesessList = data;
    },
    SET_SELECTED_BUSSINESS_ID: (state, data) => {
      state.currentOrgId = localStorage.getItem('selBusId');
    },
    SET_APP_SELECCTED_YEAR: (state, data) => {
      state.selYear = localStorage.getItem('selYear');
    },
    SET_LOGIN_USER_OWER_NICK_NAME: (state, data) => {
      state.nickname = data
    }
  },
  actions: {
    ToggleSideBar: ({
      commit
    }) => {
      commit('TOGGLE_SIDEBAR')
    },
    // 中英文
    setLanguage({
      commit
    }, language) {
      commit('SET_LANGUAGE', language)
    },
    setSelYear({
      commit
    }, year) {
      commit('SET_APP_SELECCTED_YEAR', year)
    }
  }
};

export default app;