
<template>
  <div class="bg-primary">
    <div class="flex flex-col bg-primary">
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
            :class="
              mode == 'I' ? 'border-blue-300 border-b-4 text-blue-300' : ''
            "
            @click="changeMode('I')"
            style="font-size: 1.1vw"
          >
            Statistics</button
          ><button
            class="flex-1 py-2 px-6 block focus:outline-none hover:bg-blue-700"
            :class="
              mode == 'B' ? ' border-blue-300 border-b-4 text-blue-300' : ''
            "
            @click="changeMode('B')"
            style="font-size: 1.1vw"
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
          <div class="box">
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
                style="width: 35vw; font-size: 1.3vw; margin-bottom: 1vw"
              >
                <div v-for="obj in this.retPoints" :key="obj.id">
                  <p>
                    {{ obj.name }}: <b>{{ obj.score }}</b
                    ><br />
                  </p>
                </div>
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
                style="width: 35vw; font-size: 1.3vw; margin-bottom: 1vw"
              >

                <p>
                  Your Level: <b>{{this.level[0]}}</b><br />
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
                style="width: 35vw; font-size: 1.3vw; margin-bottom: 1vw"
              >
                <p>
                  Questions answered: <b>25</b> <br /><br />
                  Correct answers: <b>23</b>
                </p>
                <div class="images">
                  <div class="photo">
                    <img src="../assets/images/1.png" alt="photo" />
                  </div>

                  <div class="photo">
                    <img src="../assets/images/2.png" alt="photo" />
                  </div>

                  <div class="photo">
                    <img src="../assets/images/3.png" alt="photo" />
                  </div>
                </div>
                <div>Your Badges:</div>
              </div>
            </template>
          </div>
        </div>
        <div
          id="chart_container"
          v-show="mode == 'B'"
          class="justify-center text-center w-full text-xl"
        >
          <div class="box">
            <template>
              <!-- controllo se ho la classifica di questo corso, se non la ho mostro questo -->
              <div
                class="
                  m-auto
                  flex flex-col-reverse
                  bg-white
                  rounded-lg
                  my-4
                  shadow-xl
                  p-12
                "
                style="width: 80vw; overflow-y: scroll; scrollbar-width: thin;"
              >
                <ol style="text-align: left" >
                  <li v-for="obj in sort(this.retBoard)" :key="obj.playerId" class="board" >
                    <pre>   {{obj.state.PointConcept[1].score}}    {{obj.playerId}}</pre>
                  </li>
                </ol>
              </div>
            </template>
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
import axios from "axios";
//import CourseCard from "../Components/CourseCard.vue";
export default {
  name: "Stats",
  //components: { CourseCard },

  data: function () {
    return {
      retPoints: [],
      retBoard: [],
      points: true,
      mode: "I",
      level: [],
    };
  },
  methods: {
    sort: function(arr) {
      // sort players by xp
      return arr.slice().sort(function(a, b) {
        return  b.state.PointConcept[1].score - a.state.PointConcept[1].score ;
      });
    },
    changeMode(mode) {
      if (this.mode == mode) return;
      this.mode = mode;
    },
    retrievePoints() {
      const player = sessionStorage.getItem("player");
      //var registeredPoints = JSON.parse(sessionStorage.points);

      var apiUrl = process.env.VUE_APP_BASE_URL + process.env.VUE_APP_PLAYER_STATUS;
      let url = apiUrl + "?playerId=" + player;
      axios.get(url).then((response) => {
        if (response.data == "error") {
          console.log("Error during stats extraction");
        } else {
          let allPoints = response.data.state.PointConcept; //here we store the pointconcept inside allpoints
          var obj = 0;
          for (obj in allPoints) {
            this.points = true;
            var currentPoints = allPoints[obj]; //currentpoints are the points we have defined until now, that are inside the player status pointconcept
            this.retPoints.push(currentPoints);
              
          
          }
        }
        console.log(this.retPoints); // points saved in retPoints
      });
    },
    retrieveLevel() {
      const player = sessionStorage.getItem("player");
      //var registeredPoints = JSON.parse(sessionStorage.points);

      var apiUrl = process.env.VUE_APP_BASE_URL + process.env.VUE_APP_PLAYER_STATUS;
      let url = apiUrl + "?playerId=" + player;
      axios.get(url).then((response) => {
        if (response.data == "error") {
          console.log("Error during stats extraction");
        } else {
          let level = response.data.customData.level; //here we store the pointconcept inside allpoints
          this.level.push(level);
        }
        console.log(this.level); // points saved in retPoints
      });
    },
    retrieveBoard(){

      var apiUrl = process.env.VUE_APP_BASE_URL + process.env.VUE_APP_GAME_STATUS;

      axios.get(apiUrl).then((response) => {
        if (response.data == "error") {
          console.log("Error during game extraction");
        } else {
          let allPlayer = response.data.content; //here we store players data
          var obj = 0;
          for (obj in allPlayer) {
            var punteggi = allPlayer[obj]; 
            this.retBoard.push(punteggi);
              }
            }
          
        }); // points saved in retPoints
        
    }

  },
  computed: {},
  created() {
    this.$store.dispatch("storePage", { title: "", back: false });
    this.response = this.retrieveLevel();
    this.response = this.retrievePoints();
    this.response = this.retrieveBoard();
  },
  mounted() {},
};
</script>

<style></style>
