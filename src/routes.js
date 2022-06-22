import Homepage from "./Pagine/Homepage.vue";
import Info from "./Pagine/Info.vue";
import Contatti from "./Pagine/Contatti.vue";
import Courses from "./Pagine/Courses.vue";
import Course from "./Pagine/Campagna/Campagna.vue";
import Privacy from "./Pagine/Campagna/Privacy.vue";
import Credits from "./Pagine/Credits.vue";
import Login from "./Pagine/Login.vue";
import MyQuizzes from "./Pagine/MyQuizzes.vue"
import Rules from "./Pagine/Campagna/Rules.vue";
import Callback from "./Pagine/Callback.vue";
import Logout from "./Pagine/Logout.vue";
import MyPerformance from "./Pagine/Campagna/MyPerformance.vue";
import Quiz from "./Pagine/Quiz.vue";
import InviaRichiesta from "./Pagine/Campagna/InviaRichiesta.vue"
import store from './store/store'
import AnalyticSwitch from "./Pagine/AnalyticSwitch.vue";
import AnalyticsList from "./Pagine/AnalyticsList.vue";
import GameStatusSwitch from "./Pagine/GameStatusSwitch.vue";
import Challenges from "./Pagine/Challenges.vue";
import History from "./Pagine/History.vue";
import Pendings from "./Pagine/Pendings.vue";
import Pendings1 from "./Pagine/Pendings1.vue";
import Newchallenge from "./Pagine/Newchallenge.vue";
import Createdchallenge from "./Pagine/Createdchallenge";
import Recap from "./Pagine/Recap";

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
    path: '/gameStatus',
    name: 'gameStatus',
    component: GameStatusSwitch,
    props: { category: 1 }
  },
  {
    path: '/learningStatus',
    name: 'learningStatus',
    component: AnalyticsList,
    props: { category: 0 }
  },
  {
    path: '/analytic',
    name: 'analytic',
    component: AnalyticSwitch,
    props: true
  },
  {
    path: '/callback',
    name: 'callback',
    component: Callback
  },
  {
    path: '/quizzes',
    name: 'quizzes',
    component: MyQuizzes
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/challenges',
    name: 'challenges',
    component: Challenges
  },
  {
    path: '/history',
    name: 'history',
    component: History
  },
  {
    path: '/pendings',
    name: 'pendings',
    component: Pendings
  },
  {
    path: '/pendings1',
    name: 'pendings1',
    component: Pendings1
  },
  {
    path: '/newchallenge',
    name: 'newchallenge',
    component: Newchallenge
  },
  {
    path: '/createdchallenge',
    name: 'createdchallenge',
    component: Createdchallenge
  },
  {
    path: '/recap',
    name: 'recap',
    component: Recap
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