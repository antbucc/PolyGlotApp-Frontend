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
      <thead>
      <tr v-show="table.head.length">
        <template v-for="(cell, index) in table.head">
          <th class="w-1/2" :key="index">{{ cell }}</th>
        </template>
      </tr>
      </thead>
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
  </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "History",
  methods: {
    rowColor(result) {
      var color;
      if(result=="Done"){
        color="green";
        return color;
      }else if(result=="Rejected"){
        color="red";
        return color;
      }else{
        color="yellow";
        return color;
      }
    }

  },
  created() {
    this.$store.dispatch("storePage", {title: "History", back: false});
    this.table = {
      head: [
        "Opponent",
        "Result",
        "Points",
        "Challenger",
      ],
      data: [
        ["Alice","Done",+10,"Yes"],
        ["Alice","Done",+10,"No"],
        ["Alice","Rejected",0,"Yes"],
        ["Alice","Rejected",0,"No"]
      ],
      firstHead: true
    };
  },
}
</script>

<style scoped>

</style>