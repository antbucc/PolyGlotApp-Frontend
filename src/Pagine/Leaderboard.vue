<template>
  <div
      class="justify-center text-center w-full text-xl"
  >
    <div class="box">
      <template>
        <!-- controllo se ho la classifica di questo corso, se non la ho mostro questo -->
        <div
            class="
            flex flex-col-reverse
            bg-white
            rounded-lg
            my-4
            shadow-xl
            p-12
          "
            style="text-align: center"
        >
          <table>
            <thead>
            <tr>
              <template v-for="(cell, index) in table.head">
                <th :key="index">{{ cell }}</th>
              </template>
            </tr>
            </thead>
            <tbody>
            <template v-for="(obj, index) in sort(this.retBoard)">
              <tr :class="{first:index==0,second:index==1,
                  third:index==2}" :key="obj.playerId">
                <td :key="index">{{ index + 1 }}</td>
                <td :key="index">{{ obj.playerId }}</td>
                <td :key="index">{{ obj.state.PointConcept[2].score }}</td>
              </tr>
            </template>
            </tbody>
          </table>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Leaderboard",
  props: {
    id: String,
    title: String,
  },
  data: function () {
    return {
      retBoard: [],
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
    retrieveBoard() {
      var apiUrl =
          process.env.VUE_APP_BASE_URL + process.env.VUE_APP_GAME_STATUS;
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
    },
  },
  created() {
    this.$store.dispatch("storePage", { title: this.title, back: false });
    this.selectedCourse = JSON.parse(sessionStorage.getItem("courses"))[
        sessionStorage.getItem("selectedCourse")
        ];
    this.response = this.retrieveBoard();
    this.table = {
      head: [
        "Position",
        "Nickname",
        "Points",
      ],
    }
  },
}
</script>

<style>
td {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

