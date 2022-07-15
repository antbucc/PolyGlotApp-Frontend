<template>
  <div class="bg-primary">
    <div class="flex flex-col bg-primary">
      <div class="text-md w-full" v-if="components.table && components.chart">
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
      <div class="bg-opacity-0 py-2">
        <template v-if="components.table">
          <div
            v-show="mode == 'TAB'"
            class="justify-center text-center w-full text-xl"
          >
            <div
              class="
                flex flex-row
                sm:flex-row sm:flex-wrap sm:justify-center
                md:px-12
              "
            >
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
                <div class="lg: w-3/5">
                  <div
                    class="
                      flex-col
                      p-2
                      bg-primary
                      text-white text-gray-700
                      z-10
                    "
                  >
                    <div class="flex">
                      <span class="text-2xl font-semibold">{{
                        selectedCourse.title
                      }}</span>
                    </div>
                    <div class="flex">
                      <span class="text-xl">{{ aTitle }}</span>
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
                            <td v-else class="" :key="index">{{ cell }}</td>
                          </template>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
                <div v-if="components.filters" class="lg: w-2/5 lg: pl-5">
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
            <div
              class="
                flex flex-col
                sm:flex-row sm:flex-wrap sm:justify-center
                md:px-12
              "
            >
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
                <div class="m-auto flex flex-col lg: w-3/5">
                  <div
                    class="
                      flex-col
                      p-2
                      bg-primary
                      text-white text-gray-700
                      z-10
                    "
                  >
                    <div class="flex">
                      <span class="text-2xl font-semibold">{{
                        selectedCourse.title
                      }}</span>
                    </div>
                    <div class="flex">
                      <span class="text-xl">{{ aTitle }}</span>
                    </div>
                  </div>
                  <div
                    class="
                      bg-white
                      rounded-lg
                      shadow-xl
                      lg:
                      min-h-full
                      justify-center
                    "
                  >
                    <!--grafico-->
                    <apexchart
                      height="430"
                      :options="chart.options"
                      :series="chart.series"
                    />
                  </div>
                </div>
                <div v-if="components.filters" class="lg:w-2/5 lg: pl-5">
                  <!--filtro-->
                  <template>
                    <analytic-filter :filters="filters" @update="update" />
                  </template>
                </div>
              </template>
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
export default {
  name: "GeneralAnalytic",
  props: {
    id: String,
    title: String,
    chartType: String,
    buildTable: Boolean,
    buildFilters: Boolean,
  },
  components: { AnalyticFilter },
  data: function () {
    return {
      aId: this.id,
      aTitle: this.title,
      mode: "TAB",
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
        series: [],
        options: {
          chart: {
            type: this.chartType,
          },
        },
      },
      filters: [],
    };
  },
  methods: {
    changeMode(mode) {
      if (this.mode == mode) return;
      this.mode = mode;
    },
    initPage(id) {
      var apiUrl =
        process.env.VUE_APP_BASE_URL + process.env.VUE_APP_ANALYTICS;
      let url = apiUrl + "?analyticId=" + id;
      axios.get(url).then((response) => {
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
          //Quando arrivano i dati vedere come mettere colonne prese dinamicamente (es. quiz)
        }
        //chart static building
        this.chart.options =
          this.components.chart && response.data.chart.options != undefined
            ? response.data.chart.options
            : {};
        //Adding filters
        this.filters =
          this.components.filters && response.data.filters != undefined
            ? response.data.filters
            : [];
      });
      this.retrievedData = {}; //Da recuperare dati da trasformare per chart e tabella in update
      //Qualche chart ha bisogno di avere anche categorie o giù di lì (es. quiz come asse x in categories dei grafi a colonne)
      console.log("Retrieved analytic ", id);
    },
    update() {
      if (this.components.chart) {
        this.updateChart();
      }
      if (this.components.table) {
        this.updateTable();
      }
      console.log("Updated");
    },
    updateChart() {
      /*
      this.chart.series = [80, 20, 15, 5];
      //*/
      /*
      this.chart.series = [
        {
          name: "Risposte corrette",
          data: [80,60,90]
        }, {
          name: "Risposte sbagliate",
          data: [20,30,15]
        }, {
          name: "Senza risposta",
          data: [15,10,10]
        }
      ]
      //*/
      /*
      this.chart.series = [
        {
          name: "Learning level",
          data: [5,3,4]
        }
      ]
      //*/
      this.chart.series = [
        {
          name: "Partecipation level",
          data: [5,4,3]
        }
      ]
      console.log("ChartUpdated");
    },
    updateTable() {
      /*
      this.table.data = [
        ["Risposte corrette",80],
        ["Risposte sbagliate",20],
        ["Senza risposta",15],
        ["Senza partecipazione",5]
      ]
      //*/
      /*
      this.table.data = [
        ["BPMN",80,20,15],
        ["Requisiti non funzionali",60,30,10],
        ["Requisiti funzionali",90,15,10]
      ]
      */
      /*
      this.table.data = [
        ["BPMN",5],
        ["Requisiti non funzionali",3],
        ["Requisiti funzionali",4]
      ]
      //*/
      /*
      this.table.data = [
        ["BPMN",5],
        ["Requisiti non funzionali",4],
        ["Requisiti funzionali",3]
      ]
      //*/
      console.log("TableUpdated");
    },
  },
  created() {
    this.$store.dispatch("storePage", { title: "Analytic", back: false });
    if (!this.components.table && this.components.chart) {
      this.mode = "CHART";
    }
    this.selectedCourse = JSON.parse(sessionStorage.getItem("courses"))[
      sessionStorage.getItem("selectedCourse")
    ];
    this.initPage(this.aId); //mettere id
    this.update();
  },
};
</script>

<style>
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>