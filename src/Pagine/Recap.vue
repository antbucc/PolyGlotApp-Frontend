<template>
  <div class="bg-primary">
    <div class="flex flex-col bg-primary">
      <div class="text-md w-full">
        <form
            action=""
            class="
              form
              flex flex-col
              bg-white
              p-6
              lg:rounded-xl
              justify-center"
            style=" text-align:center;  width:25em; height:20em; margin:auto"
        >
          <div><h2 style="margin:auto; font-size:2em; margin-top:0px">You win!</h2></div>
          <div style="margin:auto; margin-top:20px"><h3>You earn: 10 points</h3></div>
          <div><h3>You moved up by 2 positions in the leaderboards</h3></div>
          <button class="btn-sizing" @click="$router.push('/recap')">Go to leaderboard</button>
          <button class="btn-sizing" @click="$router.push('/challenges')">Return to challenges</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recap",
  created() {
    this.$store.dispatch("storePage", { title: "Recap", back: false });
  },
}
</script>

<style scoped>
.btn-sizing{
  margin:auto;
  text-align: center;
  background-color: #3085d6;
  border-radius: 15px;
  width:15em;
  height:3em;
}
</style>