<template>
  <div class="bg-primary">
    <button class="btn-sizing" @click="$router.push('/pendings')">Back</button>
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
        <!--bottoni-->
        <div class="row">
          <button class="app-button" @click.prevent="myFunction()">Reject</button>
          <button class="app-button">Start</button>
        </div>
        <div class="row">
          <h1> Reject token left: 3</h1>
        </div>
        </div>
        </div>
      </div>
</template>

<script>
export default {
  name: "Pendings1",
  methods: {
    myFunction() {
      this.$swal({
        title: "Reject token",
        text: "Do you wanna use a reject token?",
        showCancelButton: true,
        showCloseButton: false,
        showLoaderOnConfirm: true,
      }).then(() => {
        this.$swal('You use 1 reject token ');
      })
    }
  },
  created() {
    this.$store.dispatch("storePage", {title: "Pendings1", back: false});
    this.table = {
      head: [
        "",
        "",
      ],
      data: [
        ["Challenger:", "Alice"],
        ["Opponent:", "Alice"],
        ["Topic:", "Topic1"],
        ["Difficulty:", 3],
        ["Hours left:",2],
      ],
      firstHead: true
    };
  },
}
</script>

<style scoped>
.app-button{
  background-color: white;
  width: 150px;
  margin:0 20px;
  display:inline-block;
  line-height: 60px;
  border-radius: 8px;
}
.row {
  text-align: center;
  margin-left: -20px;
  marin-right: -20px;
}

</style>