<template>

<div class="flex flex-col lg:flex-row bg-primary contact">
    <div class="lg:w-4/12 lg:my-2" style=" margin: auto; font-size:0.9vw">
      <form
        action=""
        class="
          form
          flex flex-col
          bg-white
          p-6
          lg:rounded-xl
          justify-center
        "
        style=" text-align:center;  width:30vw; height:30vw"
      >
        <img
          style="
            margin-top: 50px;
            margin-bottom: 50px;
            margin-left: auto;
            margin-right: auto;
            max-height: 100px;
            width:8vw;
          "
          src="../../public/logo.png"
          alt="PolyGlot"
        />
        <h2 style="margin:auto; font-size:1.5vw; margin-bottom:10px">What is PolyGlot?</h2>
    <div class="text-center">
    </div>
    <p style="margin-bottom:auto">
     PolyGlot is an app born to increase and incentivize students's attention during lessons, following the concept of Gamification (using game-design elements in contexts different from games to achieve some goals). In particular, <b>Teachers</b> create quizzes 
     about their lesson topics and share it to their students, which respond. The app then assign rewards like points, levels or bonuses for completing exercises successfully.
     This <b>incentivize students</b>, keep them <b>engaged</b>, and <b>encourage healthy competition</b> among classmates and peers.
     </p>
    <br />


      </form>
    </div>
  </div>

<!--
  

  -->
</template>

<script>
export default {
  name: "Info",
  created() {
    this.$store.dispatch("storePage", { title: "Info", back: false });
  },
};
</script>

<style></style>
