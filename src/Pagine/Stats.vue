
<template>
  <div class="bg-primary">
    <div v-if="isStudent()" class="flex flex-col bg-primary">
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
                style="width: 80vw; overflow-y: scroll; scrollbar-width: thin"
              >
                <ol style="text-align: left">
                  <li
                    v-for="obj in sort(this.retBoard)"
                    :key="obj.playerId"
                    class="board"
                  >
                    <pre>
   {{ obj.state.PointConcept[1].score }}    {{ obj.playerId }}</pre
                    >
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
    <div v-else class="flex flex-col bg-primary">
      <!--Trasformare in v-else-if in caso di ruoli nuovi-->
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
              mode == 'SUM' ? 'border-blue-300 border-b-4 text-blue-300' : ''
            "
            @click="changeMode('SUM')"
            style="font-size: 1.1vw"
          >
            Summary</button
          ><button
            class="flex-1 py-2 px-6 block focus:outline-none hover:bg-blue-700"
            :class="
              mode == 'LAST' ? ' border-blue-300 border-b-4 text-blue-300' : ''
            "
            @click="changeMode('LAST')"
            style="font-size: 1.1vw"
          >
            Last quiz
          </button>
        </nav>
      </div>
      <div
        v-show="mode == 'SUM'"
        class="justify-center text-center w-full text-xl"
      >
        <div class="bg-opacity-0 flex pt-6">
          <div class="lg: w-3/5">
            <div
              class="
                bg-white
                rounded-lg
                shadow-xl
                lg:
                min-h-full
                justify-center
                pr-6
              "
            >
              <!--grafico-->
              <apexchart
                :type="sumChart.type"
                :options="sumChart.options"
                :series="sumChart.series"
              />
              <!--Da sistemare pallino tagliato sulla destra-->
            </div>
          </div>
          <div class="lg: w-2/5 lg: pl-5">
            <div class="flex-col p-2 text-white text-gray-700 z-10">
              <div class="flex-col">
                <div class="flex-col">
                  <div>
                    <span class="text-2xl font-semibold"
                      >Course<!-- {{ selectedCourse.title }} --></span
                    >
                  </div>
                  <div class="flex">
                    <span class="pr-1">Learning level:</span>
                    <span
                      :class="evaluations.learning[evalPos.learning].class"
                      >{{ evaluations.learning[evalPos.learning].title }}</span
                    >
                  </div>
                  <div class="flex">
                    <span class="pr-1">Partecipation level:</span>
                    <span
                      :class="
                        evaluations.partecipation[evalPos.partecipation].class
                      "
                      >{{
                        evaluations.partecipation[evalPos.partecipation].title
                      }}</span
                    >
                  </div>
                  <div class="flex">
                    <span class="text-xl font-semibold pr-1">Situation: </span>
                    <span
                      class="text-xl font-semibold"
                      :class="evaluations.summary[evalPos.summary].class"
                      >{{ evaluations.summary[evalPos.summary].title }}</span
                    >
                  </div>
                </div>
                <div class="flex-col">
                  <div>
                    <span class="text-2xl font-semibold"
                      >Last quiz: {{ lastQuiz.title }}</span
                    >
                  </div>
                  <div class="flex">
                    <span class="pr-1">Learning level:</span>
                    <span
                      :class="evaluations.learning[evalPos.lQLearning].class"
                      >{{
                        evaluations.learning[evalPos.lQLearning].title
                      }}</span
                    >
                  </div>
                  <div class="flex">
                    <span class="pr-1">Partecipation level:</span>
                    <span
                      :class="
                        evaluations.partecipation[evalPos.lQPartecipation].class
                      "
                      >{{
                        evaluations.partecipation[evalPos.lQPartecipation].title
                      }}</span
                    >
                  </div>
                  <div class="flex">
                    <span class="text-xl font-semibold pr-1"
                      >Performances:
                    </span>
                    <span
                      class="text-xl font-semibold"
                      :class="evaluations.performance[evalPos.lQSummary].class"
                      >{{
                        evaluations.performance[evalPos.lQSummary].title
                      }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-show="mode == 'LAST'"
        class="justify-center text-center w-full text-xl"
      >
        <div class="bg-opacity-0 flex pt-6">
          <div class="lg: w-3/5">
            <div
              class="
                bg-white
                rounded-lg
                shadow-xl
                lg:
                min-h-full
                justify-center
                pr-6
              "
            >
              <!--grafico-->
              <apexchart
                :type="quizChart.type"
                :options="quizChart.options"
                :series="quizChart.series"
              />
              <!--Da sistemare pallino tagliato sulla destra-->
            </div>
          </div>
          <div class="lg: w-2/5 lg: pl-5">
            <div class="flex-col p-2 text-white text-gray-700 z-10">
              <div class="flex-col">
                <div>
                  <span class="text-2xl font-semibold"
                    >Course<!-- {{ selectedCourse.title }} --></span
                  >
                </div>
                <div>
                  <span class="text-2xl font-semibold">{{
                    lastQuiz.title
                  }}</span>
                </div>
                <div class="flex">
                  <span class="pr-1">Quiz understanding:</span>
                  <span
                    :class="evaluations.understanding[evalPos.lastQuiz].class"
                    >{{
                      evaluations.understanding[evalPos.lastQuiz].title
                    }}</span
                  >
                </div>
                <!--x:3=66,7:100-->
                <div class="flex">
                  <span class="text-xl font-semibold pr-1">Situation: </span>
                  <span
                    class="text-xl font-semibold"
                    :class="evaluations.lastQuiz[evalPos.lastQuiz].class"
                    >{{ evaluations.lastQuiz[evalPos.lastQuiz].title }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

      sumChart: {
        type: "",
        series: [],
        options: {},
      },
      summary: {
        course: {
          learning: {
            value: 0, //TypeOfValue: percentuale
            tresholds: [], //TypeOfValue: percentuale
          },
          partecipation: {
            value: 0, //TypeOfValue: percentuale
            tresholds: [], //TypeOfValue: percentuale
          },
        },
        lQ: {
          //Last quiz
          learning: {
            value: 0, //TypeOfValue: percentuale
            tresholds: [], //TypeOfValue: percentuale
          },
          partecipation: {
            value: 0, //TypeOfValue: percentuale
            tresholds: [], //TypeOfValue: percentuale
          },
        },
      },

      quizChart: {
        type: "pie",
        series: [],
        options: {
          labels: [],
        },
      },
      lastQuiz: {
        title: "",
        values: [], //TypeOfValue: persone
        tresholds: [], //TypeOfValue: percentuale
      },

      evalPos: {
        learning: 0,
        partecipation: 0,
        summary: 0,
        lQLearning: 0,
        lQPartecipation: 0,
        lQSummary: 0,
        lastQuiz: 0,
      },

      evaluations: {
        learning: [],
        partecipation: [],
        understanding: [],
        summary: [],
        performance: [],
        quiiz: [],
      } /*{tile: "", class: ""}*/,
    };
  },
  methods: {
    sort: function (arr) {
      // sort players by xp
      return arr.slice().sort(function (a, b) {
        return b.state.PointConcept[1].score - a.state.PointConcept[1].score;
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
        console.log(this.level); // points saved in retPoints
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
    isStudent() {
      return sessionStorage.getItem("roles").includes("student"); //Da vedere i nomi dei ruoli
    },
    getEvaluation(value, tresholds) {
      let again = true;
      let i = 0;
      let result = 0;

      if (value > tresholds[tresholds.length - 1]) {
        result = tresholds.length;
      } else {
        while (again && i < tresholds.length - 1) {
          if (value > tresholds[i] && value <= tresholds[i + 1]) {
            result = i + 1;
            again = false;
          }
          i++;
        }
      }
      return result;
    },
    retrieveCharts() {
      this.summary = {
        course: {
          learning: {
            value: 85,
            tresholds: [33, 67],
          },
          partecipation: {
            value: 75,
            tresholds: [33, 67],
          },
        },
        lQ: {
          learning: {
            value: 65,
            tresholds: [33, 67],
          },
          partecipation: {
            value: 95,
            tresholds: [33, 67],
          },
        },
      };
      this.lastQuiz = {
        title: "BPMN",
        values: [80, 20, 15, 5],
        tresholds: [50, 70],
      };
      this.sumChart = {
        type: "scatter",
        series: [
          {
            name: "Course summary",
            data: [
              [
                this.summary.course.partecipation.value,
                this.summary.course.learning.value,
              ],
            ],
          },
          {
            name: "Last quiz",
            data: [
              [
                this.summary.lQ.partecipation.value,
                this.summary.lQ.learning.value,
              ],
            ],
          },
        ],
        options: {
          chart: {
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          grid: {
            //Da sistemare griglia fissa
            xaxis: {
              lines: {
                show: true,
              },
            },
            yaxis: {
              lines: {
                show: true,
              },
            },
            row: {
              colors: ["#5ab45f", "#ffc107", "#dc3545"],
              opacity: 0.2,
            },
            column: {
              colors: ["#dc3545", "#ffc107", "#5ab45f"],
              opacity: 0.2,
            },
          },
          markers: {
            size: 20,
          },
          states: {
            active: {
              filter: {
                type: "none",
              },
            },
            hover: {
              filter: {
                type: "none",
              },
            },
          },
          tooltip: {
            enabled: false,
          },
          yaxis: {
            labels: {
              show: false,
            },
            min: 0,
            max: 100,
            tickAmount: 3,
          },
          xaxis: {
            labels: {
              show: false,
            },
            min: 0,
            max: 100,
            tickAmount: 3,
          },
        },
      };
      this.quizChart = {
        type: "pie",
        series: this.lastQuiz.values,
        options: {
          labels: [
            "Risposte corrette",
            "Risposte sbagliate",
            "Senza risposta",
            "Senza partecipazione",
          ],
        },
      };
    },
    retrieveEvaluations() {
      let temp = [
        {
          title: "Poor",
          class: "text-danger",
        },
        {
          title: "Decent",
          class: "text-warning",
        },
        {
          title: "Good",
          class: "text-secondary_light",
        },
      ]; //,"Terrible","Excellent"
      this.evaluations.learning = temp;
      this.evaluations.partecipation = temp;
      this.evaluations.understanding = temp;
      this.evaluations.performance = temp;
      temp = [
        {
          title: "Action needed",
          class: "text-danger",
        },
        {
          title: "Recommended interventions",
          class: "text-warning",
        },
        {
          title: "Ideal",
          class: "text-secondary_light",
        },
      ]; //Usato per summary e quiz
      this.evaluations.summary = temp;
      this.evaluations.lastQuiz = temp;

      this.evalPos.learning = this.getEvaluation(
        this.summary.course.learning.value,
        this.summary.course.learning.tresholds
      );
      this.evalPos.partecipation = this.getEvaluation(
        this.summary.course.partecipation.value,
        this.summary.course.partecipation.tresholds
      );
      this.evalPos.lQLearning = this.getEvaluation(
        this.summary.lQ.learning.value,
        this.summary.lQ.learning.tresholds
      );
      this.evalPos.lQPartecipation = this.getEvaluation(
        this.summary.lQ.partecipation.value,
        this.summary.lQ.partecipation.tresholds
      );

      this.evalPos.summary = Math.min(
        this.evalPos.learning,
        this.evalPos.partecipation
      ); //Pensare ad una conversione più generica
      this.evalPos.lQSummary = Math.min(
        this.evalPos.lQLearning,
        this.evalPos.lQPartecipation
      ); //Pensare ad una conversione più generica

      let percentage = 0;
      if (this.lastQuiz.values.length != 0) {
        percentage =
          (this.lastQuiz.values[0] * 100) /
          this.lastQuiz.values.reduce((partialSum, a) => partialSum + a, 0);
      }
      this.evalPos.lastQuiz = this.getEvaluation(
        percentage,
        this.lastQuiz.tresholds
      );
      /*if (this.lastQuiz.values.length == 0) {
        this.evalPos.quiz = 0
        this.textColors.quiz = ""
      } else if (percentage <= this.lastQuiz.tresholds[0]) {
        this.evalPos.quiz = 1
        this.textColors.quiz = "text-danger"
      } else if (percentage <= this.lastQuiz.tresholds[1]) {
        this.evalPos.quiz = 2
        this.textColors.quiz = "text-warning"
      } else {
        this.evalPos.quiz = 3
        this.textColors.quiz = "text-secondary_light"
      }*/
    },
  },
  computed: {},
  created() {
    this.$store.dispatch("storePage", { title: "Stats", back: false }); //Titolo messo per collegamento ad Analytics
    if (this.isStudent()) {
      this.response = this.retrieveLevel();
      this.response = this.retrievePoints();
      this.response = this.retrieveBoard();
      this.mode = "I";
    } else {
      this.retrieveCharts();
      this.retrieveEvaluations();
      this.mode = "SUM";
    }
  },
  mounted() {},
};
</script>

<style></style>
