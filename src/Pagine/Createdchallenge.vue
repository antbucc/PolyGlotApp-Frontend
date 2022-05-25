<template>
  <div class="bg-primary">
    <button class="btn-sizing" @click="$router.push('/challenges')">Back</button>
    <div class="flex flex-col bg-primary">
      <div class="text-md w-full">
        <!--tabella-->
        <table
            class="
          table-fixed
          justify-center
          text-center
          w-full
          text-xl
          bg-white
          rounded-lg">
          <tbody>
          <template v-for="(row, rowIndex) in table.data">
            <tr :key="rowIndex">
              <template v-for="(cell,index) in row">
                <th v-if="table.firstHead && index == 0" :key="index">{{ cell }}</th>
                <td v-else class="" :key="index">{{ cell }}</td>
              </template>
            </tr>
          </template>
          </tbody>
        </table>
        <div>
          <form
              action=""
              class="
                form
                flex flex-col
                p-6
                lg:rounded-xl
                justify-center"
              style=" text-align:center;  width:35em; height:5em; margin:auto">
            <h1>This weekly you can still create: 2 Challenges</h1>
          </form>
        </div>
        <div>
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
            <button class="btn-sizing">Start</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Createdchallenge",
  created() {
    this.$store.dispatch("storePage", {title: "Challenge successfully created!", back: false});
    this.table = {
      head: [
        "",
        "",
      ],
      data: [
        ["Opponent:", "Alice"],
        ["Topic:", "Topic1"],
        ["Difficulty:", 3],
        ["Hours left:",12],
      ],
      firstHead: true
    };
  },
}
</script>

<style scoped>

</style>