<template>
  <div>
    <nav
      class="
        visible
        lg:invisible
        flex
        fixed
        w-full
        items-center
        justify-between
        px-6
        h-16
        bg-primary
        text-white text-gray-700
        z-10
      "
    >
      <div class="flex items-center" v-if="page && page.back == false">
        <button class="mr-2" aria-label="Open Menu" @click="drawer">
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="w-8 h-8"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <img
          src="@/assets/images/logopolyglot.png"
          alt="Logo"
          class="h-auto w-12"
          @click="$router.push('/')"
        />
      </div>
      <div class="flex items-center" v-if="page && page.back == true">
        <button class="mr-2" aria-label="Open Menu" @click="backPage">
          <!-- <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            class="w-8 h-8"
          >
            <path d="M15 8.25H5.87l4.19-4.19L9 3 3 9l6 6 1.06-1.06-4.19-4.19H15v-1.5z"></path>
          </svg> -->
          <back-icon />
        </button>
        <img
          src="@/assets/images/logopolyglot.png"
          alt="Logo"
          class="h-auto w-12"
          @click="$router.push('/')"
        />
      </div>
      <div class="flex items-center" v-if="page">
        <span class="text-xl">{{ page.title }}</span>
      </div>
      <div class="flex items-center">
        <div
          class="hidden md:block md:flex md:justify-between md:bg-transparent"
        >
        <!--
          <router-link to="/" v-on:click.native="onLogout" v-if="auth">
            <span
              @
              class="flex items-center p-4 hover:bg-white hover:text-primary"
              ><span class="mr-2">
                <logout-icon />
              </span>
              <span>Exit</span></span
            >
          </router-link>
          -->
        </div>
      </div>

      <!-- queste sono quelle del menu a tendina via cell -->
      <transition
        enter-class="opacity-0"
        enter-active-class="ease-out transition-medium"
        enter-to-class="opacity-100"
        leave-class="opacity-100"
        leave-active-class="ease-out transition-medium"
        leave-to-class="opacity-0"
      >
        <div
          @keydown.esc="isOpen = false"
          v-show="isOpen"
          class="z-10 fixed inset-0 transition-opacity"
        >
          <div
            @click="isOpen = false"
            class="absolute inset-0 bg-black opacity-50"
            tabindex="0"
          ></div>
        </div>
      </transition>
      <aside
        class="
          shadow-xl
          transform
          top-0
          left-0
          w-64
          bg-primary
          text-white
          fixed
          h-full
          overflow-auto
          ease-in-out
          transition-all
          duration-300
          z-30
        "
        :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
      >
        <span
          @click="isOpen = false"
          class="flex w-full items-center p-4 border-b"
        >
          <img
            src="@/assets/images/logopolyglot.png"
            alt="Logo"
            @click="$router.push('/')"
            class="h-auto w-32 mx-auto"
          />
        </span>
        <div v-if="!campagna">
          <router-link to="/login" v-if="!auth">
            <span
              @click="isOpen = false"
              class="flex items-center p-4 hover:bg-white hover:text-primary"
              :class="{ active: page && page.title === 'Login' }"
              ><span class="mr-2">
                <login-icon />
              </span>
              <span>Login</span></span
            >
          </router-link>

          <router-link to="/courses" v-if="auth">
            <span
              @click="isOpen = false"
              class="flex items-center p-4 hover:bg-white hover:text-primary"
              :class="{ active: page && page.title === 'Courses' }"
              ><span class="mr-2">
                <list-campaigns-icon />
              </span>
              <span>Courses</span></span
            >
          </router-link>

          <router-link to="/quizzes" v-if="auth">
            <span
              @click="isOpen = false"
              class="flex items-center p-4 hover:bg-white hover:text-primary"
              :class="{ active: page && page.title === 'MyQuizzes' }"
              ><span class="mr-2">
                <question-icon />
              </span>
              <span>My Quizzes</span></span
            >
          </router-link>
          <!--<router-link to="/analytics" v-if="auth">
            <span
              @click="isOpen = false"
              class="flex items-center p-4 hover:bg-white hover:text-primary"
              :class="{ active: page && page.title === 'Analytics' }"
              ><span class="mr-2">
                <analytics-icon />
              </span>
              <span>Analytics</span></span
            >
          </router-link>-->
          <router-link to="/info">
            <span
              @click="isOpen = false"
              class="flex items-center p-4 hover:bg-white hover:text-primary"
              :class="{ active: page && page.title === 'Info' }"
              ><span class="mr-2">
                <info-outline-icon />
              </span>
              <span>Info</span></span
            ></router-link
          >
          <router-link to="/contatti">
            <span
              @click="isOpen = false"
              :class="{ active: page && page.title === 'Contacts' }"
              class="flex items-center p-4 hover:bg-white hover:text-primary"
            >
              <span class="mr-2">
                <pencil-outline-icon />
              </span>
              <span>Contacts</span></span
            >
          </router-link>
          <router-link to="/credits">
            <span
              @click="isOpen = false"
              class="flex items-center p-4 hover:bg-white hover:text-primary"
              :class="{ active: page && page.title === 'Credits' }"
            >
              <span class="mr-2">
                <credits-icon />
              </span>
              <span>Credits</span></span
            >
          </router-link>
          <router-link to="/" v-on:click.native="onLogout" v-if="auth">
            <span
              @
              class="flex items-center p-4 hover:bg-white hover:text-primary"
              ><span class="mr-2">
                <logout-icon />
              </span>
              <span>Exit</span></span
            >
          </router-link>
        </div>
        <div v-if="campagna">
          <router-link to="/courses" v-on:click.native="indietro">
            <span
              @click="isOpen = false"
              class="
                flex
                items-center
                p-4
                hover:bg-white hover:text-primary
                m-2
                border-white border-2
                rounded
              "
              ><span class="mr-2">
                <arrow-left-icon />
              </span>
              <span>Indietro</span></span
            ></router-link
          >
          <router-link :to="{ name: 'campagna', params: { id: campagna.id } }">
            <span
              @click="isOpen = false"
              class="flex items-center p-4 hover:bg-white hover:text-primary"
              :class="{ active: page && page.title === 'Campagna' }"
              ><span class="mr-2">
                <campaign-icon />
              </span>
              <span>Campagna</span></span
            >
          </router-link>
          <router-link
            :to="{ name: 'myperformance', params: { id: campagna.id } }"
            v-if="campagna.userInCampaign"
          >
            <span
              @click="isOpen = false"
              class="flex items-center p-4 hover:bg-white hover:text-primary"
              ><span class="mr-2">
                <chart-bar-icon />
              </span>
              <span>Le mie performance</span></span
            >
          </router-link>
          <router-link :to="{ name: 'rules', params: { id: campagna.id } }">
            <span
              @click="isOpen = false"
              class="flex items-center p-4 hover:bg-white hover:text-primary"
              ><span class="mr-2">
                <rules-icon />
              </span>
              <span>Regolamento</span></span
            >
          </router-link>
          <!-- <router-link
            :to="{ name: 'sendrequest', params: { id: campagna.id } }"
          >
            <span
              @click="isOpen = false"
              class="flex items-center p-4 hover:bg-white hover:text-primary"
              ><span class="mr-2">
                <send-request-icon />
              </span>
              <span>Richiedi Supporto</span></span
            >
          </router-link> -->
          <span
            @click="sendRequest()"
            class="flex items-center p-4 hover:bg-white hover:text-primary"
            ><span class="mr-2">
              <send-request-icon />
            </span>
            <span>Richiedi Supporto</span></span
          >
          <router-link :to="{ name: 'privacy', params: { id: campagna.id } }">
            <span
              @click="isOpen = false"
              class="flex items-center p-4 hover:bg-white hover:text-primary"
              ><span class="mr-2">
                <privacy-icon />
              </span>
              <span>Privacy Policy</span></span
            >
          </router-link>
          <div v-if="campagna.userInCampaign">
            <div @click="leaveCampaign">
              <span
                @click="isOpen = false"
                class="flex items-center p-4 hover:bg-white hover:text-primary"
                ><span class="mr-2">
                  <unsubscribe-icon />
                </span>
                <span>Abbandona campagna</span></span
              >
            </div>
          </div>
        </div>
      </aside>
    </nav>
    <nav
      class="
        invisible
        lg:visible
        flex
        fixed
        w-full
        items-center
        justify-between
        px-6
        h-16
        bg-primary
        text-white text-gray-700
        z-10
      "
    >
    
      
      <div class="flex items-center">
        
      </div>
      <div
        class="flex items-center"
        v-if="page"
        style="justify-content: center"
      >
        <span class="text-xl" style="font-size: 1.5vw"
          ><b>{{ page.title }}</b></span
        >
      </div>
      
      <div class="flex items-center">
        <div
          class="hidden md:block md:flex md:justify-between md:bg-transparent"
        >
          <!-- router link barra in alto a destra -->
          <router-link :to="{name: 'analytic'/*, params: { id: aId, title: aTitle, courseId: courseId }*/}" v-if="auth && page != null && page.title == 'Stats'/* &&, forse, Studente*/"> <!--Sistemare i props-->
            <span
              class="flex items-center p-4"
              ><span class="mr-2">
                <analytics-icon />
              </span>
              <span>Analytics</span></span
            >
          </router-link>
          <router-link :to="{name: 'stats'}" v-if="auth && page != null && page.title == 'Analytic'/* &&, forse, Studente*/"> <!--Sistemare i props-->
            <span
              class="flex items-center p-4"
              ><span class="mr-2">
                <performance-icon />
              </span>
              <span>Statistics</span></span
            >
          </router-link>
        </div>
      </div>

      <!-- questi sono i router della barra a sinistra -->
      <aside
        class="
          transform
          top-0
          left-0
          w-64
          bg-primary
          text-white
          fixed
          h-full
          ease-in-out
          transition-all
          duration-300
          z-30
        "
        style="background-color: #0a4e7e; width: 15em; font-size: 0.9vw"
      >
        <span class="flex w-full items-center p-4">
          <img
            src="@/assets/images/logopolyglot.png"
            alt="Logo"
            class="h-auto w-32 mx-auto"
            @click="$router.push('/')"
            style="cursor: pointer; width: 5em"
          />
        </span>
        <div v-if="!campagna">
          <router-link to="/login" v-if="!auth">
            <span
              class="flex items-center p-4 hover:bg-white hover:text-primary"
              ><span class="mr-2">
                <login-icon />
              </span>
              <span>Login</span></span
            >
          </router-link>
          
          <router-link to="/courses" v-if="auth">
            <span
              class="flex items-center p-4 hover:bg-white hover:text-primary"
              :class="{ active: page && page.title === 'Courses' }"
              ><span class="mr-2">
                <list-campaigns-icon />
              </span>
              <span>Courses</span></span
            >
          </router-link>

          <router-link to="/quizzes" v-if="auth">
            <span
              class="flex items-center p-4 hover:bg-white hover:text-primary"
              :class="{ active: page && page.title === 'Quizzes' }"
              ><span class="mr-2">
                <question-icon />
              </span>
              <span>My Quizzes</span></span
            >
          </router-link>

          <!--<router-link to="/analytics" v-if="auth">
            <span
              class="flex items-center p-4 hover:bg-white hover:text-primary"
              :class="{ active: page && page.title === 'Analytics' }"
              ><span class="mr-2">
                <analytics-icon />
              </span>
              <span>Analytics</span></span
            >
          </router-link>-->

          <router-link to="/info">
            <span
              class="flex items-center p-4 hover:bg-white hover:text-primary"
              :class="{ active: page && page.title === 'Info' }"
              ><span class="mr-2">
                <info-outline-icon />
              </span>
              <span>Info</span></span
            ></router-link
          >

          <router-link to="/contatti">
            <span
              class="flex items-center p-4 hover:bg-white hover:text-primary"
              :class="{ active: page && page.title === 'Contacts' }"
            >
              <span class="mr-2">
                <pencil-outline-icon />
              </span>
              <span>Contact us</span></span
            >
          </router-link>

          <router-link to="/credits">
            <span
              class="flex items-center p-4 hover:bg-white hover:text-primary"
              :class="{ active: page && page.title === 'Credits' }"
            >
              <span class="mr-2">
                <credits-icon />
              </span>
              <span>Credits</span></span
            >
          </router-link>
          <router-link to="/" v-on:click.native="onLogout" v-if="auth">
            <span
              @
              class="flex items-center p-4 hover:bg-white hover:text-primary"
              ><span class="mr-2">
                <logout-icon />
              </span>
              <span>Exit</span></span
            >
          </router-link>
        </div>

        <div v-if="campagna">
          <router-link to="/courses" v-on:click.native="indietro">
            <span
              @click="isOpen = false"
              class="
                flex
                items-center
                p-4
                hover:bg-white hover:text-primary
                m-2
                border-white border-2
                rounded
              "
              ><span class="mr-2">
                <arrow-left-icon />
              </span>
              <span>Indietro</span></span
            ></router-link
          >
          <router-link :to="{ name: 'campagna', params: { id: campagna.id } }">
            <span
              @
              class="flex items-center p-4 hover:bg-white hover:text-primary"
              :class="{ active: page && page.title === 'Campagna' }"
              ><span class="mr-2">
                <campaign-icon />
              </span>
              <span>Campagna</span></span
            >
          </router-link>
          <router-link
            :to="{ name: 'myperformance', params: { id: campagna.id } }"
            v-if="campagna.userInCampaign"
          >
            <span
              class="flex items-center p-4 hover:bg-white hover:text-primary"
              :class="{ active: page && page.title === 'Le mie performance' }"
              ><span class="mr-2">
                <chart-bar-icon />
              </span>
              <span>Le mie performance</span></span
            >
          </router-link>
          <router-link :to="{ name: 'rules', params: { id: campagna.id } }">
            <span
              @
              class="flex items-center p-4 hover:bg-white hover:text-primary"
              :class="{ active: page.title === 'Regolamento' }"
              ><span class="mr-2">
                <rules-icon />
              </span>
              <span>Regolamento</span></span
            >
          </router-link>
          <router-link
            :to="{ name: 'sendrequest', params: { id: campagna.id } }"
          >
            <span
              @click="isOpen = false"
              class="flex items-center p-4 hover:bg-white hover:text-primary"
              ><span class="mr-2">
                <send-request-icon />
              </span>
              <span>Richiedi Supporto</span></span
            >
          </router-link>
          -->
          <span
            @click="sendRequest()"
            class="flex items-center p-4 hover:bg-white hover:text-primary"
            ><span class="mr-2">
              <send-request-icon />
            </span>
            <span>Richiedi Supporto</span></span
          >
          <router-link :to="{ name: 'privacy', params: { id: campagna.id } }">
            <span
              class="flex items-center p-4 hover:bg-white hover:text-primary"
              :class="{ active: page && page.title === 'Privacy' }"
              ><span class="mr-2">
                <privacy-icon />
              </span>
              <span>Privacy Policy</span></span
            >
          </router-link>
          <div v-if="campagna.userInCampaign">
            <div @click="leaveCampaign">
              <span
                @
                class="flex items-center p-4 hover:bg-white hover:text-primary"
                ><span class="mr-2">
                  <unsubscribe-icon />
                </span>
                <span>Abbandona campagna</span></span
              >
            </div>
          </div>
        </div>
      </aside>
    </nav>
    <card-modal
      :showing="modalUnsubscribeShowing"
      @close="modalUnsubscribeShowing = false"
    >
      <h2 class="text-xl text-center font-bold text-gray-900">
        Cancella l'iscrizione dalla campagna
      </h2>

      <form
        name="unsub"
        action=""
        v-on:submit.prevent=""
        class="
          bg-white
          form
          flex flex-col
          p-6
          relative
          lg:rounded-xl
          justify-center
        "
      >
        <div class="flex flex-col md:flex-row mt-3 justify-stretch lg:flex-col">
          <span>
            Una volta confermata la cancellazione dalla campagna Il Partecipante
            non potrà più accumulare i Km in bici e riceverà dalla propria
            azienda soltanto gli incentivi maturati nel periodo di
            partecipazione.<br />
            Sei sicuro di voler cancellare l'iscrizione?
          </span>
          <button
            class="
              mt-6
              bg-primary
              hover:bg-blue-500
              text-white
              font-semibold
              p-3
              flex-1
            "
            @click="confirmLeave"
          >
            Conferma
          </button>
          <button
            class="
              mt-6
              bg-primary
              hover:bg-blue-500
              text-white
              font-semibold
              p-3
              flex-1
            "
            @click="modalUnsubscribeShowing = false"
          >
            Chiudi
          </button>
        </div>
      </form>
    </card-modal>
  </div>
