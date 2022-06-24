<template>
  <div class="bg-primary">
    <div class="text-md w-full">
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
            w-full
          "
          :class="mode == 'I' ? 'border-blue-300 border-b-4 text-blue-300' : ''"
          @click="changeMode('I')"
          style="font-size: 1.1em"
        >
          Statistics</button
        ><button
          class="flex-1 py-2 px-6 block focus:outline-none hover:bg-blue-700"
          :class="
            mode == 'B' ? ' border-blue-300 border-b-4 text-blue-300' : ''
          "
          @click="changeMode('B')"
          style="font-size: 1.1em"
        >
          Leaderboard
        </button>
      </nav>
    </div>
    <div class="bg-opacity-0 py-2">
      <div
        v-show="mode == 'I'"
        class="justify-center text-center w-full text-xl"
      >
        <template>
          <!-- controllo se ho statistiche di questo studente in questo corso, se non ne ho mostro questo -->
          <div
            class="
              m-auto
              justify-center
              flex flex-col-reverse
              bg-white
              rounded-lg
              my-4
              text-center
              justify-center
              shadow-xl
              p-12
              grow
            "
            style="
              width: 18em;
              height: 10em;
              font-size: 1em;
              margin-bottom: 1em;
            "
          >
            <div v-for="obj in this.retPoints" :key="obj.name">
              <!--obj.id è uguale per tutti-->
              <p v-if="obj.name != 'CoursesCoins'">
                {{ obj.name }}: <b>{{ obj.score }}</b
                ><br />
              </p>
            </div>
            <img
              src="../../public/logo.png"
              alt="PolyGlot"
              style="width: 5em; margin-top: 1.8em; margin-bottom: 1em"
            />
          </div>
          <div
            class="
              m-auto
              justify-center
              flex flex-col-reverse
              bg-white
              rounded-lg
              my-4
              text-center
              justify-center
              shadow-xl
              p-12
              grow
            "
            style="width: 18em; font-size: 1em; margin-bottom: 1em"
          >
            <p>
              Your Level: <b>{{ this.level[0] }}</b
              ><br />
              <b>Keep going!</b>
            </p>
          </div>
          <div
            class="
              m-auto
              justify-center
              flex flex-col-reverse
              bg-white
              rounded-lg
              my-4
              text-center
              justify-center
              shadow-xl
              p-12
              grow
            "
            style="width: 18em; height: 10em; font-size: 1em"
          >
            <p style="margin-top: 0">
              Questions answered: <b>25</b> <br />
              Correct answers: <b>23</b> <br />
              Bonus Points: <b>5</b>
            </p>
          </div>
        </template>
      </div>
      <leaderboard
        id="chart_container"
        v-show="mode == 'B'"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Leaderboard from "./CustomAnalytics/6.vue";
//import CourseCard from "../Components/CourseCard.vue";
export default {
  name: "StudentGameStatus",
  components: { Leaderboard },
  props: {
    title: String
  },
  data: function () {
    return {
      retPoints: [],
      points: true,
      mode: "I",
      level: [],
      selectedCourse: {},
    };
  },
  methods: {
    sort: function (arr) {
      // sort players by xp
      return arr.slice().sort(function (a, b) {
        return b.state.PointConcept[2].score - a.state.PointConcept[2].score;
      });
    },
    changeMode(mode) {
      if (this.mode == mode) return;
      this.mode = mode;
    },
    retrievePoints() {
      const player = sessionStorage.getItem("player");
      //var registeredPoints = JSON.parse(sessionStorage.points);

      var apiUrl =
        process.env.VUE_APP_BASE_URL + process.env.VUE_APP_PLAYER_STATUS;
      let url = apiUrl + "?playerId=" + player;

      axios.get(url).then((response) => {
        if (response.data == "error") {
          console.log("Error during stats extraction");
        } else {
          let allPoints = response.data.state.PointConcept; //here we store the pointconcept inside allpoints
          var bonus = allPoints[1].score;
          sessionStorage.setItem("bonus", bonus);
          var obj = 0;
          for (obj in allPoints) {
            this.points = true;
            var currentPoints = allPoints[obj]; //currentpoints are the points we have defined until now, that are inside the player status pointconcept
            this.retPoints.push(currentPoints);
          }
        }
        // console.log("retreived Points:  " + this.retPoints); // points saved in retPoints
      });
    },
    retrieveLevel() {
      const player = sessionStorage.getItem("player");
      //var registeredPoints = JSON.parse(sessionStorage.points);

      var apiUrl =
        process.env.VUE_APP_BASE_URL + process.env.VUE_APP_PLAYER_STATUS;
      let url = apiUrl + "?playerId=" + player;
      axios.get(url).then((response) => {
        if (response.data == "error") {
          console.log("Error during stats extraction");
        } else {
          let level = response.data.customData.level; //here we store the pointconcept inside allpoints
          this.level.push(level);
        }
        console.log("level of the player: " + this.level); // points saved in retPoints
      });
    },
  },
  computed: {},
  created() {
    this.$store.dispatch("storePage", { title: this.title, back: false });
    this.selectedCourse = JSON.parse(sessionStorage.getItem("courses"))[
      sessionStorage.getItem("selectedCourse")
    ];
    this.response = this.retrieveLevel();
    this.response = this.retrievePoints();
  },
};
</script>

<style></style>
