<template>
  <div >
    <div v-show="stats && stats.length > 0">
      <div class="p-8 bg-blue-600">
        <!-- <h1
          class="justify-self-center text-center text-primary text-4xl pt-2 md:text-6xl font-semibold pb-6"
        >
          Le Mie Performance
        </h1> -->
        <div class="flex flex-row justify-center text-md">
          <label class="text-right ml-auto mr-4 mt-1 text-primary">Dato</label>
          <context-menu
            ref="menuValue"
            class="mr-auto"
            @click.native="changeDataType()"
            v-bind:_options="options"
          />
        </div>
        <div class="flex flex-row justify-center text-md">
           <label class="text-right ml-auto mr-2 mt-1 text-primary">Tempo</label>
          <context-menu
            ref="menuGroup"
            class="mr-auto"
            @click.native="changeGroup()"
            v-bind:_options="[
              { name: 'total', view_name: 'Totali', default: false },
              { name: 'month', view_name: 'Mesi', default: true },
              { name: 'day', view_name: 'Giorni', default: false },
            ]"
          />
        </div>

        <div class="pt-2 text-md">
          <nav class="flex flex-row text-primary">
            <button
              class="flex-1 py-2 px-6 block focus:outline-none font-medium sm:bg-green-400 hover:bg-blue-700"
              :class="mode == 'TAB' ? 'border-blue-300 border-b-4 text-blue-300' : ''"
              @click="changeMode('TAB')"
            >
              Tabella</button
            ><button
              class="flex-1 py-2 px-6 block focus:outline-none hover:bg-blue-700"
              :class="mode == 'GRAPH' ? ' border-blue-300 border-b-4 text-blue-300' : ''"
              @click="changeMode('GRAPH')"
            >
              Grafico
            </button>
          </nav>
        </div>
      </div>

      <div class="bg-opacity-0 py-2">
        <table
          v-show="mode == 'TAB'"
          class="table-fixed justify-center text-center w-full text-xl"
        >
          <thead>
            <tr>
              <th class="w-1/2 text-primary">{{ option_group_selected.view_name }}</th>
              <th class="w-1/2 text-primary">{{ option_data_selected.view_name }}</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(element, index) in stats">
              <tr :key="index">
                <td class="text-primary">{{ labels[index] }}</td>
                <td class="text-primary">{{ stats[index].value | round(2) }}</td>
              </tr></template
            >
          </tbody>
        </table>
        <div id="chart_container" v-show="mode == 'GRAPH'" class="">
          <canvas ref="canvas" class="p-4"></canvas>
        </div>
      </div>
    </div>
    <div v-show="stats.length == 0" class="flex flex-col justify-center text-md">
      <h1
        class="justify-self-center text-center text-primary text-4xl pt-2 md:text-6xl font-semibold pb-6"
      >
        Al momento non ci sono statistiche.<br />
      </h1>
    </div>
  </div>
</template>

