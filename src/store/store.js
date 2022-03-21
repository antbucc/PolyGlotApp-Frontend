import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    idToken: null,
    user: null,
    campagna: null,
    courses: [],
    page: null
  },
  mutations: {
    initApp(state) {

      state.idToken = null;
      state.user = null;
      state.campagna = null;
    },
    authUser(state, userData) {
      state.idToken = userData.token
    },
    storeUser(state, user) {
      state.user = user
    },
    clearAuthData(state) {
      state.idToken = null
    },
    storeCourse(state, course) {
      state.courses.push(course);
    },
    storeCourses(state, courses) {
      state.courses.push(courses);
    },


    storeCampagna(state, campagna) {

      state.campagna = campagna
    },
    exitCampagna(state) {
      state.campagna = null
    },
    storePage(state, page) {
      state.page = page
    },
    resetPage(state) {
      state.page = null
    }

  },
  actions: {
    initApp({ commit }) {
      commit('initApp')

    },
    storeCampagna({ commit }, campagna) {
      commit('storeCampagna', campagna)
    },
    storeCourse({ commit }, course) {
      commit('storeCourse', course)
    },
    storeCourses({ commit }, courses) {
      commit('storeCourses', courses)
    },
    exitCampagna({ commit }) {
      commit('exitCampagna')
    },
    storePage({ commit }, page) {
      commit('storePage', page)
    },

    resetPage({ commit }) {
      commit('resetPage')
    },
    setLogoutTimer({ commit }, expirationTime) {
      setTimeout(() => {
        commit('clearAuthData')
      }, expirationTime * 1000)
    },

    storeUser({ commit }, user) {
      sessionStorage.setItem('player', user.user)
      commit('storeUser', {
        player : user.user
      })
    },

    loginWithToken({ commit }, dataToken) {
      sessionStorage.setItem('token', dataToken.idToken)
      commit('authUser', {
        token: dataToken.idToken
      })
    },
    login({ commit }, authData) {
      sessionStorage.setItem('token', authData.idToken)
      commit('authUser', {
        token: authData.idToken
      })
    },
    tryAutoLogin({ commit }) {
      const token = sessionStorage.getItem('token')
      if (!token) {
        return false
      }

      commit('authUser', {
        token: token
      })
      return true
    },
    logout({ commit }) {
      commit('clearAuthData');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('courses');
    },
  },
  getters: {
    user: state => {
      return state.user
    },
    isAuthenticated: state => {
      return state.idToken !== null
    },
    campagna: state => {
      return state.campagna
    },
    courses: state => {
      return state.courses
    },
    page: state => {
      return state.page
    }
  }
})