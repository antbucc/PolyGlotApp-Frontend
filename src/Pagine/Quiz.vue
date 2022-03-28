<template>
  <div class="flex flex-col lg:flex-row bg-primary contact">
    <div class="lg:w-4/12 lg:my-2" style="margin: auto; font-size: 0.9em">
      <form
        action=""
        class="form flex flex-col bg-white p-6 lg:rounded-xl justify-center"
        style="
          width: 50em;
          height: 50em;
          text-align: center;
          margin: auto;
          overflow-y: scroll;
          scrollbar-width: none;
        "
      >
        <div class="quiz-header">
          <!-- Header della card -->
          <img
            src="../../public/logo.png"
            alt="PolyGlot"
            style="width: 10em; margin-bottom: 20px"
          />
        </div>

        <div class="step-progress" :style="{ width: progress + '%' }"></div>
        <!-- Barra di progresso del quiz -->

        <div class="quiz-main" style="margin-top: 10px">
          <!-- Parte principale del quiz, con domanda e risposte -->
          <h1 style="text-decoration: underline"><b id="type"></b></h1>
          <div class="box-question">
            <!-- Box della domanda dentro la card -->
            <b
              ><h1
                style="font-size: 1.3em; margin-left: auto; margin-right: auto"
                id="text"
              ></h1
            ></b>
            <!-- Pesca la domanda da quelle definite, poi le pescheremo da db -->
          </div>
          <div class="box-answers">
            <!-- Box delle risposte alla suddetta domanda -->
            <ul
              style="
                width: 35em;
                font-size: 1.1em;
                margin-left: auto;
                margin-right: auto;
              "
              id="ansUl"
            >
              <!-- <li 
              v-for="(obj, index) in this.currAnswers"
              :key="index" v-bind="index">{{obj}}</li> -->
            </ul>
            <!-- Ci sarà bottone solo se il quiz non sarà completo, da aggiungere poi v-if="progress < 100"-->
            <button
              class="button-cl"
              style="
                font-size: 1.1em;
                width: 10em;
                height: 2em;
                margin-left: auto;
                margin-right: auto;
                margin-bottom: 30px;
              "
              id="next"
              @click="$router.push('/quiz')"
            >
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
  data: function () {
    return {
      correct: [],
    };
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
          document.getElementById("text").innerHTML = nxtQuestion.questiontext;
          var type = nxtQuestion.questiontype;
          console.log(type);
          if (type == "multichoice") {
            document.getElementById("type").innerHTML = "MULTICHOICE QUESTION";
          } else if (type == "truefalse") {
            document.getElementById("type").innerHTML = "TRUE/FALSE QUESTION";
          }
          this.retrieveAnswers(nxtQuestion.questionid);
          
          document.getElementById("next").disabled = true;
        }
      });
    },
    retrieveAnswers(id) {
      const token = sessionStorage.getItem("token");
      var apiUrl =
        process.env.VUE_APP_BASE_URL + process.env.VUE_APP_QUESTION_OPTION;

      let url = apiUrl + "?token=" + token + "&questionid=" + id;

      axios.get(url).then((response) => {
        if (response.data == "error") {
          console.log("Error during answer extraction");
        } else {
          let allAns = response.data.answers;
          this.correct.push(response.data.correct[0]);
          console.log("correct is: " + this.correct[0]);
          var obj = 0;
          for (obj in allAns) {
            //declare the li
            var currentAns = allAns[obj].answer;
            var answer = document.createElement("li");
            answer.id = allAns[obj].id;
            answer.className = "ans grow answers";
            answer.innerHTML = currentAns;
            //add event listener on click to every li generated
            answer.addEventListener('click', () => {
                this.check(answer.id, this.correct[0])
            });
          
            //append every li to ul
            document.getElementById("ansUl").appendChild(answer);
            }
        }
      });
    },
    assign(answers){
        for(var i=0; i<answers.length; i++){
            answers[i].addEventListener
          }
    },
    check(id, correct){
      console.log(id+ "  "+ correct)
      if(id === correct){
                    console.log("correct")
                      this.$swal({
                        title: "Your answer is correct!",
                        text: "Your points will be now updated.",
                        showCancelButton: false,
                        confirmButtonText: "Close",
                        showCloseButton: false,
                        showLoaderOnConfirm: true,
                      })
                  }else{
                    console.log("wrong")
                    this.$swal({
                        title: "Your answer is wrong...",
                        text: "Your points will be now updated.",
                        showCancelButton: false,
                        showCloseButton: false,
                        showLoaderOnConfirm: true,
                      })
                  }
    }
  },
  created() {
    this.$store.dispatch("storePage", { title: "Quiz", back: false });
    this.response = this.retrieveQuestion();
    
  },
};
</script>

<style></style>
