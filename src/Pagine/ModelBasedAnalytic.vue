<template>
  <div class="bg-primary">
    <div class="flex flex-col bg-primary">
      <div
        class="invisible lg:visible text-md w-full"
        v-if="components.table && components.chart"
      >
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
              mode == 'TAB' ? 'border-blue-300 border-b-4 text-blue-300' : ''
            "
            @click="changeMode('TAB')"
            style="font-size: 1.1vw"
          >
            Table
          </button>
          <button
            class="flex-1 py-2 px-6 block focus:outline-none hover:bg-blue-700"
            :class="
              mode == 'CHART' ? ' border-blue-300 border-b-4 text-blue-300' : ''
            "
            @click="changeMode('CHART')"
            style="font-size: 1.1vw"
          >
            Chart
          </button>
        </nav>
      </div>
      <div
        class="visible lg:invisible text-md w-full"
        v-if="components.table && components.chart"
      >
        <nav class="flex text-white bg-primary mx-5">
          <select
            ref="nav"
            class="w-full text-center customSelect text-xl font-semibold"
            @change="changeMode($event.target.value)"
            v-model="mode"
          >
            <option value="TAB" selected="selected" class="customOption">
              Table
            </option>
            <option value="CHART" class="customOption">Chart</option>
          </select>
        </nav>
      </div>
      <div class="bg-opacity-0 py-2 flex-col">
        <template v-if="components.table">
          <div
            v-show="mode == 'TAB'"
            class="justify-center text-center w-full text-xl"
          >
            <div class="flex flex-col lg:flex-row px-6">
              <template v-if="/*!this.analytics[0].length*/ false">
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
                  There are no data.
                </div>
              </template>
              <template v-else>
                <div class="w-full" :class="{ 'lg:w-3/5': components.filters }">
                  <div
                    class="flex flex-col md:flex-row py-2 bg-primary text-white"
                  >
                    <div
                      class="
                        flex
                        w-auto
                        place-content-center
                        md:place-content-left
                      "
                    >
                      <button
                        class="
                          mr-3
                          px-3
                          rounded-full
                          text-primary
                          bg-white
                          self-center
                        "
                        @click="goBack()"
                      >
                        Back
                      </button>
                    </div>
                    <div class="w-full text-center md:text-left">
                      <span class="text-2xl font-semibold">{{
                        selectedCourse.title
                      }}</span>
                    </div>
                  </div>
                  <div
                    v-if="subtitle.length != 0"
                    class="flex flex-col md:flex-row py-2 bg-primary text-white"
                  >
                    <div class="w-full text-center md:text-left">
                      <span class="text-xl font-semibold">{{
                        subtitle
                      }}</span>
                    </div>
                  </div>
                  <!--tabella-->
                  <table
                    class="
                      table-fixed
                      justify-center
                      text-center
                      w-full
                      text-xl
                      bg-white
                      rounded-lg
                    "
                  >
                    <thead>
                      <tr v-show="table.head.length">
                        <template v-for="(cell, index) in table.head">
                          <th class="w-1/2" :key="index">{{ cell }}</th>
                        </template>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-for="(row, rowIndex) in table.data">
                        <tr :key="rowIndex">
                          <template v-for="(cell, index) in row">
                            <th
                              v-if="table.firstHead && index == 0"
                              :key="index"
                            >
                              {{ cell }}
                            </th>
                            <td v-else class="" :key="index">
                              {{ fixedFloatOrInt(cell, 2) }}
                            </td>
                          </template>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
                <div
                  v-if="components.filters"
                  class="w-full lg:w-2/5 pt-5 lg:pt-0 lg:pl-5"
                >
                  <!--filtro-->
                  <template>
                    <analytic-filter :filters="filters" @update="update" />
                  </template>
                </div>
              </template>
            </div>
          </div>
        </template>
        <template v-if="components.chart">
          <div
            id="chart_container"
            v-show="mode == 'CHART'"
            class="justify-center text-center w-full text-xl"
          >
            <div class="flex flex-col lg:flex-row px-6">
              <template v-if="/*!this.analytics[1].length*/ false">
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
                  There are no data.
                </div>
              </template>
              <template v-else>
                <div class="w-full m-auto flex flex-col lg:w-3/5">
                  <div
                    class="flex flex-col md:flex-row py-2 bg-primary text-white"
                  >
                    <div
                      class="
                        flex
                        w-auto
                        place-content-center
                        md:place-content-left
                      "
                    >
                      <button
                        class="
                          mr-3
                          px-3
                          rounded-full
                          text-primary
                          bg-white
                          self-center
                        "
                        @click="goBack()"
                      >
                        Back
                      </button>
                    </div>
                    <div class="w-full text-center md:text-left">
                      <span class="text-2xl font-semibold">{{
                        selectedCourse.title
                      }}</span>
                    </div>
                  </div>
                  <div
                    v-if="subtitle.length != 0"
                    class="flex flex-col md:flex-row py-2 bg-primary text-white"
                  >
                    <div class="w-full text-center md:text-left">
                      <span class="text-xl font-semibold">{{
                        subtitle
                      }}</span>
                    </div>
                  </div>
                  <div
                    class="
                      bg-white
                      rounded-lg
                      shadow-xl
                      min-h-fit
                      lg:
                      min-h-full
                      justify-center
                    "
                  >
                    <!--grafico-->
                    <apexchart
                      v-if="chart.loaded"
                      ref="chart"
                      height="430"
                      :options="chart.options"
                      :series="chart.series"
                    />
                  </div>
                </div>
                <div
                  v-if="components.filters"
                  class="w-full lg:w-2/5 pt-5 lg:pt-0 lg:pl-5"
                >
                  <!--filtro-->
                  <template>
                    <analytic-filter :filters="filters" @update="update" />
                  </template>
                </div>
              </template>
            </div>
          </div>
        </template>
        <template v-if="!(components.table && components.chart)">
          <div class="flex flex-col px-6">
            <div class="flex flex-col md:flex-row py-2 bg-primary text-white">
              <div
                class="flex w-auto place-content-center md:place-content-left"
              >
                <button
                  class="
                    mr-3
                    px-3
                    rounded-full
                    text-primary
                    bg-white
                    self-center
                  "
                  @click="goBack()"
                >
                  Back
                </button>
              </div>
              <div class="w-full text-center md:text-left">
                <span class="text-2xl font-semibold">{{
                  selectedCourse.title
                }}</span>
              </div>
            </div>
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
              This analytic is empty
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AnalyticFilter from "../Components/AnalyticFilter.vue";
import dynamicDataConverter from "../Components/analyticsDDC.js";
export default {
  name: "ModelBasedAnalytic",
  props: {
    id: String,
    title: String,
    category: Number,
    chartType: String,
    buildTable: Boolean,
    buildFilters: Boolean,
  },
  components: { AnalyticFilter },
  data: function () {
    return {
      mode: "TAB",
      allOutcomes: [
        {
          code: "OK",
          title: "Correct answer",
          shortTitle: "Correct",
        },
        {
          code: "NOK",
          title: "Wrong answer",
          shortTitle: "Wrong",
        },
        {
          code: "NOANSWER",
          title: "No Answer",
          shortTitle: "None",
        },
      ],
      selectedCourse: {},
      retrievedData: {},
      components: {
        table: this.buildTable,
        chart: this.chartType != "",
        filters: this.buildFilters,
      },
      table: {
        head: [],
        data: [],
        firstHead: true,
      },
      chart: {
        loaded: false,
        dynamicAdditions: [],
        series: [],
        options: {
          chart: {
            type: this.chartType,
          },
        },
      },
      filters: [],
      totalStudents: 0,
      subtitle: "",
    };
  },
  methods: {
    changeMode(mode) {
      if (this.mode == mode) return;
      this.mode = mode;
    },
    fixedFloatOrInt(n, decimals) { //es. n=9 decimals=2 => 9, n=8.789 decimals=2 => 8,79
      return isNaN(n) || n % 1 === 0 ? n : n.toFixed(decimals);
    },
    getPathTarget(target, path, strictPath) {
      let again = true;
      let i = 0;
      const limit = path.length - 1;
      while (again && i < limit) {
        if (target[path[i]] != undefined) {
          target = target[path[i]];
        } else if (strictPath) {
          again = false;
        } else {
          target = target[path[i]] = {};
        }
        i++;
      }
      if ((again && target[path[limit]] != undefined) || !strictPath) {
        return target;
      } else {
        return null;
      }
    },
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
    async initPage() {
      let apiUrl = process.env.VUE_APP_BASE_URL + process.env.VUE_APP_ANALYTICS;
      let url = apiUrl + "?id=" + this.id;
      await axios.get(url).then((response) => {
        if (
          this.components.table &&
          Object.keys(response.data.table).length !== 0
        ) {
          //table static building
          this.table.head = response.data.table.head;
          response.data.table.firstColumn.forEach((element) => {
            this.table.data.push([element]);
          });
          this.table.firstHead = !!response.data.table.firstColumn.length;
        }
        //chart static building
        if (this.components.chart && response.data.chart.options) {
          let tmpChart = response.data.chart;
          if (tmpChart.functions != undefined && tmpChart.functions.length) {
            //Convert functions parameters and body into functions
            let fn,last;
            for (const path of tmpChart.functions) {
              fn = this.getPathTarget(tmpChart["options"],path,true);
              if (fn != null) {
                last = path.length - 1;
                fn[path[last]] = Function(
                  fn[path[last]].arguments,
                  fn[path[last]].body
                );
              }
            }
          }
          this.chart.options = response.data.chart.options;
          this.chart.dynamicAdditions = response.data.chart.dynamicAdditions;
        }
        //Adding filters
        /*this.filters =
          this.components.filters && response.data.filters != undefined
            ? response.data.filters
            : [];*/
      });

      //Additional informations prior to the requests
      switch (this.id) {
        case "0":
        case "1":
        case "5":
          apiUrl = process.env.VUE_APP_BASE_URL + process.env.VUE_APP_GAME_STATUS;
          await axios
            .get(apiUrl)
            .then(
              response => this.totalStudents = response.data.content.length //Forse necessario filtro studenti
            );
          break;
      }

      apiUrl =
        process.env.VUE_APP_BASE_URL + process.env.VUE_APP_ANALYTICS_DATA;
      switch (this.id) { //Dynamic data request
        case "0":
        case "1":
        case "4":
        case "5":
          url =
            apiUrl + "?id=" + this.id + "&course=" + this.selectedCourse.title;
          break;
        default:
          this.$router.push("/courses");
          break;
      }
      await axios
        .get(url)
        .then((response) => (this.retrievedData = response.data));
      
      switch (this.id) { //Client-side post elaboration
        case "5":
          for (const topic of this.retrievedData.data) {
            topic.quizzes = this.retrievedData.topicQuizzes.find(
              (t) => t._id == topic._id
            ).quizzes;
          }
          break;
      }
      this.update(true);
      console.log("Retrieved analytic ", this.id);
    },
    update(mounted) {
      if (this.components.chart) {
        this.updateChart(mounted);
      }
      if (this.components.table) {
        this.updateTable(mounted);
      }
      console.log("Updated");
    },
    async updateChart(mounted) {
      let params = {};
      let toAdd, target;
      switch (this.id) { //Updates preparations (dynamicDataConverter params and chart subtitle setting)
        case "0": //Al momento fa riferimento solo all'ultimo quiz. Implementando i filtri si potrà scegliere
          this.subtitle = "Quiz: " + this.retrievedData.data[0]._id.name;
          params = {
            allOutcomes: this.allOutcomes,
            questionid: this.retrievedData.data[0]._id.questionid,
            totalAnswers: this.retrievedData.data[0].outcomes.reduce((a, b) => {return a + b.students}, 0)
          };
          break;
        case "1":
          params = {
            allOutcomes: this.allOutcomes,
          };
          break;
        case "5":
          params = {
            totalStudents: this.totalStudents,
          };
          break;
      }
      this.chart.series = dynamicDataConverter(
        this.id,
        2,
        this.retrievedData,
        params
      ); //Chart series update
      toAdd = dynamicDataConverter(this.id, 3, this.retrievedData, params); //dynamic chart options update
      for (const key of Object.keys(toAdd)) {
        target = this.getPathTarget(
          this.chart.options,
          this.chart.dynamicAdditions[key],
          true
        );
        if (target != null) {
          target[
            this.chart.dynamicAdditions[key][
              this.chart.dynamicAdditions[key].length - 1
            ]
          ] = toAdd[key];
        }
      }
      if (mounted) { //Updating on chart creation
        this.chart.loaded = true;
      } else {
        this.$refs.chart.updateSeries(this.chart.series);
      }
      console.log("ChartUpdated");
    },
    updateTable(mounted) {
      let params = {};
      switch (this.id) { //Updates preparations (dynamicDataConverter params and chart subtitle setting)
        case "0":
          this.subtitle = "Quiz: " + this.retrievedData.data[0]._id.name;
          params = {
            allOutcomes: this.allOutcomes,
            questionid: this.retrievedData.data[0]._id.questionid,
            totalAnswers: this.retrievedData.data[0].outcomes.reduce((a, b) => {return a + b.students}, 0)
          };
          break;
        case "1":
          params = {
            allOutcomes: this.allOutcomes,
          };
          break;
        case "5":
          params = {
            totalStudents: this.totalStudents,
          };
          break;
      }
      if (mounted && this.retrievedData.head != undefined) { //Updating on chart creation and if head need to be set
        this.table.head = dynamicDataConverter(
          this.id,
          1,
          this.retrievedData,
          params
        );
      }
      this.table.data = dynamicDataConverter(
        this.id,
        0,
        this.retrievedData,
        params
      ); //Table series update
      console.log("TableUpdated");
    },
  },
  created() {
    this.$store.dispatch("storePage", { title: this.title, back: false });
    if (!this.components.table && this.components.chart) {
      this.mode = "CHART";
    }
    this.selectedCourse = JSON.parse(sessionStorage.getItem("courses"))[
      sessionStorage.getItem("selectedCourse")
    ];
  },
  mounted() {
    this.initPage();
  },
};
</script>

<style>
table {
  border: 1px solid black;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
  overflow: hidden;
  text-overflow: ellipsis;
}
.customSelect {
  color: black;
}
.customOption {
  color: black;
}
select {
  text-overflow: ellipsis;
}
</style>