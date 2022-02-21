<template>
  <footer class="absolute w-full bg-gray-900 pb-6 " style="height: 4.5vw">
    <div class=" bg-white text-primary px-4 lg:ml-64">
      <hr class="mb-6 border-b-1 border-white" />
      <div
        class="flex flex-wrap items-center md:justify-between justify-center"
      >
         <div class="w-full lg:w-2/12 px-4 text-center lg:text-right">
          <div class="text-sm text-primary font-semibold py-1" style="font-size:0.8vw">
            Created by:
          </div>
        </div>
        <div class="w-full lg:w-2/12 px-4">
          <div class="text-sm text-primary font-semibold py-1">
            <img src="@/assets/images/logoUNITN.png" alt="fbk" class="object-contain h-12 w-auto p-1 m-auto lg:ml-1" @click="openTab('https://www.unitn.it')"  style="width:10vw; height: 2.5vw"  />
          </div>
        </div>
        <div class="w-full lg:w-2/12 px-4">
          <div class="text-sm text-primary font-semibold py-1">
            <img src="@/assets/images/fbk.png" alt="fbk" class="object-contain h-12 w-auto p-1 m-auto lg:ml-1" @click="openTab('https://www.fbk.eu')" style="width:10vw; height:2vw"   />
          </div>
        </div>
        

      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      date: new Date().getFullYear()
    }
  },
    methods: {
    openTab(url){
      window.open(url, '_blank');
    }
  },
}
</script>
<style>
footer{
  /* z-index: 999; */
  color: #1970b7;
  background-color: white;
      clear: both;
    position: relative;
    height: 50px;
    margin-top: -80px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

}
</style>
