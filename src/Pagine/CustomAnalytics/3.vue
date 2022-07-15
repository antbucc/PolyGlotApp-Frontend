<template>
  <div class="bg-primary">
    <div class="flex flex-col bg-primary relative">
      <div class="bg-opacity-0 py-2">
        <div class="justify-center text-center w-full text-xl">
          <div
            class="
              flex flex-col
              sm:flex-row sm:flex-wrap sm:justify-center
              md:px-12
            "
            ref="sibiling"
          >
            <template v-if="/*!this.analytics[0].length*/ false">
              <div
                class="
                  m-auto
                  justify-center
                  flex flex-col-reverse
                  bg-white
                  rounded-lg
                  w-full
                  my-4
                  text-center
                  justify-center
                  shadow-xl
                  p-12
                "
              >
                There are no quizes.
              </div>
            </template>
            <template v-else>
              <div class="flex-col p-2 bg-primary text-white text-gray-700">
                <div class="flex">
                  <span class="text-2xl font-semibold">{{
                    selectedCourse.title
                  }}</span>
                </div>
              </div>
              <!--tabella-->
              <table
                class="
                  table-fixed
                  justify-center
                  text-center
                  w-full
                  text-xl
                  bg-white
                  rounded-lg
                  logTable
                "
              >
                <thead>
                  <tr>
                    <th colspan="7" class="name">Name</th>
                  </tr>
                  <tr>
                    <th class="informations">Type</th>
                    <th class="informations">Topic</th>
                    <th class="informations">Difficulty</th>
                    <th class="informations">Date</th>
                    <th class="informations">Outcome</th>
                    <th class="informations">Time</th>
                    <th class="informations">Points</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(row, rowIndex) in quizes">
                    <tr :key="rowIndex + '-name'">
                      <td align="center" colspan="7" class="name">
                        {{ row.name }}
                        <button @click="show = true"><eye-icon /></button>
                      </td>
                    </tr>
                    <tr :key="rowIndex + '-informations'">
                      <template
                        v-for="(cell, index) in (({
                          topic,
                          type,
                          difficulty,
                          date,
                          outcome,
                          time,
                          points,
                        }) => ({
                          topic,
                          type,
                          difficulty,
                          date,
                          outcome,
                          time,
                          points,
                        }))(row)"
                      >
                        <td
                          :key="index"
                          class="informations"
                          :class="
                            cell == 'Success'
                              ? 'bg-secondary'
                              : cell == 'Parzial'
                              ? 'bg-warning'
                              : cell == 'Fail'
                              ? 'bg-danger'
                              : ''
                          "
                        >
                          {{ cell }}
                        </td>
                      </template>
                    </tr>
                  </template>
                </tbody>
              </table>
            </template>
          </div>
        </div>
      </div>
      <quiz-results-dialog
        v-if="loaded"
        :open="show"
        @close="show = false"
        :id="quizes[quizToView].idnumber"
        :difficulty="quizes[quizToView].difficulty"
        :type="quizes[quizToView].type"
        :questiontext="quizes[quizToView].questiontext"
        :answers="quizes[quizToView].answer"
      />
      <!--:style="absoluteAlternatives"-->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import QuizResultsDialog from "../../Components/QuizResultsDialog.vue";
export default {
  name: "GameStatusSwitch",
  props: {
    id: String,
    title: String,
  },
  components: {
    QuizResultsDialog,
  },
  data() {
    return {
      quizes: [
        {
          idnumber: "",
          name: "",
          topic: "",
          type: "",
          difficulty: 0,
          questiontext: "",
          answer: [],
          date: "",
          outcome: "",
          time: 0,
          points: 0,
        },
      ],
      selectedCourse: {},
      show: false,
      quizToView: 0,
      loaded: false,
    };
  },
  methods: {
    async retrieveQuizes() {
      var apiUrl = process.env.VUE_APP_BASE_URL + process.env.VUE_APP_QUESTIONS;
      let url = apiUrl + "?course=" + this.selectedCourse.title;
      await axios.get(url).then((response) =>
        response.data.forEach((quiz) => {
          this.quizes.push({
            id: quiz.idnumber,
            name: quiz.name,
            topic: quiz.topic,
            type: quiz.type,
            difficulty: Number.parseInt(quiz.difficulty.split("-")[1]),
            questiontext: quiz.questiontext,
            answer: quiz.answer,
          });
        })
      );
      let answeredQuizes = [
        {
          idnumber: "8",
          date: new Date().toLocaleDateString("en-GB"),
          outcome: "Success",
          time: 7.000001,
          points: 103,
        },
      ]; //Mettere dati dinamici
      let tmpQuiz;
      for (const quiz of this.quizes) {
        tmpQuiz = answeredQuizes.find(
          (aQuiz) => aQuiz.idnumber == aQuiz.idnumber
        );
        if (tmpQuiz == undefined) {
          Object.assign(quiz, {
            date: "Never answered",
            outcome: "Expired quiz",
            time: 0,
            points: 0,
          });
        } else {
          Object.assign(quiz, tmpQuiz);
        }
      }
      this.quizes.shift();
      this.loaded = true;
    },
  },
  computed: {
    absoluteAlternatives() {
      return {
        "margin-top": -this.$refs["sibiling"].offsetHeight + "px",
      };
    },
  },
  created() {
    this.$store.dispatch("storePage", { title: this.title, back: false });
    this.selectedCourse = JSON.parse(sessionStorage.getItem("courses"))[
      sessionStorage.getItem("selectedCourse")
    ];
    this.retrieveQuizes();
  },
};
</script>

<style>
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
.logTable {
  border: 2px solid black;
  border-collapse: collapse;
}
.name {
  background-color: #dfdfdf;
}
td.name {
  border-top: 2px solid black;
}
.informations {
  border-bottom: 2px solid black;
}
</style>