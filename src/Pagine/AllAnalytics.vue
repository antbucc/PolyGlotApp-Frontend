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
              mode == 'EDU' ? 'border-blue-300 border-b-4 text-blue-300' : ''
            "
            @click="changeMode('EDU')"
            
            style="font-size:1.1vw"
          >
            Educational</button>
          <button
            class="flex-1 py-2 px-6 block focus:outline-none hover:bg-blue-700"
            :class="
              mode == 'GAME' ? ' border-blue-300 border-b-4 text-blue-300' : ''
            "
            @click="changeMode('GAME')"
            style="font-size:1.1vw"
          >
            Game
          </button>
          <button
            class="flex-1 py-2 px-6 block focus:outline-none hover:bg-blue-700"
            :class="
              mode == 'TECH' ? ' border-blue-300 border-b-4 text-blue-300' : ''
            "
            @click="changeMode('TECH')"
            style="font-size:1.1vw"
          >
            Techninc
          </button>
        </nav>
      </div>
      <div class="bg-opacity-0 py-2">
        <div class="
          flex
          px-6
          bg-primary
          text-white
          text-gray-700
          z-10
          justify-center"
        >
          <div class="flex">
            <span class="text-2xl font-semibold">{{ selectedCourse.title }}</span>
          </div>
        </div>
        <div
          v-show="mode == 'EDU'"
          class="justify-center text-center w-full text-xl"
        >
          <div
            class="
              flex flex-col
              sm:flex-row sm:flex-wrap sm:justify-center
              md:px-12
            "
          >
            <template v-if="!this.analytics[0].length">
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
            <template v-else v-for="analytic in this.analytics[0]">
              <!-- gestire no courses se mycampaign è vuoto -->
              <template style="overflow: hidden">
                <analytic-card
                  class=""
                  :key="analytic.id"
                  :id="analytic.id"
                  :title="analytic.title"
                /> <!--Mettere id corso-->
              </template>
            </template>
          </div>
        </div>
        <div
          id="chart_container"
          v-show="mode == 'GAME'"
          class="justify-center text-center w-full text-xl"
        >
          <div
            class="
              flex flex-col
              sm:flex-row sm:flex-wrap sm:justify-center
              md:px-12
            "
          >
            <template v-if="!this.analytics[1].length">
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
            <template v-else v-for="analytic in this.analytics[1]">
              <template>
                <analytic-card
                  class=""
                  :key="analytic.id"
                  :id="analytic.id"
                  :title="analytic.title"
                />
              </template
            ></template>
          </div>
        </div>
        <div
          id="chart_container"
          v-show="mode == 'TECH'"
          class="justify-center text-center w-full text-xl"
        >
          <div
            class="
              flex flex-col
              sm:flex-row sm:flex-wrap sm:justify-center
              md:px-12
            "
          >
            <template v-if="!this.analytics[2].length">
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
            <template v-else v-for="analytic in this.analytics[2]">
              <template>
                <analytic-card
                  class=""
                  :key="analytic.id"
                  :id="analytic.id"
                  :title="analytic.title"
                />
              </template
            ></template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AnalyticCard from "../Components/AnalyticCard.vue";
  
  export default {
    name: 'AllAnalytics',
    components: { AnalyticCard },
    data: function () {
      return {
        selectedCourse: {},
        analytics: [
          [
            {
              id: "1",
              title: "Riassunto quiz"
            },
            {
              id: "2",
              title: "Confronto quiz argomento"
            }
          ],
          [
            {
              id: "3",
              title: "Temp example"
            }
          ],
          []
        ],
        mode: "EDU"
      }
    },
    methods: {
      changeMode(mode) {
        if (this.mode == mode) return;
        this.mode = mode;
      }
    },
    created() {
      this.$store.dispatch("storePage", { title: "Analytics", back: false });
      this.selectedCourse = JSON.parse(sessionStorage.getItem("courses"))[sessionStorage.getItem("selectedCourse")];
    }
  }
</script>

<style></style>