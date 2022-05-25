<template>
  <div class="bg-primary">
    <div class="flex flex-col bg-primary">
      <div class="text-md w-full">
    <div class="btn-vert">
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
      <button class="btn-sizing" @click="$router.push('/pendings')">Pendings: 2</button>
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
      <button class="btn-sizing" @click="$router.push('/newchallenge')">Create new</button>
    </form>
    <form
        action=""
        class="
        form
        flex flex-col
        p-6
        lg:rounded-xl
        justify-center"
        style=" text-align:center;  width:35em; height:5em; margin:auto">
        <h1>Weekly starting challenges: 2</h1>
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
      <button class="btn-sizing" @click="$router.push('/history')">History</button>
      </form>
    </div>
  </div>
  </div>
    </div>
</template>

<script>
export default {
  name: "Challenges",
  created() {
    this.$store.dispatch("storePage", { title: "Challenges", back: false });
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
.btn-sizing{
  width:30em;
  height:5em;
}
</style>