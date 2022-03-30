<template>
  <div class="flex flex-col lg:flex-row bg-primary contact">
    <div class="lg:w-4/12 lg:my-2" style="margin: auto; font-size: 0.9em">
      <form
        action=""
        class="form flex flex-col bg-white p-6 lg:rounded-xl justify-center"
        style="width: 50em; height: 50em; text-align: center; margin: auto"
      >
        <div class="quiz-header">
          <!-- Header della card -->
          <img
            src="../../public/logo.png"
            alt="PolyGlot"
            style="width: 10em; margin-bottom: 20px"
          />
        </div>

        <div class="step-progress" :style="{ width: this.percentage + '%' }"></div>
        <!-- Barra di progresso del quiz -->
        <pre><h1 style="text-decoration: underline; margin-top:5px; margin-bottom:5px;"><b id="type"></b></h1><h2 style="display: inline; margin-left: auto; margin-right: auto"><b>TOPIC: THIS TOPIC  -  DIFFICULTY: EASY</b></h2></pre>
        <b
          ><h1
            style="font-size: 1.3em; margin-left: auto; margin-right: auto"
            id="text"
          ></h1
        ></b>
        <div
          class="quiz-main"
          style="margin-top: 10px; overflow-y: auto; scrollbar-width: thin"
        >
          <!-- Parte principale del quiz, con domanda e risposte -->

          <div class="box-question">
            <!-- Box della domanda dentro la card -->

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

            <!-- da aggiungere poi @click="nextQuestion" -->
          </div>
        </div>
        <button
          class="button-cl"
          style="
            font-size: 1.1em;
            width: 10em;
            height: 2em;
            margin-top: 10px;
            margin-left: auto;
            margin-right: auto;
            margin-bottom: 20px;
          "
          id="next"
          @click="$router.push('/quiz')"
        >
          Avanti
        </button>
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
      percentage: 100, //this will be the question time
      intval: 0,
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
            answer.addEventListener("click", () => {
              this.check(answer.id, this.correct[0]);
            });

            //append every li to ul
            document.getElementById("ansUl").appendChild(answer);
          }
        }
      });
    },
    assign(answers) {
      for (var i = 0; i < answers.length; i++) {
        answers[i].addEventListener;
      }
    },
    check(id, correct) {
      console.log(id + "  " + correct);
      // later we will also manage the empty answer, using the time bar expire
      if (id === correct && id!=null) { //case in which we click the right answer
        console.log("correct");
        this.$swal({
          title: "Your answer is correct!",
          text: "Your points will be now updated.",
          showCancelButton: false,
          confirmButtonText: "Close",
          showCloseButton: false,
          showLoaderOnConfirm: true,
        });
        clearInterval(this.intval);   //stop time bar
      } else if(id !== correct && id!=null){ //case in which we click a wrong answer
        console.log("wrong");
        this.$swal({
          title: "Your answer is wrong...",
          text: "Your points will be now updated.",
          showCancelButton: false,
          showCloseButton: false,
          showLoaderOnConfirm: true,
        });
        clearInterval(this.intval); //stop time bar
      }else if(id == null){ //case in which we don't click any answer
        console.log("empty");
        this.$swal({
          title: "You didn't answer in time...",
          text: "Your points will be now updated.",
          showCancelButton: false,
          showCloseButton: false,
          showLoaderOnConfirm: true,
        });
        clearInterval(this.intval); 
        this.$router.push("/courses");
      }
    },
  },
  computed: {
    percent() {
      return this.percentage.toFixed();
    },
  },
  async created() {
    this.$store.dispatch("storePage", { title: "Quiz", back: false });
    this.response = this.retrieveQuestion();
    var per = 100;
    this.intval = setInterval(() => {
      if (this.percentage > 0) this.percentage -= per/10      //this is 100/maxquestiontime (in this case, max = 10s). for example, if we want to be maximum 20 seconds, we will write 5 
      else if (this.percentage == 0){
        clearInterval(this.intval); // here we will call the check to see if there is null answer
        this.check();
      }
    }, 1000);
  },
};
</script>

<style></style>
