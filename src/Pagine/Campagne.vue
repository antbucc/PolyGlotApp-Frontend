<!-- posso trasformare campagne in studenti/corsi e mettere le statistiche/classifiche al posto delle statistiche di bici-->

<template>
  <div class="">
    <div class="flex flex-col">
      <!-- tmp-->
      <!-- <h1
        class="justify-self-center text-center text-5xl pt-2 lg:text-6xl font-semibold pb-4"
      >
        Classes
      </h1> -->
      <div class="text-md">
        <nav class="flex flex-row text-white bg-primary">
          <button
            class="
              flex-1
              py-2
              px-6
              block
              focus:outline-none
              font-medium
              sm:bg-green-400
              hover:bg-blue-700
            "
            :class="
              mode == 'MY' ? 'border-blue-300 border-b-4 text-blue-300' : ''
            "
            @click="changeMode('MY')"
          >
            My Courses:</button
          ><button
            class="flex-1 py-2 px-6 block focus:outline-none hover:bg-blue-700"
            :class="
              mode == 'ALL' ? ' border-blue-300 border-b-4 text-blue-300' : ''
            "
            @click="changeMode('ALL')"
          >
            All Courses:
          </button>
        </nav>
      </div>
      <div class="bg-opacity-0 py-2">
        <div
          v-show="mode == 'MY'"
          class="justify-center text-center w-full text-xl"
        >
          <div
            class="
              flex flex-col
              sm:flex-row sm:flex-wrap sm:justify-center
              md:px-12
            "
          >
            <template v-if="!this.myCampaigns.length">
              <div
                class="
                  m-auto
                  justify-center
                  flex flex-col-reverse
                  bg-white
                  rounded-lg
                  w-full
                  my-4
                  text-center
                  justify-center
                  shadow-xl
                  p-12
                "
              >
                There are no courses.
              </div>
            </template>
            <template v-else v-for="campaign in this.myCampaigns">
              <!-- gestire no courses se mycampaign è vuoto -->
              <template
                ><campaign-card
                  class=""
                  :key="campaign.id"
                  :id="campaign.id"
                  :title="campaign.title"
                  :registered="campaign.registered"
                /> </template
            ></template>
          </div>
        </div>
        <div id="chart_container" v-show="mode == 'ALL'" class="">
          <div
            class="
              flex flex-col
              sm:flex-row sm:flex-wrap sm:justify-center
              md:px-12
            "
          >
            <template v-if="!this.allCampaigns.length">
              <div
                class="
                  m-auto
                  justify-center
                  flex flex-col-reverse
                  bg-white
                  rounded-lg
                  w-full
                  my-4
                  text-center
                  justify-center
                  shadow-xl
                  p-12
                "
              >
                There are no courses.
              </div>
            </template>
            <template v-else v-for="campaign in this.allCampaigns">
              <template
                ><campaign-card
                  class=""
                  :key="campaign.id"
                  :id="campaign.id"
                  :title="campaign.fullname"
                /> </template
            ></template>
          </div>
        </div>
      </div>
      <!-- <context-menu
        ref="menu"
        class="mx-auto -mb-8"
        @click.native="sortCampaign()"
        v-bind:_options="[
          { name: 'my', view_name: 'Le mie Campagne', default: true },
          { name: 'active', view_name: 'Campagne Attive', default: false },
          { name: 'finished', view_name: 'Campagne Concluse', default: false },
        ]"
      /> -->
    </div>
  </div>
</template>

<script>
//import DataApi from "../communication/dataApi";
// import ContextMenu from "../Components/ContextMenu.vue";
import CampaignCard from "../Components/CampaignCard.vue";
import axios from "axios";
//import EventBus from "../communication/eventBus";
export default {
  name: "Campagne",
  components: { CampaignCard },

  data: function () {
    return {
      fakeCampaigns: [],
      myCampaigns: [],
      allCampaigns: [],
      courses: true,
      // currentView: "my",
      mode: "MY",
      // user:{}
    };
  },
  methods: {
    changeMode(mode) {
      if (this.mode == mode) return;
      this.mode = mode;
    },
    retrieveCourses() {
      let token = this.$route.params.finalToken;
      // courses at which the player is registered
      let registeredCourses = this.$route.params.courses;

      //let username = this.$route.params.playerName;
      /* let loader = this.$loading.show({
        canCancel: true,
        backgroundColor: "#000",
        color: "#fff",
      });*/
      // here I retrieve the list of courses
      var apiUrl = process.env.VUE_APP_BASE_URL + process.env.VUE_APP_COURSES;
      let url = apiUrl + "?token=" + token;

      axios.get(url).then((response) => {
        if (response.data == "error") {
          console.log("Error during courses extraction");
        } else {
          let allCourses = response.data;
          let registered = registeredCourses;

          // here I filter the courses where the player is registered and the courses where he/she is not registered
          var obj = 0;

          for (obj in allCourses) {
            this.courses = true;
            var currentAll = allCourses[obj];
            var found = false;
            var obj1 = 0;
            for (obj1 in registered) {
              var currentRegistered = registered[obj1];

              if (currentRegistered.id == currentAll.id) {
                this.myCampaigns.push(currentRegistered);
                found = true;
                break;
              }
            }
            if (!found) {
              this.allCampaigns.push(currentAll);
            }
          }
          console.log("all courses: " + this.allCampaigns.length);
          console.log("registered courses: " + this.myCampaigns.length);
        }
      });
    },
  },
  computed: {
    campaignToShow: function () {
      // let toRtn = this.myCampaigns;
      let toRtn = [];
      if (this.mode == "ALL") {
        this.allCampaigns.forEach((campaign) => {
          toRtn.push(campaign);
        });
      } else if (this.mode == "MY") {
        this.myCampaigns.forEach((campaign) => {
          toRtn.push(campaign);
        });
      }
      return toRtn;
    },
  },
  created() {
    this.$store.dispatch("storePage", { title: "Courses", back: false });
    this.response = this.retrieveCourses();
  },
  mounted() {},
};
</script>

<style></style>
