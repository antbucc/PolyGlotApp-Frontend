<template>
  <div
    class="
      top-0
      left-0
      absolute
      w-full
      bg-transparent
      flex
      justify-center
      p-0
      z-5
    "
    :class="{ flex: open, hidden: !open }"
  > <!--absolute crea problemi con tabelle piccole (sfondo troppo corto e non si allunga con la finestra)-->
    <div
      class="
        p-4
        bg-white
        border-2
        border-black
        text-neutral
        flex flex-col
        items-center
        rounded-lg
        m-2
        max-w-sm
      "
    >
      <div
        class="form flex flex-col bg-white lg:rounded-xl justify-center"
        style="text-align: center;"
      >
        <div class="quiz-header">
          <!-- Header della card -->
          <img
            src="../../public/logo.png"
            alt="PolyGlot"
            style="width: 10em; margin-bottom: 20px"
          />
        </div>

        <!-- Barra di progresso del quiz -->
          <h1 style="text-decoration: underline; margin-top:5px; margin-bottom:5px;">
            <b>{{ quiz.name }}</b>
          </h1>
          <h2 class="mb-2" style="display: inline; margin-left: auto; margin-right: auto; font-size:0.7em">
            <b>{{
              quiz.type == "multichoice"
                ? "MULTICHOICE QUESTION"
                : quiz.type == "truefalse"
                ? "TRUE/FALSE QUESTION"
                : ""
            }}</b><br />
            <b>TOPIC: {{ quiz.topic }}</b><br />
            <b>DIFFICULTY: {{ quiz.difficulty }}</b><br />
            <b>DATE: {{ quiz.date.toLocaleDateString("en-GB") }}</b><br />
            <b>TIME SPENT: {{ quiz.time }}</b><br />
          </h2>
        <b
          ><h1
            style="font-size: 1em; margin-left: auto; margin-right: auto"
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
                width: 15em;
                font-size: 1.1em;
                margin-left: auto;
                margin-right: auto;
              "
              id="ansUl"
            >
            </ul>
          </div>
        </div>
      </div>
      <button
        class="bg-primary font-medium rounded-md px-4 py-2"
        @click="$emit('close')"
      >
        Close
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuizResultsDialog",
  props: {
    open: Boolean,
  },
  data: function () {
    return {
      correct: [],
      quiz: {
        questionid: "",
        name: "",
        topic: "",
        type: "",
        difficulty: 0,
        questiontext: "",
        answers: [],
        date: new Date(),
        outcome: "",
        time: 0,
      }
    };
  },
  methods: {
    changeQuiz(quiz) {
      this.quiz = quiz;
      this.viewQuiz();
    },
    viewQuiz() {
      document.getElementById("text").innerHTML = this.quiz.questiontext;

      let list = document.getElementById("ansUl");
      list.innerHTML = "";
      this.correct = [];

      for (let obj in this.quiz.answers) {
        //check if correct
        if (this.quiz.answers[obj].fraction > 0) {
          this.correct.push(obj);
        }

        //declare the li
        var answer = document.createElement("li");

        answer.id = obj; //nel db le risposte non hanno un id
        answer.className = "answers";
        switch (this.quiz.answers[obj].format) {
          case "html":
            answer.innerHTML = this.quiz.answers[obj].text;
            break;
        }

        //append every li to ul
        list.appendChild(answer);
      }

      var resps = document.getElementsByTagName("li");
      //control all answers and color the right ones of green and the wrong ones of red
      for (var i = 0; i < resps.length; i++) {
        if (this.correct.includes(resps[i].id)) {
          resps[i].setAttribute(
            "style",
            "background-color:#19b533; text-align: center; color:white; font-size: 1.1em;  "
          );
        } else {
          resps[i].setAttribute(
            "style",
            "background-color:#b52919; text-align: center; color:white; font-size: 1.1em; "
          );
        }
      }
    },
  },
  mounted() {
    this.response = this.viewQuiz();
  }
};
</script>