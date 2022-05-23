<template>
  <div class="flex flex-col lg:flex-row bg-primary contact">
    <div class="lg:w-4/12 lg:my-2" style="font-size: 0.9em">
      <form
        action=""
        class="form flex flex-col bg-white p-6 lg:rounded-xl justify-center"
        style="width: 50em; height: 50em; text-align: center"
      >
        <div class="quiz-header">
          <!-- Header della card -->
          <img
            src="../../public/logo.png"
            alt="PolyGlot"
            style="width: 10em; margin-bottom: 20px"
          />
        </div>

        <div
          class="step-progress"
          :style="{ width: this.percentage + '%' }"
          style="text-align: center; justify-content: center"
        ></div>
        <h2 style="margin: auto; margin-bottom: 3px">
          Time Left: {{ this.seconds }} s
        </h2>
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
        <div
          style="
            justify-content: space-between;
            width: 80%;
            display: flex;
            margin: auto;
            margin-top: 20px;
          "
        >
          <button
            class="button-cl"
            id="delete"
            style="font-size: 1.1em; width: 10em; height: 2em"
          >
            Delete an answer
          </button>
          <button
            class="button-cl"
            id="change"
            style="font-size: 1.1em; width: 10em; height: 2em"
          >
            Change question
          </button>
          <button
            class="button-cl"
            id="add"
            style="font-size: 1.1em; width: 10em; height: 2em"
          >
            Add time
          </button>
        </div>
        <div>
          <button
            class="button-cl"
            style="
              font-size: 1.1em;
              width: 10em;
              height: 2em;
              margin-top: 20px;
              margin-left: auto;
              margin-right: auto;
              margin-bottom: 20px;
              position: relative;
            "
            id="next"
            @click="$router.push('/stats')"
          >
            Continue
          </button>
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
      percentage: 100, //this will be the question time
      intval: 0,
      seconds: 50,
      ansTime: 0,
      retPoints: [],
      points: true,
      difficulty: 0,
      tags: [],
    };
  },
  methods: {
    retrieveQuestion() {
      // here I retrieve the list of courses
      const token = sessionStorage.getItem("token");
      var apiUrl =
        process.env.VUE_APP_BASE_URL + process.env.VUE_APP_NEXT_QUESTION;
      //here i store the courseId clicked on quizzes to know from which course choose the questions
      var id = this.$route.params.courseId;
      let url = apiUrl + "?token=" + token + "&courseid=" + id;

      axios.get(url).then((response) => {
        if (response.data == "error") {
          console.log("User not enrolled in course.");
        } else {
          let nxtQuestion = response.data;
          let obj = 0;
          for (obj in nxtQuestion.tags) {
            this.tags.push(nxtQuestion.tags[obj]);
          }
          this.difficulty = this.tags[0].name.charAt(
            this.tags[0].name.length - 1
          );
          console.log("difficulty:" + this.difficulty);
          document.getElementById("text").innerHTML = nxtQuestion.questiontext;
          var type = nxtQuestion.questiontype;
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
          var obj = 0;
          for (obj in allAns) {
            //declare the li
            var currentAns = allAns[obj].answer;
            var answer = document.createElement("li");

            answer.id = allAns[obj].id;
            answer.className = "ans grow answers";
            answer.innerHTML = currentAns;

            //add event listener on click to every li generated
            //append every li to ul

            answer.addEventListener("click", (e) => {
              var id = "";
              var parent = e.target.parentElement;
              if (e.target.nodeName == "LI") {
                id = e.target.id;
              } else if (parent.nodeName == "LI") {
                id = parent.id;
              } else if (parent.parentElement.nodeName == "LI") {
                id = parent.parentElement.id;
              }

              this.check(id);
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
    doStuff() {
      alert(this.innerHTML);
    },
    check(pid) {
      // later we will also manage the empty answer, using the time bar expire
      var id = parseInt(pid);
      var correct = this.correct;
      var resps = document.getElementsByTagName("li");
      if (correct.includes(id) && !isNaN(id)) {
        //case in which we click the right answer
        console.log("correct");
        //call correctquestion api
        this.correctAns();
        //show alert with updated score
      } else if (!correct.includes(id) && !isNaN(id)) {
        console.log("wrong");
        //case in which we click a wrong answer
        this.wrongAns();
        /*this.$swal({
          title: "Your answer is wrong...",
          text: "Your points will be now updated.",
          showCancelButton: false,
          showCloseButton: false,
          showLoaderOnConfirm: true,
        });*/
      } else if (this.seconds == 0 && isNaN(id)) {
        console.log("time expired");

        //case in which we don't click any answer
        this.noAns();
        /*this.$swal({
          title: "You didn't answer in time...",
          text: "Your points will be now updated.",
          showCancelButton: false,
          showCloseButton: false,
          showLoaderOnConfirm: true,
        });*/
      }
      // does it in every case
      document.getElementById("next").disabled = false;
      document
        .getElementById("next")
        .setAttribute(
          "style",
          "background-color: #ffa700; cursor:pointer ; font-size: 1.1em; width: 10em; height: 2em;  margin-top: 20px; margin-left: auto; margin-right: auto; margin-bottom: 20px; position:relative;"
        );
      clearInterval(this.intval);
      //control all answers and color the right ones of green and the wrong ones of red
      for (var i = 0; i < resps.length; i++) {
        if (resps[i].id == correct) {
          resps[i].setAttribute(
            "style",
            "background-color:#19b533  ; font-weight: bold; color:white"
          );
        } else {
          resps[i].setAttribute(
            "style",
            "background-color:#b52919; font-weight: bold; color:white"
          );
        }
      }
      //set unclickable after check/time passed
      document
        .getElementById("ansUl")
        .setAttribute(
          "style",
          "width: 35em;font-size: 1.1em;margin-left: auto;margin-right: auto;pointer-events: none;"
        );

      document
        .getElementById("add")
        .setAttribute(
          "style",
          "background-color: #e7eae0; font-size: 1.1em; width: 10em; height: 2em; position:relative;"
        );
      document.getElementById("add").disabled = true;
      document
        .getElementById("change")
        .setAttribute(
          "style",
          "background-color: #e7eae0; font-size: 1.1em; width: 10em; height: 2em; position:relative;"
        );
      document.getElementById("change").disabled = true;
      document
        .getElementById("delete")
        .setAttribute(
          "style",
          "background-color: #e7eae0; font-size: 1.1em; width: 10em; height: 2em; position:relative;"
        );
      document.getElementById("delete").disabled = true;
    },
    correctAns() {
      //const token = sessionStorage.getItem("token");
      var url = process.env.VUE_APP_BASE_URL + "correctAnswer";
      var player = sessionStorage.getItem("player");
      //update the points by making a post request with playerid and time passed for answer
      axios.post(url, {
        playerId: player,
        quiz: {
          difficulty: this.difficulty, //this will be a string, retrieved inside the tag field in the question
          time: this.ansTime, //this will be a double, counted from the question start to when we answer
        },
      });

      this.retrievePoints();

      //var score = this.retPoints[1].score;  we will use this to tell how much the xp has increased
      this.$swal({
        title: "Point Score",
        text: "Correct! Your XP increased!",
        showCancelButton: false,
        showCloseButton: false,
        showLoaderOnConfirm: true,
      }); //disable every answerclick
    },
    noAns() {
      //const token = sessionStorage.getItem("token");
      var url = process.env.VUE_APP_BASE_URL + "noAnswer";
      var player = sessionStorage.getItem("player");
      //update the points by making a post request with playerid and time passed for answer
      axios.post(url, {
        playerId: player,
      });

      this.retrievePoints();

      //var score = this.retPoints[1].score; we will use this to tell how much the xp has increased
      this.$swal({
        title: "Point Score",
        text: "You have not answered. Your XP will not increase nor decrease",
        showCancelButton: false,
        showCloseButton: false,
        showLoaderOnConfirm: true,
      }); //disable every answerclick
    },
    wrongAns() {
      //const token = sessionStorage.getItem("token");
      var url = process.env.VUE_APP_BASE_URL + "wrongAnswer";
      var player = sessionStorage.getItem("player");
      //update the points by making a post request with playerid and time passed for answer
      axios.post(url, {
        playerId: player,
        quiz: {
          difficulty: this.difficulty, //this will be a string, retrieved inside the tag field in the question
        },
      });

      this.retrievePoints();

      //var score = this.retPoints[1].score; we will use this to tell how much the xp has decreased
      this.$swal({
        title: "Point Score",
        text: "Wrong! Your XP decreased...",
        showCancelButton: false,
        showCloseButton: false,
        showLoaderOnConfirm: true,
      }); //disable every answerclick
      //document.getElementsByTagName("li").removeEventListener("click", this.check())
    },
    retrievePoints() {
      const player = sessionStorage.getItem("player");

      var apiUrl =
        process.env.VUE_APP_BASE_URL + process.env.VUE_APP_PLAYER_STATUS;
      let url = apiUrl + "?playerId=" + player;
      axios.get(url).then((response) => {
        if (response.data == "error") {
          console.log("Error during stats extraction");
        } else {
          let allPoints = response.data.state.PointConcept;
          var obj = 0;
          for (obj in allPoints) {
            this.points = true;
            var currentPoints = allPoints[obj]; //currentpoints are the points we have defined until now, that are inside the player status pointconcept
            this.retPoints.push(currentPoints);
          }
        }
        //console.log(this.retPoints[0].score); // points saved in retPoints
      });
    },
  },
  computed: {
    percent() {
      return this.percentage.toFixed();
    },
  },
  created() {
    console.log("arrivo qui - creazione pagina Quiz.vue");
    //this.retrievePoints();
    this.$store.dispatch("storePage", { title: "Quiz", back: false });
    this.response = this.retrieveQuestion();

    /* var per = 100;
    this.intval = setInterval(() => {
      this.ansTime++;
      if (this.percentage > 0) {
        this.percentage -= per / 50;
        this.seconds -= 1;
      }
      //this is 100/maxquestiontime (in this case, max = 10s). for example, if we want to be maximum 20 seconds, we will write 5
      else if (this.percentage == 0) {
        clearInterval(this.intval); // here we will call the check to see if there is null answer
        this.check();
      }
    }, 1000);
    */
  },
};
</script>

<style></style>
