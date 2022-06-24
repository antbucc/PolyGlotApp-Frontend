<template>
  <component
    v-if="GameStatus"
    :is="GameStatus"
    :key="GameStatus.__file"
    :title="title"
    :category="category"
  ></component>
</template>

<script>
export default {
  name: "GameStatusSwitch",
  props: {
    title: String,
    category: Number,
  },
  data() {
    return {
      GameStatus: null,
    };
  },
  methods: {
    isStudent() {
      return sessionStorage.getItem("roles").includes("student");
    },
    updateComponent() {
      // The dynamic import
      if (this.isStudent()) {
        import(`./StudentGameStatus.vue`).then((module) => {
          this.GameStatus = module.default;
        });
      } else {
        import("./AnalyticsList.vue").then((module) => {
          this.GameStatus = module.default;
        });
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    // When first entering the route
    next((vm) => vm.updateComponent());
  },
  beforeRouteUpdate(to, from, next) {
    // When changing from one dynamic route to another
    this.updateComponent();
    next();
  }
};
</script>