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
                      <th colspan="6" class="name">Name</th>
                    </tr>
                    <tr>
                      <th colspan="4" class="bg-white">Topic</th>
                      <th class="bg-white">Difficulty</th>
                      <th class="bg-white">Time</th>
                    </tr>
                    <tr>
                      <th colspan="2" class="bg-white informations">Date</th>
                      <th colspan="2" class="bg-white informations">Type</th>
                      <th colspan="2" class="bg-white informations">Outcome</th>
                    </tr>
                    <!--<tr>
                      <th colspan="6" class="name">Name</th>
                    </tr>
                    <tr>
                      <th colspan="3" class="bg-white">Topic</th>
                      <th class="bg-white informations" rowspan="3">Difficulty</th>
                      <th class="bg-white informations" rowspan="3">Time</th>
                      <th class="bg-white informations" rowspan="3">Outcome</th>
                    </tr>
                    <tr>
                      <th colspan="3" class="bg-white">Date</th>
                    </tr>
                    <tr>
                      <th colspan="3" class="bg-white informations">Type</th>
                    </tr>-->
                  </thead>
                  <tbody>
                    <template v-for="(row, rowIndex) in quizzes">
                      <tr :key="rowIndex + '-name'">
                        <td align="center" colspan="6 " class="name">
                          {{ row.name }}
                          <button @click="viewQuiz(rowIndex)" :disabled="show">
                            <eye-icon />
                          </button>
                        </td>
                      </tr>
                      <tr :key="rowIndex + '-informations_1'">
                        <template
                          v-for="(cell, index) in (({
                            topic,
                            difficulty,
                            time,
                          }) => ({
                            topic,
                            difficulty,
                            time,
                          }))(row)"
                        >
                          <td
                            :key="index"
                            :colspan="index == 'topic' ? 4 : 1"
                          >
                            {{ cell }}{{ index == "time" ? "s" : "" }}
                          </td>
                        </template>
                      </tr>
                      <tr :key="rowIndex + '-informations_2'">
                        <template
                          v-for="(cell, index) in (({
                            date,
                            type,
                            outcome,
                          }) => ({
                            date,
                            type,
                            outcome,
                          }))(row)"
                        >
                          <td
                            :key="index"
                            colspan="2"
                            :class="{
                              'informations': rowIndex != quizzes.length - 1,
                              'bg-secondary': cell == 'OK',
                              'bg-warning': cell == 'PARTIAL',
                              'bg-danger': cell == 'NOK',
                              'bg-gray': cell == 'NOANSWER',
                            }"
                          >
                            {{
                              index == "date"
                                ? cell.toLocaleDateString("en-GB")
                                : cell == "OK"
                                ? "Success"
                                : cell == "PARTIAL"
                                ? "Partial"
                                : cell == "NOK"
                                ? "Failed"
                                : cell == "NOANSWER"
                                ? "No Answer"
                                : cell == "multichoice"
                                ? "Multichoice"
                                : cell == "truefalse"
                                ? "True/False"
                                : cell
                                
                            }}
                          </td>
                        </template>
                      </tr>
                      <!--<tr :key="rowIndex + '-name'">
                        <td align="center" colspan="6" class="name">
                          {{ row.name }}
                          <button @click="viewQuiz(rowIndex)" :disabled="show">
                            <eye-icon />
                          </button>
                        </td>
                      </tr>
                      <tr :key="rowIndex + '-informations_1'">
                        <template
                          v-for="(cell, index) in (({
                            topic,
                            difficulty,
                            time,
                            outcome,
                          }) => ({
                            topic,
                            difficulty,
                            time,
                            outcome,
                          }))(row)"
                        >
                          <td
                            :key="index"
                            :colspan="index == 'topic' ? 3 : 1"
                            :rowspan="index != 'topic' ? 3 : 1"
                            :class="{
                              'bg-secondary': cell == 'OK',
                              'bg-warning': cell == 'PARTIAL',
                              'bg-danger': cell == 'NOK',
                              'bg-gray': cell == 'NOANSWER',
                              'informations': rowIndex != quizzes.length-1 && index != 'topic',
                            }"
                          >
                            {{
                              index != "outcome"
                                ? cell
                                : cell == "OK"
                                ? "Success"
                                : cell == "PARTIAL"
                                ? "Partial"
                                : cell == "NOK"
                                ? "Failed"
                                : cell == "NOANSWER"
                                ? "No Answer"
                                : ""
                            }}
                          </td>
                        </template>
                      </tr>
                      <tr :key="rowIndex + '-informations_2'">
                        <td colspan="3">{{ row.date.toLocaleDateString('en-GB') }}</td>
                      </tr>
                      <tr :key="rowIndex + '-informations_3'">
                        <td colspan="3" :class="rowIndex != quizzes.length-1 ? 'informations' : ''">
                          {{
                            row.type == "multichoice"
                              ? "Multichoice"
                              : row.type == "truefalse"
                              ? "True/False"
                              : row.type
                          }}
                        </td>
                      </tr>-->
                    </template>
                  </tbody>
                </table>
              </div>
              <div class="flex md:hidden w-full flex-col">
                <template v-for="(quiz, quizIndex) in quizzes">
                  <div :key="quizIndex" class="w-full py-2 text-black">
                    <div
                      class="
                        text-white
                        bg-background
                        hover:bg-background_darker
                        border-2 border-black
                        rounded-lg
                        py-2.5
                        flex flex-row
                        w-full
                      "
                      @click="
                        quizzes[quizIndex].expanded =
                          !quizzes[quizIndex].expanded
                      "
                    >
                      <label class="text-black w-full text-left pl-2">{{
                        quiz.name
                      }}</label>
                      <select-arrow-down-icon
                        v-if="!quizzes[quizIndex].expanded"
                        fillColor="#000000"
                        :size="29"
                        class="pr-2"
                      />
                      <select-arrow-up-icon
                        v-else
                        fillColor="#000000"
                        :size="29"
                        class="pr-2"
                      />
                    </div>
                    <!-- Dropdown menu -->
                    <div
                      class="w-full z-10 bg-white rounded flex-col sm:flex-row"
                      :class="{
                        hidden: !quizzes[quizIndex].expanded,
                        flex: quizzes[quizIndex].expanded,
                      }"
                    >
                      <div class="w-full flex-col">
                        <template
                          v-for="(value, property) in (({
                            topic,
                            date,
                            difficulty,
                            outcome,
                          }) => ({
                            topic,
                            date,
                            difficulty,
                            outcome,
                          }))(quiz)"
                        >
                          <div
                            :key="property"
                            class="flex flex-row w-full pl-3"
                          >
                            <label class="text-left"
                              >{{
                                property.charAt(0).toUpperCase() +
                                property.slice(1)
                              }}:</label
                            >
                            <label
                              class="text-left pl-1"
                              :class="
                                property != 'outcome'
                                  ? ''
                                  : value == 'OK'
                                  ? 'text-secondary'
                                  : value == 'PARTIAL'
                                  ? 'text-warning'
                                  : value == 'NOK'
                                  ? 'text-danger'
                                  : value == 'NOANSWER'
                                  ? 'text-gray'
                                  : ''
                              "
                            >
                              {{
                                property == "date"
                                  ? value.toLocaleDateString("en-GB")
                                  : property != "outcome"
                                  ? value
                                  : value == "OK"
                                  ? "Success"
                                  : value == "PARTIAL"
                                  ? "Partial"
                                  : value == "NOK"
                                  ? "Failed"
                                  : value == "NOANSWER"
                                  ? "No Answer"
                                  : ""
                              }}
                            </label>
                          </div>
                        </template>
                      </div>
                      <div class="w-full flex-col">
                        <template
                          v-for="(value, property) in (({
                            type,
                            time,
                          }) => ({
                            type,
                            time,
                          }))(quiz)"
                        >
                          <div
                            :key="property"
                            class="flex flex-row w-full pl-3"
                          >
                            <label class="text-left"
                              >{{
                                property.charAt(0).toUpperCase() +
                                property.slice(1)
                              }}:</label
                            >
                            <label class="text-left pl-1">
                              {{
                                property != "type"
                                  ? value
                                  : value == "multichoice"
                                  ? "Multichoice"
                                  : value == "truefalse"
                                  ? "True/False"
                                  : value
                              }}{{ property == "time" ? "s" : "" }}
                            </label>
                          </div>
                        </template>
                        <div class="flex flex-row w-full pl-3">
                          <label class="text-left pl-1"
                            >Visualize quiz:
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
          answer: [],
          date: new Date(),
          outcome: "",
          time: 0,
          expanded: false,
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
      this.$refs["dialog"].changeQuiz(
        this.quizzes[position].questionid,
        this.quizzes[position].difficulty,
        this.quizzes[position].type,
        this.quizzes[position].questiontext,
        this.quizzes[position].answer
      );
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
            answer: answer.question.answer,
            date: new Date(answer.date),
            outcome: answer.outcome,
            time: answer.time,
            expanded: false,
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