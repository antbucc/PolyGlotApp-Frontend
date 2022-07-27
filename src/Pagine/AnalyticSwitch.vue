<template>
  <component
    v-if="Analytic"
    :is="Analytic"
    :key="Analytic.__file"
    :id="id"
    :title="title"
    :category="category"
    :chartType="chartType"
    :buildTable="buildTable"
    :buildFilters="buildFilters"
  ></component>
</template>

<script>
export default {
  name: "AnalyticSwitch",
  props: {
    id: String,
    title: String,
    category: Number,
    custom: Boolean,
    chartType: String,
    buildTable: Boolean,
    buildFilters: Boolean,
  },
  data() {
    return {
      Analytic: null,
    };
  },
  methods: {
    updateComponent(params) {
      // The dynamic import
      if (params.custom) {
        import(`./CustomAnalytics/${params.id}.vue`).then((module) => {
          this.Analytic = module.default;
        });
      } else {
        import("./GeneralAnalytic.vue").then((module) => {
          this.Analytic = module.default;
        });
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    // When first entering the route
    next((vm) =>
      vm.updateComponent({ id: to.params.id, custom: to.params.custom })
    );
  },
  beforeRouteUpdate(to, from, next) {
    // When changing from one dynamic route to another
    this.updateComponent({ id: to.params.id, custom: to.params.custom });
    next();
  },
};
</script>