<template>
  <div class="
    flex
    flex-col
    bg-background
    rounded-lg
    shadow-xl
    items-start
    p-5
    lg: min-h-full
  "> <!--inline-flex-->
    <template v-for="(filter,index) in filters">
      <div class="flex flex-row justify-center text-md" :key="filter.ref">
        <label class="text-right ml-auto mr-4 mt-1">{{ filter.title }}</label>
        <context-menu
          :ref="filter.ref"
          class="mr-auto"
          @click.native="changeOption(filter.ref,index)"
          :_options="filter.options"
        />
      </div>
    </template>
  </div>
</template>

<script>
import ContextMenu from "../Components/ContextMenu.vue";
export default {
    name: "AnalyticFilter",
    props: {
      aId: String,
      filters: Array
    },
    components: {
        ContextMenu
    },
    data: function () {
      return {
        analyticId: this.aId,
      }
    },
    methods: {
      changeOption: function (ref,index) {
        let option = this.$refs[ref][0].getCurrentOption(); //Da sistemare struttura ref, perchè [0] non è bellissimo
        if (option.name == this.filters[index].selected.name) return;

        this.filters[index].selected.name = option.name;
        this.filters[index].selected.view_name = option.view_name;
        //this.changeCurrentOption(this.option_data_selected.name, false);
        this.$emit("update",index)
        console.log(this.filters[index].selected.name);
      }
    }
}
</script>