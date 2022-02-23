<template>

<div class="flex flex-col lg:flex-row bg-primary contact">
    <div class="lg:w-4/12 lg:my-2" style=" margin: auto; position:relative">
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
        style=" text-align:center; height:35em; width:35em;"
      >
        <img
          style="
            margin-top: 50px;
            margin-bottom: 50px;
            margin-left: auto;
            margin-right: auto;
            max-height: 100px;
          "
          src="../../public/logo.png"
          alt="PolyGlot"
        />
    <div class="text-center">
    </div>
    <div class="text-center text-primary">
     Il progetto e' stato sviluppato da
    </div>
    <div class="center">
        <img src="@/assets/images/fbk.png" alt="fbk" class="h-auto w-48 m-auto" @click="openTab('https://www.fbk.eu')"   style="margin-top:30px" />
        <img src="@/assets/images/logoUNITN.png" alt="fbk" class="h-auto w-48 m-auto" @click="openTab('https://www.unitn.it')"  style="margin-top:30px"  />
    </div>


      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Credits",
  created() {
    this.$store.dispatch("storePage", { title: "Credits", back: false });
  },
  methods: {
    openTab(url){
      window.open(url, '_blank');
    }
  },
};
</script>

<style></style>
