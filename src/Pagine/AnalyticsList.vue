<template>
  <div class="bg-primary">
    <div class="flex flex-col bg-primary">
      <div class="bg-opacity-0 py-2">
        <div
          class="
            flex
            px-6
            bg-primary
            text-white text-gray-700
            z-10
            justify-center
          "
        >
          <div class="flex">
            <span class="text-2xl font-semibold">{{
              selectedCourse.title
            }}</span>
          </div>
        </div>
        <div
          class="
            flex flex-col
            sm:flex-row sm:flex-wrap sm:justify-center
            md:px-12
          "
        >
          <template v-if="!this.analytics.length">
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
          <template v-else v-for="analytic in this.analytics">
            <!-- gestire no courses se mycampaign è vuoto -->
            <template style="overflow: hidden">
              <analytic-card
                class="sm:px-2"
                :key="analytic.id"
                :id="analytic.id"
                :title="analytic.title"
                :custom="analytic.custom"
                :chartType="analytic.chartType"
                :buildTable="analytic.buildTable"
                :buildFilters="analytic.buildFilters"
              />
              <!--Mettere id corso-->
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AnalyticCard from "../Components/AnalyticCard.vue";
import axios from "axios";

export default {
  name: "AnalyticsList",
  components: { AnalyticCard },
  props: {
    title: String,
    category: Number,
  },
  data: function () {
    return {
      selectedCourse: {},
      analytics: [],
      mode: "EDU",
    };
  },
  methods: {
    retrieveAnalytics() {
      let url =
        process.env.VUE_APP_BASE_URL + process.env.VUE_APP_ANALYTICS_SUMMARY;
      let apiUrl = url + "?courseid=" + this.selectedCourse.id + "&category=" + this.category + "&token=" + sessionStorage.getItem("token");
      axios.get(apiUrl).then((response) => {
        response.data.forEach((element) => {
          this.analytics.push({
            id: element._id,
            title: element.title,
            custom: element.custom,
            chartType:
              element.chart != undefined
                ? element.chart.options.chart.type
                : "",
            buildTable: element.buildTable,
            buildFilters: element.buildFilters,
          });
        });
      });
    },
  },
  created() {
    this.$store.dispatch("storePage", { title: this.title, back: false });
    this.selectedCourse = JSON.parse(sessionStorage.getItem("courses"))[
      sessionStorage.getItem("selectedCourse")
    ];
    this.retrieveAnalytics();
  },
};
</script>

<style></style>