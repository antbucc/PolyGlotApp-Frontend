<template>
  <div class="flex flex-col lg:flex-row bg-primary contact">
    <div class="lg:w-4/12 lg:my-2" style="margin: auto; font-size: 0.9em">
      <form
        action=""
        class="form flex flex-col bg-white p-6 lg:rounded-xl justify-center"
        style="width: 25em; height: 40em; text-align:center; margin:auto"
      >
        <div class="quiz-header">
          <!-- Header della card -->
          <img src="../../public/logo.png" alt="PolyGlot" />
        </div>

        <div class="step-progress" :style="{ width: progress + '%' }"></div>
        <!-- Barra di progresso del quiz -->

        <div class="quiz-main">
          <!-- Parte principale del quiz, con domanda e risposte -->
          <div class="box-question">
            <!-- Box della domanda dentro la card -->
            <b><h1 style="
          font-size: 1.2em; ">Here will be displayed a question</h1></b>
            <!-- Pesca la domanda da quelle definite, poi le pescheremo da db -->
          </div>
          <div class="box-answers">
            <!-- Box delle risposte alla suddetta domanda -->
            <ul style="width: 30em;font-size: 1em; ">
              <li></li>
              <!-- Uso li vuoto come linea di divisione tra domanda e risposte -->
              <li>
                <!-- Pesco le risposte dalle domande e controllo se sono corrette o meno; se cliccate me lo dirà -->
                answer1
                <!-- Aggiunte grafiche per risposte corrette o non, mettere prossimo x tic e cross <div class="fas fa-check" v-if="select ? ans.correct: ''"></div><div class="fas fa-times" v-if="select ? !ans.correct: ''"></div>-->
              </li>
              <li>answer2</li>
              <li>answer3</li>
              <li>answer4</li>
              <li></li>
            </ul>
          </div>
        </div>
        
          <!-- Parte ai piedi della card, in cui avrò il bottone per procedere di domanda , da aggiungere poi  v-if="score_show == false" -->
          <div class="btn-class"
          style="height: 3em;
              width: 10em; margin-left: auto; margin-right: auto; margin-top:auto; margin-bottom:auto; ">
            <!-- Ci sarà bottone solo se il quiz non sarà completo, da aggiungere poi v-if="progress < 100"-->
            <button class="btn-class" style="
          font-size: 1em; 
          width: 10em;
          height: 2em;">
              Avanti
            </button>
            <!-- da aggiungere poi @click="nextQuestion" -->
          </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Quiz",
  methods: {
    retrieveQuestion() {
      // here I retrieve the list of courses
      const token = sessionStorage.getItem("token");
      var apiUrl =
        process.env.VUE_APP_BASE_URL + process.env.VUE_APP_NEXT_QUESTION;

      let url = apiUrl + "?token=" + token + "&courseid=" + "4";

      var config = {
        method: "get",
        url: url,
      };
      //var self = this;
      axios(config)/*
        .then(function (response) {
          // here I need to extract the content of a question retrieved with Title, description, etc..
          self.$alert(
            "Question Name: " +
              response.data.questionname +
              "<br>" +
              " Question Text: " +
              response.data.questiontext
          );
        })*/
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created() {
    this.$store.dispatch("storePage", { title: "Quiz", back: false });
    this.response = this.retrieveQuestion();
  },
};
</script>

<style></style>
