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
              mode == 'TAB' ? 'border-blue-300 border-b-4 text-blue-300' : ''
            "
            @click="changeMode('TAB')"
            
            style="font-size:1.1vw"
          >
            Table</button>
          <button
            class="flex-1 py-2 px-6 block focus:outline-none hover:bg-blue-700"
            :class="
              mode == 'CHART' ? ' border-blue-300 border-b-4 text-blue-300' : ''
            "
            @click="changeMode('CHART')"
            style="font-size:1.1vw"
          >
            Chart
          </button>
        </nav>
      </div>
      <div class="bg-opacity-0 py-2">
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
            <template v-if="/*!this.analytics[0].length*/false">
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
                <div class="
                  flex-col
                  p-2
                  bg-primary
                  text-white
                  text-gray-700
                  z-10"
                >
                  <div class="flex">
                    <span class="text-2xl font-semibold">{{ selectedCourse.title }}</span>
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
                        <template v-for="(cell,index) in row">
                          <th v-if="table.firstHead && index == 0" :key="index">{{ cell }}</th>
                          <td v-else class="" :key="index">{{ cell }}</td>
                        </template>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
              <div class="lg: w-2/5 lg: pl-5">
                <!--filtro-->
                <template>
                  <analytic-filter :filters="filter.filters" @update="updateTable" />
                </template>
              </div>
            </template>
          </div>
        </div>
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
            <template v-if="/*!this.analytics[1].length*/false">
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
              <div class="
                m-auto
                flex
                flex-col
                lg: w-3/5
              "
              >
                <div class="
                  flex-col
                  p-2
                  bg-primary
                  text-white
                  text-gray-700
                  z-10"
                >
                  <div class="flex">
                    <span class="text-2xl font-semibold">{{ selectedCourse.title }}</span>
                  </div>
                  <div class="flex">
                    <span class="text-xl">{{ aTitle }}</span>
                  </div>
                </div>
                <div class="
                  bg-white
                  rounded-lg
                  shadow-xl
                  lg: min-h-full
                  justify-center
                ">
                  <!--grafico-->
                  <apexchart height="430" :type="chart.type" :options="chart.options" :series="chart.series" />
                </div>
              </div>
              <div class="lg:w-2/5 lg: pl-5">
                <!--filtro-->
                <template>
                  <analytic-filter :filters="filter.filters" @update="updateChart" />
                </template>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AnalyticFilter from "../Components/AnalyticFilter.vue";
export default {
  name: "Analytic",
  props: {
    id: String,
    title: String
  },
  components: { AnalyticFilter },
  data: function () {
    return {
        aId: this.id,
        aTitle: this.title,
        mode: "TAB",
        selectedCourse: {},
        table: {
          head: [],
          data: [],
          firstHead: true
        },
        chart: {
          type: "",
          series: [],
          options: {
          }
        },
        filter: {
          filters: []
        }
    };
  },
  methods: {
    changeMode(mode) {
      if (this.mode == mode) return;
      this.mode = mode;
    },
    updateTable(filter) {
      //const player = sessionStorage.getItem("player");
      console.log(filter)
    },
    updateChart(filter) {
      //const player = sessionStorage.getItem("");
      console.log(filter)
    }
  },
  created() {
    this.$store.dispatch("storePage", {title:"Analytic", back:false });
    this.selectedCourse = JSON.parse(sessionStorage.getItem("courses"))[sessionStorage.getItem("selectedCourse")];
    /*
    this.table = {
      head: [],
      data: [
        ["Risposte corrette",80],
        ["Risposte sbagliate",20],
        ["Senza risposta",15],
        ["Senza partecipazione",5]
      ],
      firstHead: true
    }
    this.chart = {
      type: "pie",
      series: [80,20,15,5],
      options: {
        labels: [
          "Risposte corrette",
          "Risposte sbagliate",
          "Senza risposta",
          "Senza partecipazione"
        ]
      }
    }
    this.filter.filters = [
      {
        title: "Quiz",
        ref: "quiz",
        dataType: "id",
        selected: { name: '3', view_name: 'Last: BPMN' }, //L'ultimo quiz è "Last: " + titolo
        options: [
          { name: '3', view_name: 'Last: BPMN', default: true },
          { name: '2', view_name: 'Requisiti non funzionali', default: false },
          { name: '1', view_name: 'Requisiti funzionali', default: false },
        ]
      }
    ]
    */
    ///*
    this.table = {
      head: [
        "",
        "Risposte corrette",
        "Risposte sbagliate",
        "Senza risposta"
      ],
      data: [
        ["BPMN",80,20,15],
        ["Requisiti non funzionali",60,30,10],
        ["Requisiti funzionali",90,15,10]
      ],
      firstHead: true
    }
    this.chart = {
      type: "bar",
      series: [
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
      ],
      options: {
        chart: {
          type: 'bar',
          stacked: true,
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10
          },
        },
        xaxis: {
          type: 'category',
          categories: [
            "BPMN","Requisiti non funzionali","Requisiti funzionali"
          ],
        },
        yaxis: {
          max: 120 //numero di studenti partecipanti al corso
        }
      }
    }
    this.filter.filters = [
      {
        title: "Topic",
        ref: "topic",
        dataType: "id",
        selected: { name: '3', view_name: 'Last: BPMN' }, //L'ultimo quiz è "Last: " + titolo
        options: [
          { name: '3', view_name: 'Last: BPMN', default: true },
          { name: '2', view_name: 'Requisiti non funzionali', default: false },
          { name: '1', view_name: 'Requisiti funzionali', default: false },
        ]
      },
      {
        title: "Data range",
        ref: "dataRange",
        dataType: "dataRange",
        selected: { name: '13-09-2021_22-04-2022', view_name: 'This course year' }, //name di "This course year": data inizio corso-data di oggi
        options: [
          { name: '13-09-2021_22-04-2022', view_name: 'This course year', default: true },
        ]
      }
    ]//*/
  },
};
</script>

<style>
  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
  }
</style>