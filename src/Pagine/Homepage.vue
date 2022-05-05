<template>
  <div class="home flex flex-col lg:flex-col">
    <div
      class="flex flex-col m-4 lg:w-5/12 lg:ml-16 lg:mt-16"
      style="text-align: center; margin: auto"
    >
      <div
        class="flex flex-col lg:w-5/12 lg:ml-16 lg:mt-16 bg-primary"
        style="text-align: center; margin: auto"
      >
        <img
          style="height: 5em"
          class="home-img object-contain"
          src="@/assets/images/home.png"
        />
      </div>
      <div
        class="lg:text-4xl text-xl lg:mt-8 mt-2 text-white"
        style="font-size: 2em"
      >
        POLYGLOT, A NEW FRONTIER IN LEARNING
      </div>
      <div
        class="lg:text-xl text-l lg:mt-4 mt-2 text-white"
        style="text-align: center; margin: auto; font-size: 1em"
      >
        <b>Teachers</b> assign rewards like points, levels or bonuses for
        completing exercises successfully. <b>Incentivize students</b>, keep
        them <b>engaged</b>, and <b>encourage healthy competition</b> among
        classmates and peers
      </div>
      <t-button
        class="w-5/12 mt-4 lg:mt-8 m-auto"
        variant="green"
        style="
          width: 150px;
          height: 35px;
          outline: none;
          border: 0;
          color: white;
          font-size: 18px;
          cursor: pointer;
          border-radius: 15px;
          background-color: #ffa700;
        "
        v-if="!auth"
        ><login-icon />
        <p class="text-center w-full" @click="$router.push('/login')">
          Login
        </p></t-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Homepage",
  created() {
    this.$store.dispatch("storePage", { title: "", back: false });
  },
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    login() {
      var authUrl = process.env.VUE_APP_AUTH_URL;
      var tokenId = process.env.VUE_APP_AUTH_TOKEN_ID;
      var redirectUri = process.env.VUE_APP_REDIRECT_URI;
      return window.open(
        authUrl +
          "response_type=token&client_id=" +
          tokenId +
          "&redirect_uri=" +
          redirectUri,
        "_self"
      );
    },
  },
};
</script>

<style scoped>
.home {
  background-color: var(--blue);
  /* height: 100vh; */
  min-height: 100vh;
}
.home-img {
  max-height: 24rem;
}
</style>
