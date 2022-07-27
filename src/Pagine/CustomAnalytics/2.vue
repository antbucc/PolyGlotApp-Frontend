<template>
  <div class="bg-primary">
    <div class="flex flex-col bg-primary">
      <div class="justify-center text-center w-full text-xl">
        <div class="bg-opacity-0 flex flex-col lg:flex-row pt-6 px-6">
          <div
            class="
              flex
              md:hidden
              flex-col
              py-2
              bg-primary
              text-white
            "
          >
            <div class="flex w-auto place-content-center">
              <button class="mr-3 px-3 rounded-full text-primary bg-white self-center" @click="goBack()">Back</button>
            </div>
            <div class="w-full text-center">
              <span class="text-2xl font-semibold">{{
                selectedCourse.title
              }}</span>
            </div>
          </div>
          <div class="w-full lg:w-3/5">
            <div
              class="
                bg-white
                rounded-lg
                shadow-xl
                lg:min-h-full
                justify-center
                pr-6
              "
            >
              <!--grafico-->
              <apexchart
                ref="sumChart"
                :options="sumChart.options"
                :series="sumChart.series"
              />
              <!--Da sistemare pallino tagliato sulla destra-->
            </div>
          </div>
          <div class="w-full lg:w-2/5 lg:pl-5">
            <div class="flex-col p-2 text-white text-gray-700">
              <div class="flex-col">
                <div class="flex-col pb-4">
                  <div
                    class="
                      hidden
                      md:flex
                      flex-row
                      py-2
                      bg-primary
                      text-white
                    "
                  >
                    <div class="flex w-auto place-content-left">
                      <button class="mr-3 px-3 rounded-full text-primary bg-white self-center" @click="goBack()">Back</button>
                    </div>
                    <div class="w-full text-left">
                      <span class="text-2xl font-semibold">{{
                        selectedCourse.title
                      }}</span>
                    </div>
                  </div>
                  <div class="text-left">
                    <span class="text-2xl font-semibold">Summary </span>
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
                  <div class="text-left">
                    <span class="text-2xl font-semibold pr-1">Last quiz:</span>
                    <span class="text-2xl">{{ lastQuiz }}</span>
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
                <!--<div class="flex pt-4">
                  <router-link :to="{ name: 'analytic' }" tag="button">
                    <span
                      class="
                        flex
                        items-center
                        p-2
                        rounded-full
                        bg-white
                        text-primary
                      "
                      ><span class="mr-2">
                        <performance-icon />
                      </span>
                      <span>History</span></span
                    >
                  </router-link>
                </div>-->
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
  name: "LPSummary",
  //components: { CourseCard },
  props: {
    id: String,
    title: String,
    category: Number
  },

  data: function () {
    return {
      selectedCourse: {},

      sumChart: {
        series: [],
        options: {
          chart: {
            type: "scatter",
          },
        },
      },
      summary: {
        values: {
          course: {
            learning: 0, //TypeOfValue: percentuale
            partecipation: 0, //TypeOfValue: percentuale
          },
        },
        tresholds: {
          learning: [], //TypeOfValue: percentuale
          partecipation: [], //TypeOfValue: percentuale
        },
      },

      lastQuiz: "",

      evalPos: {
        learning: 0,
        partecipation: 0,
        summary: 0,
        lQLearning: 0,
        lQPartecipation: 0,
        lQSummary: 0,
      },

      evaluations: {
        learning: [
          {
            title: "",
            class: "text-white",
            areaColor: "#ffffff",
          },
        ],
        partecipation: [
          {
            title: "",
            class: "text-white",
            areaColor: "#ffffff",
          },
        ],
        understanding: [
          {
            title: "",
            class: "text-white",
            areaColor: "#ffffff",
          },
        ],
        performance: [
          {
            title: "",
            class: "text-white",
            areaColor: "#ffffff",
          },
        ],
        summary: [
          {
            title: "",
            class: "text-white",
            areaColor: "#ffffff",
          },
        ],
      },
    };
  },
  methods: {
    goBack() {
      let path;
      switch (this.category) {
        case 0:
          path = "/learningStatus";
          break;
        case 1:
          path = "/gameStatus";
          break;
        default:
          path = "/courses";
          break;
      }
      this.$router.push(path);
    },
    getEvaluation(value, tresholds) { //Give evaluation text based on data wrt tresholds
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
    async retrieveCharts() {
        //Retrieve data
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

        //Retrieve chart structure
        var apiUrl =
          process.env.VUE_APP_BASE_URL + process.env.VUE_APP_ANALYTICS;
        let url = apiUrl + "?analyticId=" + this.id;
        await axios.get(url).then((response) => {
          this.sumChart.options = response.data.chart.options;
        });

        //Put data into chart
        this.sumChart.series = [
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
        ];
        this.lastQuiz = "BPMN";
    },
    retrieveEvaluations() {
      //Texts and colors for evaluation on the right and colors for chart areas
      let temp = [
        {
          title: "Poor",
          class: "text-danger",
          areaColor: "#dc3545", //Red
        },
        {
          title: "Decent",
          class: "text-warning",
          areaColor: "#ffc107", //Yellow
        },
        {
          title: "Good",
          class: "text-secondary_light",
          areaColor: "#5ab45f", //Green
        },
      ];
      this.evaluations.learning = temp;
      this.evaluations.partecipation = temp;
      this.evaluations.understanding = temp;
      this.evaluations.performance = temp;

      this.evaluations.summary = [
        {
          title: "Action needed",
          class: "text-danger",
          areaColor: "#dc3545", //Red
        },
        {
          title: "Recommended interventions",
          class: "text-warning",
          areaColor: "#ffc107", //Yellow
        },
        {
          title: "Ideal",
          class: "text-secondary_light",
          areaColor: "#5ab45f", //Green
        },
      ];

      //Evaluations based on data
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
    },
    addEvaluationAreas() { //Adds annotation areas to the chart to create evaluations areas
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
      this.$refs.sumChart.updateOptions(this.sumChart.options);
    },
    async initTeacherStats() {
      await this.retrieveCharts();
      this.retrieveEvaluations();
      this.addEvaluationAreas();
    },
  },
  computed: {},
  created() {
    this.$store.dispatch("storePage", { title: this.title, back: false });
    this.selectedCourse = JSON.parse(sessionStorage.getItem("courses"))[
      sessionStorage.getItem("selectedCourse")
    ];
  },
  mounted() {
    this.initTeacherStats();
  },
};
</script>

<style></style>
