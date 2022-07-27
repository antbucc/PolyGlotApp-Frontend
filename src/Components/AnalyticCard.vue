<template>
  <router-link
    :to="{
      name: 'analytic',
      params: {
        id: id,
        title: title,
        category: category,
        custom: custom,
        chartType: chartType,
        buildTable: buildTable,
        buildFilters: buildFilters,
      },
    }"
  >
    <div
      class="
        m-auto
        justify-center
        flex flex-col
        lg:w-1/3
        bg-white
        rounded-lg
        my-4
        lg:mx-2
        xl:w-1/5
        justify-cente
        shadow-xl
        grow
      "
      style="height: 10em; width: 10em; word-wrap: break-word"
    >
      <div class="flex flex-col py-6 lg:mx-2 justify-center">
        <div class="px-2">
          <h2
            class="text-2xl font-semibold break-normal text-center"
            style="font-size: 1em"
          >
            {{ title }}
          </h2>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "AnalyticCard",
  props: {
    id: String,
    title: String,
    category: Number,
    custom: Boolean,
    chartType: String,
    buildTable: Boolean,
    buildFilters: Boolean,
  },
};
</script>