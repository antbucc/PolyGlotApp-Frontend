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
              mode == 'GRAPH' ? ' border-blue-300 border-b-4 text-blue-300' : ''
            "
            @click="changeMode('GRAPH')"
            style="font-size:1.1vw"
          >
            Graph
          </button>
        </nav>
      </div>
      <div class="
        flex
        w-full
        items-center
        px-6
        h-16
        bg-primary
        text-white text-gray-700
        z-10"
      >
        <div class="flex items-center">
          <span class="text-xl">{{ aTitle }}</span>
        </div>
      </div>
      <div class="bg-opacity-0 py-2">
        <div
          v-show="mode == 'TAB'"
          class="justify-center text-center w-full text-xl"
        >
          <div
            class="
              flex flex-col
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
                There are no analytics.
              </div>
            </template>
            <template v-else>
              <div>
                <table
                  class="table-fixed justify-center text-center w-full text-xl bg-white rounded-lg"
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
              <div>
                <!--filtro-->
              </div>
            </template>
          </div>
        </div>
        <div
          id="chart_container"
          v-show="mode == 'GRAPH'"
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
                There are no analytics.
              </div>
            </template>
            <template v-else>
              <div>
                <!--grafico-->
              </div>
              <div>
                <!--filtro-->
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Analytic",
  props: {
    id: String,
    title: String
  },
  data: function () {
    return {
        aId: this.id,
        aTitle: this.title,
        mode: "TAB",
        table: {
          head: [],
          data: [
            ["Risposte corrette",80],
            ["Risposte sbagliate",20],
            ["Senza risposta",15],
            ["Senza partecipazione",5]],
          firstHead: true
        },
        graph: {
          type: "pie",
          series: [],
          options: {}
        },
        filter: {
          
        }
    };
  },
  methods: {
    changeMode(mode) {
      if (this.mode == mode) return;
      this.mode = mode;
    }
  },
};
</script>

<style>
  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
  }
</style>