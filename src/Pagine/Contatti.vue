<template>
  <div class="flex flex-col lg:flex-row bg-primary contact">
    <div
      class=" pb-6 lg:w-7/12 lg:my-2 text-white text-center lg:text-left md:pl-6 lg:pb-0 lg:pl-12"
    >
      <h1 class="text-6xl font-bold">Contact Us!</h1>
      <h2 class="text-2xl pb-2 font-semibold">
        We'll be happy to answer your questions.
      </h2>
      <p>
        Contact us by this email address:
        <a class="font-bold" href="mailto: email@fbk.eu">email@fbk.eu</a>.
      </p>
      <p>
        Otherwise, compile this form and we will contact you as soon as possible.
      </p>

      <div class="hidden   md:bg-white md:-ml-6 md:max-h-full">
        <img class="object-cover md:object-scale-down h-auto bg-opacity-0" />
      </div>
    </div>
    <div class="lg:w-4/12 lg:my-2" style="border-color:#ffa700; margin-left:auto; margin-right:auto">
      <form
        style="margin-top:auto; margin-bottom:auto ; width:30vw"
        action=""
        class="form flex flex-col bg-white p-6 relative lg:rounded-xl justify-center "
      >
        <div
          class="flex flex-col md:flex-row  mt-3 justify-stretch lg:flex-col"
        >
          <input
            type="text"
            name=""
            id=""
            required
            placeholder="Nome e Cognome * "
            class=" focus:border-blue-600  border-2  p-2  mb-2 md:mb-0 lg:mb-2 flex-1 md:mr-2 lg:mr-0"
            style="border-color: #ffa700;"
          />
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
          <p class="text-gray-600 text-xs ">

            Pursuant to art. 13 of the EU Regulation n. 2016/679 (GDPR), the personal data provided will be processed in order to be able to respond to your request through manual, IT and telematic tools, however suitable for guaranteeing the security and confidentiality of the data. The complete Privacy Policy is available at the following link
            {LINK}. I declare that I have read and understood the information on the processing of personal data.


          </p>
        </div>
        <input
          type="submit"
          value="Send Email"
          class=" mt-6 bg-blue-600 hover:bg-blue-500 text-white font-semibold p-3 md:self-end flex-1 lg:mx-8"
          style="
            width: 150px;
            height: 35px;
            outline: none;
            border: 0;
            color: white;
            font-size: 18px;
            cursor: pointer;
            border-radius: 15px;
            margin: auto;
            background-color:#ffa700;"
        />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contatti",
  created() {
        this.$store.dispatch("storePage", {title:"Contacts",back:false});
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
