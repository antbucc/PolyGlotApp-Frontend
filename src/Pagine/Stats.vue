
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
              
              <div v-for="obj in this.retPoints" :key="obj.id" >
                <p v-if="obj.name != 'CoursesCoins'">
                  {{ obj.name }}: <b>{{ obj.score }}</b
                  ><br />
                </p>
              </div>
              <img
                src="../../public/logo.png"
                alt="PolyGlot"
                style="width: 5em; margin-top:1.8em; margin-bottom:1em"
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
                style="width: 18em; text-align: center"
              >
                <ol
                  style="
                    text-align: left;
                    width: 15em;
                    height: 20em;
                    overflow-y: scroll;
                    scrollbar-width: thin;
                    margin: auto;
                  "
                >
                  <li
                    v-for="(obj, index) in sort(this.retBoard)"
                    :key="obj.playerId"
                    :class="{
                      first: index === 0,
                      second: index === 1,
                      third: index === 2,
                    }"
                    class="board"
                    style="width: 13em; margin-bottom: 0.8em"
                  >
                    <pre>
   {{ index + 1 }}   {{ obj.state.PointConcept[2].score }}    {{
                        obj.playerId
                      }}</pre
                    >
                  </li>
                </ol>
                <img
                src="../../public/logo.png"
                alt="PolyGlot"
                style="width: 5em; margin-bottom: 2em; "
              />
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
                <div class="flex-col pb-4">
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
                <div class="flex-col py-4">
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
                <div class="flex pt-4">
                  <router-link :to="{ name: 'analytic' }" tag="button">
                    <!--Sistemare i props per portare a statistica "summary history"-->
                    <span
                      class="
                        flex
                        items-center
                        p-2
                        rounded-full
                        bg-white
                        text-primary
                        border-black
                      "
                      ><span class="mr-2">
                        <performance-icon />
                      </span>
                      <span>History</span></span
                    >
                    <!--border-white non funziona-->
                  </router-link>
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
              <div class="flex-col pb-4">
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
              <div class="flex pt-4">
                <router-link :to="{ name: 'analytic' }" tag="button">
                  <!--Sistemare i props per portare a statistica "summary history"-->
                  <span
                    class="
                      flex
                      items-center
                      p-2
                      rounded-full
                      bg-white
                      text-primary
                      border-black
                    "
                    ><span class="mr-2">
                      <column-chart-icon />
                    </span>
                    <span>Compare with other quizzes</span></span
                  >
                  <!--border-white non funziona-->
                </router-link>
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
        values: {
          course: {
            learning: 0, //TypeOfValue: percentuale
            partecipation: 0, //TypeOfValue: percentuale
          },
          lQ: {
            //Last quiz
            learning: 0, //TypeOfValue: percentuale
            partecipation: 0, //TypeOfValue: percentuale
          },
        },
        tresholds: {
          learning: [], //TypeOfValue: percentuale
          partecipation: [], //TypeOfValue: percentuale
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
        values: {
          course: {
            learning: 85, //TypeOfValue: percentuale
            partecipation: 75, //TypeOfValue: percentuale
          },
          lQ: {
            //Last quiz
            learning: 65, //TypeOfValue: percentuale
            partecipation: 95, //TypeOfValue: percentuale
          },
        },
        tresholds: {
          learning: [50, 70], //TypeOfValue: percentuale
          partecipation: [50, 70], //TypeOfValue: percentuale
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
                this.summary.values.course.partecipation,
                this.summary.values.course.learning,
              ],
            ],
          },
          {
            name: "Last quiz",
            data: [
              [
                this.summary.values.lQ.partecipation,
                this.summary.values.lQ.learning,
              ],
            ],
          },
        ],
        options: {
          annotations: {
            position: "back",
            xaxis: [],
            yaxis: [],
          },
          chart: {
            offsetX: 10,
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false,
            },
          },
          colors: ["#a4ab27", "#d17e26"],
          dataLabels: {
            enabled: false,
          },
          grid: {
            xaxis: {
              lines: {
                show: false,
              },
            },
            yaxis: {
              lines: {
                show: false,
              },
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
            title: {
              text: "Learning",
            },
          },
          xaxis: {
            labels: {
              show: false,
            },
            min: 0,
            max: 100,
            title: {
              text: "Partecipation",
            },
          },
        },
      };

      this.quizChart = {
        type: "pie",
        series: this.lastQuiz.values,
        options: {
          colors: ["#00d88f", "#ff6279", "#ffbf42", "#b5b5b5"],
          dataLabels: {
            style: {
              fontSize: "18px",
            },
          },
          labels: [
            "Risposte corrette",
            "Risposte sbagliate",
            "Senza risposta",
            "Senza partecipazione",
          ],
          tooltip: {
            style: {
              fontSize: "18px",
            },
          },
        },
      };
    },
    retrieveEvaluations() {
      let temp = [
        {
          title: "Poor",
          class: "text-danger",
          areaColor: "#dc3545",
        },
        {
          title: "Decent",
          class: "text-warning",
          areaColor: "#ffc107",
        },
        {
          title: "Good",
          class: "text-secondary_light",
          areaColor: "#5ab45f",
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
          areaColor: "#dc3545",
        },
        {
          title: "Recommended interventions",
          class: "text-warning",
          areaColor: "#ffc107",
        },
        {
          title: "Ideal",
          class: "text-secondary_light",
          areaColor: "#5ab45f",
        },
      ]; //Usato per summary e quiz
      this.evaluations.summary = temp;
      this.evaluations.lastQuiz = temp;

      this.evalPos.learning = this.getEvaluation(
        this.summary.values.course.learning,
        this.summary.tresholds.learning
      );
      this.evalPos.partecipation = this.getEvaluation(
        this.summary.values.course.partecipation,
        this.summary.tresholds.partecipation
      );
      this.evalPos.lQLearning = this.getEvaluation(
        this.summary.values.lQ.learning,
        this.summary.tresholds.learning
      );
      this.evalPos.lQPartecipation = this.getEvaluation(
        this.summary.values.lQ.partecipation,
        this.summary.tresholds.partecipation
      );

      this.evalPos.summary = Math.min(
        this.evalPos.learning,
        this.evalPos.partecipation
      ); //Pensare ad una conversione più generica
      this.evalPos.lQSummary = Math.min(
        this.evalPos.lQLearning,
        this.evalPos.lQPartecipation
      ); //Pensare ad una conversione più generica

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
    addSummaryAreas() {
      let tTemp = this.summary.tresholds.learning;
      let eTemp = this.evaluations.learning;

      if (tTemp.length > 0) {
        this.sumChart.options.annotations.yaxis.push({
          y2: tTemp[0],
          borderColor: eTemp[0].areaColor,
          fillColor: eTemp[0].areaColor,
        });
      }
      for (let i = 0; i < tTemp.length - 1; i++) {
        this.sumChart.options.annotations.yaxis.push({
          y: tTemp[i],
          y2: tTemp[i + 1],
          borderColor: eTemp[i + 1].areaColor,
          fillColor: eTemp[i + 1].areaColor,
        });
      }
      if (tTemp.length > 1) {
        this.sumChart.options.annotations.yaxis.push({
          y: tTemp[tTemp.length - 1],
          y2: 100,
          borderColor: eTemp[eTemp.length - 1].areaColor,
          fillColor: eTemp[eTemp.length - 1].areaColor,
        });
      }

      tTemp = this.summary.tresholds.partecipation;
      eTemp = this.evaluations.partecipation;

      if (tTemp.length > 0) {
        this.sumChart.options.annotations.xaxis.push({
          x2: tTemp[0],
          borderColor: eTemp[0].areaColor,
          fillColor: eTemp[0].areaColor,
        });
      }
      for (let i = 0; i < tTemp.length - 1; i++) {
        this.sumChart.options.annotations.xaxis.push({
          x: tTemp[i],
          x2: tTemp[i + 1],
          borderColor: eTemp[i + 1].areaColor,
          fillColor: eTemp[i + 1].areaColor,
        });
      }
      if (tTemp.length > 1) {
        this.sumChart.options.annotations.xaxis.push({
          x: tTemp[tTemp.length - 1],
          x2: 100,
          borderColor: eTemp[eTemp.length - 1].areaColor,
          fillColor: eTemp[eTemp.length - 1].areaColor,
        });
      }
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
      this.addSummaryAreas();
      this.mode = "SUM";
    }
  },
  mounted() {},
};
</script>

<style></style>