<script>
import ContextMenu from "../../Components/ContextMenu.vue";
import DataApi from "../../communication/dataApi";
import { MOMENT_DATE_FORMAT, STATS_DISTANCE } from "../../variables";
import moment from "moment";
import Chart from "chart.js";
import EventBus from "../../communication/eventBus";
export default {
  components: { ContextMenu },
  name: "MyPerformance",
  data: function () {
    return {
      stats: [],
      originalStats: [],
      labels: [],
      from: moment(this.$store.getters.campagna.startDate).format(MOMENT_DATE_FORMAT),
      to: moment(this.$store.getters.campagna.endDate).format(MOMENT_DATE_FORMAT),
      groupBy: "month",
      withTracks: false,
      mode: "TAB",
      chart: undefined,
      option_data_selected: {
        name: STATS_DISTANCE[Object.keys(STATS_DISTANCE)[0]].name,
        view_name: STATS_DISTANCE[Object.keys(STATS_DISTANCE)[0]].view_name,
      },
      option_group_selected: { name: "month", view_name: "Mesi" },
    };
  },
  methods: {
     async thereIsData() {
       var data = await DataApi.thereIsData(this.campagna.id, this.campagna.startDate, this.campagna.endDate, 'month', this.withTracks)
        if (data) 
                {for (var i=0;i<data.length;i++)
                    if (data[i].trackCount!=0)
                        return true;
                }
                return false
       
    },
    getData(campaignId, from, to, groupBy, withTracks) {
      return DataApi.getStats(campaignId, from, to, groupBy, withTracks);
    },
    buildConfig(labels) {
      //get the right data from stats
      // check if Km, select the rigth km
      var data = [];
      if (this.option_data_selected.name.startsWith("KM"))
        data = this.originalStats.map((stat, index) => {
          return {
            data: labels[index],
            value: stat.distances[this.option_data_selected.name.substring(3)] / 1000,
          };
        });
      else
        data = this.originalStats.map((stat, index) => {
          return {
            date: labels[index],
            value: stat[this.option_data_selected.name],
          };
        });
      this.stats = data;
      return {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "",
              borderColor: "#1970b7",
              backgroundColor: 
                "#1970b7",
                borderWidth: 1,
              data: data.map((element) => element.value),
              barThickness:'flex',
              maxBarThickness:40,
              fill: false,
            },
          ],
        },
        options: {
          legend: { display: false },
          responsive: true,

          tooltips: {
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          scales: {
            xAxes: [
              {
                
                ticks: {
                  fontColor: "#1970b7",
                  fontSize: 18,
                  stepSize: 1,
                  beginAtZero: true,
                },
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: this.option_group_selected.view_name,
                  fontColor: "#1970b7",
                },
              },
            ],
            yAxes: [
              {
                
                ticks: {
                  fontColor: "#1970b7",
                  fontSize: 18,
                  stepSize: 1,
                  beginAtZero: true,
                },
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: this.option_data_selected.view_name,
                  fontColor: "#1970b7",
                },
              },
            ],
          },
        },
      };
    },
    buildLabels(stats) {
      console.log(stats);
      var label = [];
      //cicle stats and return the label
      if (this.groupBy == "month") {
        stats.forEach((elem) => {
          label.push(moment(elem.month, "YYYY-MM").format("MMMM"));
        });
      } else if (this.groupBy == "day"){
        stats.forEach((elem) => {
          label.push(moment(elem.date, "YYYY-MM-DD").format("DD/MM"));
        }) 
      }else {
          stats.forEach(() => {
          label.push("Totali");
        }) 
        }
      return label;
    },
    buildChart(stats) {
      console.log(stats);
      this.labels = this.buildLabels(stats);
      let ctx = this.$refs.canvas;
      let config = this.buildConfig(this.labels);
      if (ctx && config) this.chart = new Chart(ctx, config);
    },
    getDataType() {
      return this.option_data_selected.name;
    },
    changeDataType: function () {
      let option = this.$refs["menuValue"].getCurrentOption();
      if (option.name == this.option_data_selected.name) return;

      this.option_data_selected = option;
      this.changeCurrentOption(this.option_data_selected.name, false);
      console.log(option.name);
    },
    changeGroup: function () {
      let option = this.$refs["menuGroup"].getCurrentOption();
      if (option.name == this.option_group_selected.name) return;

      this.option_group_selected = option;
      this.groupBy = this.option_group_selected.name;
      this.changeCurrentOption(this.option_group_selected.name, true);
      console.log(option.name);
    },
    changeCurrentOption(id, groubBy) {
      this.updateGraph(id, groubBy);
    },
     updateGraph(id, groupBy) {
      //if change groupBy get new by API
      console.log(id + groupBy);
      let loader = this.$loading.show({
        canCancel: false,
        backgroundColor: "#000",
        color: "#fff",
      });
      if (this.thereIsData())
      {this.getData(
        this.campagna.id,
        this.from,
        this.to,
        this.groupBy,
        this.withTracks
      ).then(
        (stats) => {
          loader.hide();
          console.log(stats);
          this.originalStats = stats.data;
          this.buildChart(this.originalStats);
        },
        (err) => {
          EventBus.$emit("snack-open");
          console.log(err);
          loader.hide();
        }
      )} else {
        loader.hide();
      }
    },
    changeMode(mode) {
      if (this.mode == mode) return;
      this.mode = mode;
      this.buildChart(this.originalStats);
    },
  },
  created() {
        this.$store.dispatch("storePage", {title:"Le mie performance",back:true});

  },
   mounted() {
    //get stats with default value in creation hook
    let loader = this.$loading.show({
      canCancel: false,
      backgroundColor: "#000",
      color: "#fff",
    });
    if ( this.thereIsData())
    {this.getData(
      this.campagna.id,
      this.from,
      this.to,
      this.groupBy,
      this.withTracks
    ).then(
      (stats) => {
        console.log(stats);
        this.originalStats = stats.data;
        this.buildChart(this.originalStats);
        loader.hide();
      },
      (err) => {
        EventBus.$emit("snack-open");
        console.log(err);
        loader.hide();
      }
    )} else {
        loader.hide();
    }
  },
  computed: {
    campagna() {
      return this.$store.getters.campagna;
    },
    options() {
      return [
        { name: "co2saved", view_name: "CO2 Salvata", default: false },
        { name: "trackCount", view_name: "Viaggi Validi", default: false },
      ].concat(
        this.campagna.means.map((x) => {
          return {
            name: STATS_DISTANCE[x].name,
            view_name: STATS_DISTANCE[x].view_name,
            default:
              STATS_DISTANCE[Object.keys(STATS_DISTANCE)[0]].name ==
              STATS_DISTANCE[x].name,
          };
        })
      );
    },
  },
};
</script>

<style>
.group:hover .group-hover\:scale-100 {
  transform: scale(1);
}
.group:hover .group-hover\:-rotate-180 {
  transform: rotate(180deg);
}
.scale-0 {
  transform: scale(0);
}
.min-w {
  min-width: 10rem;
}

td {
  @apply py-2;
}
</style>
