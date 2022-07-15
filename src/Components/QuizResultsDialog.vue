<template>
  <div
    class="
      top-0
      left-0
      absolute
      w-full
      min-h-full
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
      "
    >
      <div
        class="form flex flex-col bg-white p-6 lg:rounded-xl justify-center"
        style="text-align: center; width: 25em; height: 40em; margin: auto"
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
        <pre><h1 style="text-decoration: underline; margin-top:5px; margin-bottom:5px;"><b id="type"></b></h1><h2 style="display: inline; margin-left: auto; margin-right: auto; font-size:0.7em"><b>TOPIC: THIS TOPIC  -  DIFFICULTY: {{this.difficulty}}</b></h2></pre>
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
    id: String,
    difficulty: Number,
    type: String,
    questiontext: String,
    answers: Array
  },
  data: function () {
    return {
      correct: [],
    };
  },
  methods: {
    viewQuiz() {
      document.getElementById("text").innerHTML = this.questiontext;
      
      if (this.type == "multichoice") {
        document.getElementById("type").innerHTML = "MULTICHOICE QUESTION";
      } else if (this.type == "truefalse") {
        document.getElementById("type").innerHTML = "TRUE/FALSE QUESTION";
      }

      let list = document.getElementById("ansUl");
      list.innerHTML = "";
      this.correct = [];

      for (let obj in this.answers) {
        //check if correct
        if (this.answers[obj].fraction > 0) {
          this.correct.push(obj);
        }

        //declare the li
        var answer = document.createElement("li");

        answer.id = obj; //nel db le risposte non hanno un id
        answer.className = "answers";
        switch (this.answers[obj].format) {
          case "html":
            answer.innerHTML = this.answers[obj].text;
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
            "background-color:#19b533  ; text-align: center; color:white; width: 15em; font-size: 1.1em;  "
          );
        } else {
          resps[i].setAttribute(
            "style",
            "background-color:#b52919;  text-align: center; color:white; width: 15em;font-size: 1.1em; "
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