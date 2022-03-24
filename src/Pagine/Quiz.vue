<template>
  <div class="flex flex-col lg:flex-row bg-primary contact">
    <div class="lg:w-4/12 lg:my-2" style="margin: auto; font-size: 0.9em">
      <form
        action=""
        class="form flex flex-col bg-white p-6 lg:rounded-xl justify-center"
        style="width: 50em; height: 50em; text-align:center; margin:auto; overflow-y:scroll; scrollbar-width: none"
      >
        <div class="quiz-header">
          <!-- Header della card -->
          <img src="../../public/logo.png" alt="PolyGlot" style="width:10em; margin-bottom:20px " />
        </div>

        <div class="step-progress" :style="{ width: progress + '%' }"></div>
        <!-- Barra di progresso del quiz -->

        <div class="quiz-main" style="margin-top:10px">
          <!-- Parte principale del quiz, con domanda e risposte -->
          <div class="box-question">
            <!-- Box della domanda dentro la card -->
            <b><h1 style="
          font-size: 1.3em; margin-left:auto; margin-right:auto " id="text"></h1></b>
            <!-- Pesca la domanda da quelle definite, poi le pescheremo da db -->
          </div>
          <div class="box-answers">
            <!-- Box delle risposte alla suddetta domanda -->
            <ul style="width: 35em;font-size: 1.1em; margin-left:auto; margin-right:auto">
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
            <!-- Ci sarà bottone solo se il quiz non sarà completo, da aggiungere poi v-if="progress < 100"-->
            <button class="button-cl" style="
          font-size: 1.1em; 
          width: 10em;
          height: 2em; margin-left:auto; margin-right:auto; margin-bottom:30px" @click="$router.push('/quiz')">
              Avanti
            </button>
            <!-- da aggiungere poi @click="nextQuestion" -->
          </div>
          
        </div>
        
          <!-- Parte ai piedi della card, in cui avrò il bottone per procedere di domanda , da aggiungere poi  v-if="score_show == false" -->
          
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Quiz",
  data: function(){
    return{
      currQuestion: [],
      currAnswers: [],
      questId: String,
    }
  },
  methods: {
    retrieveQuestion() {
      // here I retrieve the list of courses
      const token = sessionStorage.getItem("token");
      var apiUrl =
        process.env.VUE_APP_BASE_URL + process.env.VUE_APP_NEXT_QUESTION;

      let url = apiUrl + "?token=" + token + "&courseid=" + "4";

      axios.get(url).then((response) => {
        if (response.data == "error") {
          console.log("Error during question extraction");
        } else {
          let nxtQuestion = response.data;
          console.log("question " + nxtQuestion.questiontext);
          this.questId = nxtQuestion.questionid;
          console.log(this.questId)
          document.getElementById('text').innerHTML = nxtQuestion.questiontext;
        }
      });
    },
    retrieveAnswers(){
      const token = sessionStorage.getItem("token");
      const qid = this.questId;
      var apiUrl =
        process.env.VUE_APP_BASE_URL + process.env.VUE_APP_QUESTION_OPTION;

      //let url = apiUrl + "?token=" + token + "&questionid=" + qid;

      axios.get(apiUrl, {
        body: {
          token: token,
          questionid: qid,
        }
      }).then((response) => {
        console.log(response.data);
        if (response.data == "error") {
          console.log("Error during answer extraction");
        } else {
          let allAns = response.data;
          var obj = 0;
          for (obj in allAns) {
            var currentAns = allAns[obj]; //currentpoints are the points we have defined until now, that are inside the player status pointconcept
            this.currAnswers.push(currentAns);

          }
          console.log("answers " + currentAns)  
        }
      });
    }
  },
  created() {
    this.$store.dispatch("storePage", { title: "Quiz", back: false });
    this.response = this.retrieveQuestion();
    this.response = this.retrieveAnswers();
  },
};
</script>

<style></style>