</template>

<script>
import EventBus from "../communication/eventBus";
import CardModal from "./GenericModal.vue";
import DataApi from "../communication/dataApi";

export default {
  data() {
    return {
      isOpen: false,
      modalUnsubscribeShowing: false,
    };
  },
  components: {
    cardModal: CardModal,
  },
  methods: {
    sendRequest: function () {
      for (var i = 0; i < this.user.roles.length; i++) {
        if (this.user.roles[i].role == "ROLE_APP_USER") {
          for (var k = 0; k < this.user.roles[i].subscriptions.length; k++) {
            if (
              this.user.roles[i].subscriptions[k].campaign == this.campagna.id
            ) {
              var codePartecipation = this.user.roles[i].subscriptions[k].key;
              var userCompany = this.user.roles[i].subscriptions[k].companyCode;
              // var userLocation = this.user.roles[i].locations?this.user.roles[i].locations:"Non definito";
            }
          }
        }
      }
      window.location.href =
        "mailto:help-aziende@playngo.it?subject=Richiesta informazioni&body=" +
        "***NON CANCELLARE***%0d%0aId utente :" +
        this.user.playerId +
        "%0d%0a" +
        "Codice partecipazione: " +
        codePartecipation +
        "%0d%0a" +
        "Azienda :" +
        userCompany +
        // "%0d%0a" +
        // "Location :" +
        // userLocation +
        "%0d%0a" +
        "Campagna :" +
        this.campagna.title +
        "%0d%0a************%0d%0aSCRIVI QUI LA TUA RICHIESTA DI SUPPORTO%0d%0a";
    },
    contacts: function () {
      this.isOpen = false;
      window.location.href =
        "mailto:info-aziende@playngo.it?subject=Richiesta informazioni&body=Sarei interessato ad avere ulteriori notizie sul progetto";
    },
    confirmLeave: function () {
      DataApi.unsubrscribeCampaign(this.campagna.id).then(
        (res) => {
          //change campaign in store (subscribed)
          console.log(res);
          this.modalUnsubscribeShowing = false;
          //todo change campaign in store

          EventBus.$emit(
            "snack-open",
            "Cancellazione Effettuata",
            "Sei stato rimosso con successo dalla campagna " +
              this.campagna.title,
            0
          );

          //todo toast and subscribed
          this.$store.dispatch("exitCampagna").then(() => {
            this.$router.push({ path: `/courses` }).catch(() => {});
          });
        },
        (err) => {
          console.log(err);
        }
      );
    },

    drawer() {
      this.isOpen = !this.isOpen;
    },
    backPage() {
      this.$router.go(-1);
    },
    indietro() {
      this.$store.dispatch("exitCampagna").then(() => {
        this.$router.push("courses").catch(() => {});
      });
    },
    leaveCampaign() {
      //quit campaign
      EventBus.$emit("LEAVE_CAMPAIGN");
    },
    onLogout() {
      this.$store.dispatch("logout");
    },
    onLogin() {
      var authUrl = process.env.VUE_APP_AUTH_URL;
      var tokenId = process.env.VUE_APP_AUTH_TOKEN_ID;
      var redirectUri = process.env.VUE_APP_REDIRECT_URI;
      return window.open(
        authUrl +
          "response_type=token&client_id=" +
          tokenId +
          "&redirect_uri=" +
          redirectUri,
        "_self"
      );
    },
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        if (process.client) {
          if (isOpen) document.body.style.setProperty("overflow", "hidden");
          else document.body.style.removeProperty("overflow");
        }
      },
    },
  },
  created() {
    EventBus.$on("LEAVE_CAMPAIGN", () => {
      this.modalUnsubscribeShowing = true;
    });
  },
  mounted() {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 27 && this.isOpen) this.isOpen = false;
    });
  },
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    },
    campagna() {
      return this.$store.getters.campagna;
    },
    page() {
      return this.$store.getters.page;
    },
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>
<style scoped>
.active {
  color: #0f70b7;
  background-color: #fff;
}
card-modal {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
