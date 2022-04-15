<template>
  <router-link :to="{name: 'analytic', params: { id: aId, title: aTitle }}">
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
            class="text-2xl font-semibold break-normal"
            style="font-size: 1em"
          >
            {{ aTitle }}
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
  },
  data: function () {
    return {
      aId: this.id,
      aTitle: this.title,
    };
  },
};
</script>