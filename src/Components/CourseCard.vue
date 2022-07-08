<!-- posso renderle student card con i loro corsi e le loro stats relative -->
<template>
  <div
    class="
      m-auto
      justify-center
      flex flex-col
      lg:w-1/3
      bg-white
      rounded-lg
      my-4
      lg:mx-2
      xl:w-1/5
      justify-cente
      shadow-xl
      grow
    "
    style="height: 10em; width: 10em; word-wrap: break-word"
  >
    <div class="flex flex-col align-middle p-2 pt-0 h-40">
      <!-- <img
        class="mt-auto object-scale-down sm:px-8 py-2 lg:px-0 h-48"
        v-if="dLogo"
        :src="dLogo"
      /> -->
    </div>

    <div class="flex flex-col py-6 lg:mx-2 justify-center">
      <div class="px-2">
        <h2 class="text-2xl font-semibold break-normal" style="font-size: 1em">
          {{ dTitolo }}
        </h2>

        <div class="flex flex-row justify-self-center text-sm">
          <!-- <span class="font-light">{{ printDate }} </span> -->
        </div>
        <div class="pt-4 break-words text-sm">
          <!-- <p class="card-description">{{ description }}</p> -->
        </div>
      </div>

      <div
        class="flex flex-col lg:mt-auto align-middle pt-4 text-sm"
        style="justify-content: center"
      >
        <template v-if="dRegistered">
          <button
            type="button"
            class="
              p-0
              text-primary
              hover:bg-primary
              my-1
              inline-flex
              items-center
              bg-transparent
              font-semibold
              hover:text-white
              py-1
              px-2
            "
            style="margin: auto; border-radius: 15px"
            @click="selectAndRedirect('/gameStatus')"
          >
            <game-status-icon class="pr-1" />Game diary
          </button>
          <button
            type="button"
            class="
              p-0
              text-primary
              hover:bg-primary
              my-1
              inline-flex
              items-center
              bg-transparent
              font-semibold
              hover:text-white
              py-1
              px-2
            "
            style="margin: auto; border-radius: 15px"
            @click="selectAndRedirect('/learningStatus')"
          >
            <learning-status-icon class="pr-1" />Learning Status
          </button>
        </template>
        <template v-else-if="!dRegistered">
          <button
            type="button"
            @click="addCourse"
            class="
              p-0
              text-primary
              hover:bg-primary
              rounded-md
              my-1
              inline-flex
              items-center
              bg-transparent
              font-semibold
              hover:text-white
              py-1
              px-2
            "
            style="margin: auto; border-radius: 15px"
          >
            <join-icon class="pr-1" />Join the Game
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CourseCard",
  props: {
    id: String,
    title: String,
    coursePosition: Number,
    registered: Boolean,
    // logo: String,
    // description: String,
    // active: Boolean,
    // startDate: String,
    // endDate: String,
    //  means: Array,
    //  rules:String,
    //  privacy:String,
    //  userInCampaign: Boolean,
    //  subscribedCompany: Object,
  },

  data: function () {
    return {
      dTitolo: this.title,
      dId: this.id,
      dPosition: this.coursePosition,
      dRegistered: this.registered,
      //dLogo: this.logo,
      //   dDescription: this.description,
      ////   dActive: this.active,
      //   dStartDate: this.startDate,
      //   dEndDate: this.endDate,
      //  dMeans: this.means,
      //  dFinished: false,
      //   dRules: this.rules,
      //   dPrivacy:this.privacy,
      //  dSubscribedCompany: this.subscribedCompany,
    };
  },
  computed: {
    /*
    printDate: function() {
      let from = new Intl.DateTimeFormat("it", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(this.startDate));

      let to = new Intl.DateTimeFormat("it", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(this.endDate));

      return from + " - " + to;
    },
    */
  },

  // let username = "papyrus";
  // let password = "papyrus0704!";

  methods: {
    addCourse() {
      console.log("arrivo qui");
      let playerId = this.$route.params.playerName;

      let courseId = this.dId;
      let courseTitle = this.dTitolo;
      var apiUrl =
        process.env.VUE_APP_BASE_URL + process.env.VUE_APP_REGISTER_COURSE;
      console.log("url registrazione corse: " + apiUrl);

      var data = {
        playerId: playerId,
        course: {
          id: courseId,
          title: courseTitle,
        },
      };

      var config = {
        method: "post",
        url: apiUrl,
        data: data,
      };
      //alert to the student to confirm the added course
      // alert with the notification

      this.$swal({
        title: "Are you sure?",
        text: "You can't revert your action",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes Add it!",
        cancelButtonText: "Not Add it!",
        showCloseButton: true,
        showLoaderOnConfirm: true,
      })
        .then((result) => {
          if (result.value) {
            // call the gamification engine action to add the course
            var self = this;
            axios(config).then(function (response) {
              // update session status with a new course

              let course = {
                id: courseId,
                title: courseTitle,
                registered: true,
              };

              var storedCoursesList =
                JSON.parse(sessionStorage.getItem("courses")) || [];
              // course added at the lit
              console.log(
                "course registered at the player status (customData): " +
                  response
              );
              storedCoursesList.push(course);
              sessionStorage.setItem(
                "courses",
                JSON.stringify(storedCoursesList)
              );
              //refresh page
              self.$router.go(0);
            });
          } else {
            this.$swal("Cancelled", "This course is still not added");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    dettaglio() {
      /* this.$store
        .dispatch("storeCampagna", {
          id: this.id,
          title: this.title,
          description: this.description,
          logo: this.logo,
          active: this.active,
          startDate: this.startDate,
          endDate: this.endDate,
          means: this.means,
          rules: this.rules,
          privacy:this.privacy,
          userInCampaign: this.userInCampaign,
          subscribedCompany: this.subscribedCompany,
        })
        .then(() => {
          this.$router
            .push({ name: "campagna", params: { id: this.id } })
            .catch(() => {});
        });
        */
    },
    performance() {
      /*
      this.$store
        .dispatch("storeCampagna", {
          id: this.id,
          title: this.title,
          description: this.description,
          logo: this.logo,
          active: this.active,
          startDate: this.startDate,
          endDate: this.endDate,
          means: this.means,
                    rules: this.rules,
                    privacy:this.privacy,
          userInCampaign: this.userInCampaign,
          subscribedCompany: this.subscribedCompany,
        })
        .then(() => {
          this.$router
            .push({ name: "myperformance", params: { id: this.id } })
            .catch(() => {});
        });
       */
    },
    selectAndRedirect(destination) {
      sessionStorage.setItem("selectedCourse", this.dPosition);
      this.$router.push(destination);
    },
  },
  mounted: function () {
    /*
    let data = this.endDate.split("-");
    let date = new Date(data[0], data[1], data[2]);
    if (date < new Date()) this.dFinished = true;
    */
  },
};
</script>

<style>
.in_corso {
  right: 0;
  top: 0;
}
.card-description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
