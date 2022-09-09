<template>
  <div class="bg-primary">
    <div class="flex flex-col bg-primary relative">
      <div class="bg-opacity-0 py-2">
        <div class="text-center w-full text-xl">
          <div class="flex flex-col px-8">
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
                There are no quizzes.
              </div>
            </template>
            <template v-else>
              <div
                class="
                  py-2
                  bg-primary
                  text-white
                  w-full
                  text-left
                  flex flex-col
                  md:flex-row
                "
              >
                <div
                  class="flex w-auto place-content-center md:place-content-left"
                >
                  <button
                    class="
                      mr-3
                      px-3
                      rounded-full
                      text-primary
                      bg-white
                      self-center
                    "
                    @click="goBack()"
                  >
                    Back
                  </button>
                </div>
                <div class="w-full text-center md:text-left">
                  <span class="text-2xl font-semibold">{{
                    selectedCourse.title
                  }}</span>
                </div>
              </div>
              <!--tabella/Elenco-->
              <div class="hidden md:flex w-full">
                <table
                  cellspacing="0"
                  class="
                    table-fixed
                    justify-center
                    text-center
                    w-full
                    text-xl
                    bg-white
                    border-separate
                  "
                >
                  <thead class="sticky" style="top: 62px">
                    <tr>
                      <th colspan="2" class="bg-white">Date</th>
                      <th colspan="2" class="bg-white">Topic</th>
                      <th class="bg-white">Outcome</th>
                      <th class="bg-white">Solution</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-for="(row, rowIndex) in quizzes">
                      <tr :key="rowIndex">
                        <td colspan="2">{{ row.date.toLocaleDateString("en-GB") }}</td>
                        <td colspan="2">{{ row.topic }}</td>
                        <td :class="{
                              'bg-secondary': row.outcome == 'OK',
                              'bg-warning': row.outcome == 'PARTIAL',
                              'bg-danger': row.outcome == 'NOK',
                              'bg-gray': row.outcome == 'NOANSWER',
                            }"
                        >
                          {{
                            row.outcome == "OK"
                              ? "Success"
                              : row.outcome == "PARTIAL"
                              ? "Partial"
                              : row.outcome == "NOK"
                              ? "Failed"
                              : row.outcome == "NOANSWER"
                              ? "No Answer"
                              : "-"
                          }}
                        </td>
                        <td>
                          <button @click="viewQuiz(rowIndex)" :disabled="show">
                            <eye-icon />
                          </button>
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
              <div class="flex md:hidden w-full flex-col">
                <template v-for="(quiz, quizIndex) in quizzes">
                  <div :key="quizIndex" class="w-full py-2 text-black">
                    <div
                      class="flex flex-wrap w-full bg-white rounded"
                    >
                      <div class="flex w-full sm:w-1/2 flex-col">
                        <div class="flex pl-3">
                          <label class="text-left">Date:</label>
                          <label class="text-black text-left pl-2">{{
                            quiz.date.toLocaleDateString("en-GB")
                          }}</label>
                        </div>
                        <div class="flex pl-3">
                          <label class="text-left">Topic:</label>
                          <label class="text-black text-left pl-2">{{
                            quiz.topic
                          }}</label>
                        </div>
                      </div>
                      <div class="flex w-full sm:w-1/2 flex-col">
                        <div class="flex pl-3">
                          <label class="text-left">Outcome:</label>
                          <label
                            class="text-left pl-2"
                            :class="
                              quiz.outcome == 'OK'
                                ? 'text-secondary'
                                : quiz.outcome == 'PARTIAL'
                                ? 'text-warning'
                                : quiz.outcome == 'NOK'
                                ? 'text-danger'
                                : quiz.outcome == 'NOANSWER'
                                ? 'text-gray'
                                : ''
                            "
                          >
                            {{
                              quiz.outcome == "OK"
                                ? "Success"
                                : quiz.outcome == "PARTIAL"
                                ? "Partial"
                                : quiz.outcome == "NOK"
                                ? "Failed"
                                : quiz.outcome == "NOANSWER"
                                ? "No Answer"
                                : "-"
                            }}
                          </label>
                        </div>
                        <div class="flex pl-3">
                          <label class="text-left pl-1"
                            >View quiz:
                            <button
                              @click="viewQuiz(quizIndex)"
                              :disabled="show"
                            >
                              <eye-icon /></button
                          ></label>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </template>
          </div>
        </div>
      </div>
      <quiz-results-dialog ref="dialog" :open="show" @close="show = false" />
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
    category: Number,
  },
  components: {
    QuizResultsDialog,
  },
  data() {
    return {
      quizzes: [
        {
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
        },
      ],
      selectedCourse: {},
      show: false,
    };
  },
  methods: {
    goBack() {
      let path;
      switch (this.category) {
        case 0:
          path = "/learningStatus";
          break;
        case 1:
          path = "/gameStatus";
          break;
        default:
          path = "/courses";
          break;
      }
      this.$router.push(path);
    },
    viewQuiz(position) {
      this.$refs["dialog"].changeQuiz(this.quizzes[position]);
      this.show = true;
    },
    async retrieveQuizzes() {
      var apiUrl = process.env.VUE_APP_BASE_URL + process.env.VUE_APP_ANSWERS;
      let url = apiUrl + "?playerId=" + sessionStorage.getItem("player");
      await axios.get(url).then((response) =>
        response.data.forEach((answer) => {
          this.quizzes.push({
            questionid: answer.question.idnumber,
            name: answer.question.name,
            topic: answer.question.topic,
            type: answer.question.type,
            difficulty: Number.parseInt(answer.question.difficulty.split("-")[1]),
            questiontext: answer.question.questiontext,
            answers: answer.question.answer,
            date: new Date(answer.date),
            outcome: answer.outcome,
            time: answer.time,
          });
        })
      );
      this.quizzes.shift();
    },
  },
  created() {
    this.$store.dispatch("storePage", { title: this.title, back: false });
    this.selectedCourse = JSON.parse(sessionStorage.getItem("courses"))[
      sessionStorage.getItem("selectedCourse")
    ];
    this.retrieveQuizzes();
  },
};
</script>

<style>
table {
  border: 1px solid black;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
  overflow: hidden;
  text-overflow: ellipsis;
}
.name {
  background-color: #dfdfdf;
}
.informations {
  border-bottom: 3px solid black;
}
</style>