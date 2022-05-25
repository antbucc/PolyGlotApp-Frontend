<template>
  <div class="bg-primary">
    <div class="flex flex-col bg-primary">
      <div class="text-md w-full">
          <form>
            <label for="topic" class="l-txt">Choose a topic:</label>
            <select id="topic" name="topic" class="l-txt">
              <option value="topic1">Topic1</option>
              <option value="topic2">Topic2</option>
              <option value="topic3">Topic3</option>
            </select>
          </form>
        <form>
          <label for="diff" class="l-txt">Choose difficulty:</label>
          <select id="diff" name="diff" class="l-txt">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </form>
        <div class="row">
          <button class="app-button" @click="$router.push('/challenges')">Cancel</button>
          <button class="app-button" @click="$router.push('/createdchallenge')">Create</button>
        </div>


      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Newchallenge",
  created() {
    this.$store.dispatch("storePage", {title: "New Challenge", back: false});
  },
}
</script>

<style scoped>
.row {
  text-align: center;
  margin-left: -20px;
  marin-right: -20px;
}
.app-button{
  background-color: white;
  width: 150px;
  margin:0 20px;
  display:inline-block;
  line-height: 60px;
  border-radius: 8px;
}
.l-txt{
  width: 200px;
  margin:0 20px;
  display:inline-block;
  line-height: 60px;
  border-radius: 8px;
}
</style>