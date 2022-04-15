

import Homepage from "./Pagine/Homepage.vue";
import Info from "./Pagine/Info.vue";
import Contatti from "./Pagine/Contatti.vue";
import Courses from "./Pagine/Courses.vue";
import Course from "./Pagine/Campagna/Campagna.vue";
import Privacy from "./Pagine/Campagna/Privacy.vue";
import Credits from "./Pagine/Credits.vue";
import Login from "./Pagine/Login.vue";
import Stats from "./Pagine/Stats.vue";
import Rules from "./Pagine/Campagna/Rules.vue";
import Callback from "./Pagine/Callback.vue";
import Logout from "./Pagine/Logout.vue";
import MyPerformance from "./Pagine/Campagna/MyPerformance.vue";
import Quiz from "./Pagine/Quiz.vue";
import InviaRichiesta from "./Pagine/Campagna/InviaRichiesta.vue"
import store from './store/store'
import AllAnalytics from "./Pagine/AllAnalytics.vue";
import Analytic from "./Pagine/Analytic.vue";

const routes = [
  {
    path: '/',
    name: 'homepage',
    component: Homepage
  },
  {
    path: '/info',
    name: 'info',
    component: Info
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: Quiz
  },
  {
    path: '/contatti',
    name: 'contatti',
    component: Contatti
  },
  {
    path: '/credits',
    name: 'credits',
    component: Credits
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/courses',
    name: 'courses',
    component: Courses,
    // beforeEnter (to, from, next) {
    // if (store.getters.isAuthenticated) {
    // next()
    //} else {
    //  next('/')
    // }
    // }
  },
  {
    path: '/stats',
    name: 'stats',
    component: Stats
  },
  {
    path: '/analytics',
    name: 'analytics',
    component: AllAnalytics,
    /*beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        next()
      } else {
        next('/')
      }
    }*/
  },
  {
    path: '/analytic',
    name: 'analytic',
    component: Analytic,
    props: true
  },
  {
    path: '/callback',
    name: 'callback',
    component: Callback
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/course/:id',
    name: 'course',
    component: Course,
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/la-mia-performance/:id',
    name: 'myperformance',
    component: MyPerformance,
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/rules/:id',
    name: 'rules',
    component: Rules,
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/send-request/:id',
    name: 'sendrequest',
    component: InviaRichiesta,
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/privacy/:id',
    name: 'privacy',
    component: Privacy,
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        next()
      } else {
        next('/')
      }
    }
  }

];

export default routes;