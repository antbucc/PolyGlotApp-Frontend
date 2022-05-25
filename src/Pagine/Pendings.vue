<template>
  <div class="bg-primary">
    <button class="btn-sizing" @click="$router.push('/challenges')">Back</button>
    <div class="flex flex-col bg-primary">
      <div class="text-md w-full">
      <div class="btn-vert">
        <!--come sfidato-->
        <form
            action=""
            class="
              form
              flex flex-col
              p-6
              lg:rounded-xl
              justify-center"
            style=" text-align:center;  width:35em; height:5em; margin:auto">
          <h1>As challenged</h1>
        </form>
        <form
            action=""
            class="
          form
          flex flex-col
          bg-white
          p-6
          lg:rounded-xl
          justify-center"
            style=" text-align:center;  width:35em; height:5em; margin:auto">
          <button class="btn-sizing" @click="$router.push('/pendings1')">Alice: 2 hours left</button>
        </form>
        <!--come sfidante-->
        <form
            action=""
            class="
              form
              flex flex-col
              p-6
              lg:rounded-xl
              justify-center"
            style=" text-align:center;  width:35em; height:5em; margin:auto">
          <h1>As challenger</h1>
        </form>
        <form
            action=""
            class="
          form
          flex flex-col
          bg-white
          p-6
          lg:rounded-xl
          justify-center"
            style=" text-align:center;  width:35em; height:5em; margin:auto">
          <button class="btn-sizing" @click="$router.push('/pendings')">Mattia: 7 hours left</button>
        </form>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "Pendings",
  created() {
    this.$store.dispatch("storePage", {title: "Pendings", back: false});
  },
}
</script>

<style scoped>
.btn-vert {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>