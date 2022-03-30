<template>
  <div class="flex flex-col lg:flex-row bg-primary contact" >
    <div
      class=" pb-6 lg:w-7/12 lg:my-2 text-white text-center lg:text-left md:pl-6 lg:pb-0 lg:pl-12"
    >
      <h1 class="text-6xl font-bold" style="font-size:2em">Contact Us!</h1>
      <h2 class="text-2xl pb-2 font-semibold" style="font-size:1em">
        We'll be happy to answer your questions.
      </h2>
      <p style="font-size:1em">
        Contact us by this email address:
        <a class="font-bold" href="mailto: email@fbk.eu">email@fbk.eu</a>.
      </p>
      <p style="font-size:1em">
        Otherwise, compile this form and we will contact you as soon as possible.
      </p>

      <div class="hidden   md:bg-white md:-ml-6 md:max-h-full">
        <img class="object-cover md:object-scale-down h-auto bg-opacity-0" />
      </div>
    </div>
    <div class="lg:w-4/12 lg:my-2 justify-center" style=" margin-left: 0; margin-right:0; font-size:0.9em; ">
      <form
        style="width: 25em; height: 30em; text-align:center; margin:auto"
        action=""
        class="form flex flex-col bg-white p-6 lg:rounded-xl justify-center"  
      >
        <div
          class="flex flex-col md:flex-row  mt-3 justify-stretch lg:flex-col"
        >
          <input
            type="email"
            name=""
            id=""
            required
            placeholder="Email * "
            class="focus:border-blue-600  border-2  p-2 flex-1 md:ml-2 lg:ml-0"
            style="border-color: #ffa700;"
          />
        </div>

        <textarea
          name=""
          id=""
          rows="3"
          required
          placeholder="Inserisci qua il tuo messaggio * "
          class="focus:border-blue-600  border-2  p-2 mt-3 w-full"
          style="border-color: #ffa700;"
        ></textarea>
        <p class="font-bold text-sm mt-3">Privacy Policy *</p>
        <div class="flex items-baseline space-x-2 mt-2">
          <input type="checkbox" name="" id="" required class="inline-block check-campaign" />
          <p class="text-gray-600 text-xs " style="font-size:0.7em">

            Pursuant to art. 13 of the EU Regulation n. 2016/679 (GDPR), the personal data provided will be processed in order to be able to respond to your request through manual, IT and telematic tools, however suitable for guaranteeing the security and confidentiality of the data. The complete Privacy Policy is available at the following link
            {LINK}. I declare that I have read and understood the information on the processing of personal data.


          </p>
        </div>
        <div
          class="btn-class"
          style="height: 3em;
              width: 10em;margin:auto"
        >
          <button class="btn-class" style="
          font-size: 1em; 
          width: 10em;
          height: 2em;">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contatti",
  created() {
        this.$store.dispatch("storePage", {title:"Contacts", back:false });
  },
};
</script>

<style>
/* prova



.nav-link{
    @apply px-4 py-2 mt-2 text-2xl text-white bg-blue-600 transition ease-in-out duration-150
}

.nav-link:hover{
    @apply bg-blue-500
}


*/

.contact {
  height: 100vh;
}
</style>
