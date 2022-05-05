
<template>
  <div class="bg-primary">
    <div class="flex flex-col bg-primary">
      <div class="text-md w-full">
        <nav class="flex flex-row text-white bg-primary">
          <button
            class="
              flex-1
              py-2
              px-6
              block
              focus:outline-none
              font-medium
              sm:bg-green-400
              hover:bg-blue-700
              w-full
            "
            :class="
              mode == 'I' ? 'border-blue-300 border-b-4 text-blue-300' : ''
            "
            @click="changeMode('I')"
            style="font-size: 1.1vw"
          >
            Available Quiz</button
          ><button
            class="flex-1 py-2 px-6 block focus:outline-none hover:bg-blue-700"
            :class="
              mode == 'B' ? ' border-blue-300 border-b-4 text-blue-300' : ''
            "
            @click="changeMode('B')"
            style="font-size: 1.1vw"
          >
            Challenges
          </button>
        </nav>
      </div>
      <div class="bg-opacity-0 py-2">
        <div
          v-show="mode == 'I'"
          class="justify-center text-center w-full text-xl"
        >
          <div class="box">
            <template>
              <!-- controllo se ho statistiche di questo studente in questo corso, se non ne ho mostro questo -->
              <div
                class="
                  m-auto
                  justify-center
                  flex flex-col
                  bg-white
                  rounded-lg
                  my-4
                  text-center
                  justify-center
                  shadow-xl
                  p-12
                "
                style="width: 35vw; font-size: 1.2vw; margin-bottom: 1vw"
              >
                <img
                  style="
                    margin-top: 1vw;
                    margin-bottom:1.5vw;
                    margin-left: auto;
                    margin-right: auto;
                    max-height: 100px;
                    width: 6vw;
                  "
                  src="../../public/logo.png"
                  alt="PolyGlot"
                />
                <h1 style="font-size: 1.2vw; margin-bottom: 5vw">
                  Here are displayed the courses you are registered for which a
                  new quiz is available. <b>Enjoy!</b>
                </h1>
                <ol style="text-align: center">
                  <li
                    v-for="obj in this.myCourses"
                    :key="obj.id"
                    :id="obj.id"
                    class="board"
                    style="cursor: pointer"
                    @click="doQuiz(obj.id)"
                  >
                    {{ obj.title }}
                  </li>
                </ol>
              </div>
            </template>
          </div>
        </div>
        <div
          id="chart_container"
          v-show="mode == 'B'"
          class="justify-center text-center w-full text-xl"
        >
          <div style="display: flex">
            <template>
              <!-- controllo se ho statistiche di questo studente in questo corso, se non ne ho mostro questo -->
              <div
                class="
                  m-auto
                  justify-center
                  flex flex-col-reverse
                  bg-white
                  rounded-lg
                  my-4
                  text-center
                  justify-center
                  shadow-xl
                  p-12
                "
                style="
                  width: 35vw;
                  height: 33vw;
                  font-size: 1.3vw;
                  margin-bottom: 1vw;
                "
              >
                <div>
                  <p style="margin-bottom: 2vw; font-size: 1.5vw">
                    Challenges received:
                    <br />
                  </p>
                  <ol style="font-size: 1vw">
                    <li class="board">TEAM F</li>
                    <li class="board">TEAM ARC</li>
                    <li class="board">TEAM JJ</li>
                    <li class="board">TEAM POLY</li>
                    <li class="board">TEAM GLOT</li>
                  </ol>
                </div>
              </div>

              <div
                class="
                  m-auto
                  justify-center
                  flex flex-col
                  bg-white
                  rounded-lg
                  my-4
                  text-center
                  justify-center
                  shadow-xl
                  p-12
                "
                style="
                  width: 35vw;
                  height: 33vw;
                  font-size: 1.3vw;
                  margin-bottom: 1vw;
                "
              >
                <p style="margin-bottom: 2vw; font-size: 1.5vw">
                  Create new challenge:
                  <br />
                </p>
                <p style="font-size: 1.2vw">Opponents:</p>
                <select
                  name="opponents"
                  style="margin-top: 1vw; margin-bottom: 1vw; font-size: 1vw"
                >
                  <option value="TEAM POLY" selected="selected">
                    TEAM POLY
                  </option>
                  <option value="TEAM F">TEAM F</option>
                  <option value="TEAM ARC">TEAM ARC</option>
                  <option value="TEAM JJ">TEAM JJ</option>
                  <option value="TEAM GLOT">TEAM GLOT</option>
                </select>
                <p style="font-size: 1.2vw">Subject:</p>
                <select
                  name="subject"
                  style="margin-top: 1vw; margin-bottom: 1vw; font-size: 1vw"
                >
                  <option value="SysML V2" selected="selected">SysML V2</option>
                  <option value="C#">C#</option>
                  <option value="Software Engineering">
                    Software Engineering
                  </option>
                  <option value="UML Class Diagrams">UML Class Diagrams</option>
                </select>
                <p style="font-size: 1.2vw">Points at stake:</p>
                <input
                  type="number"
                  value="0"
                  id="pointstake"
                  onkeypress="return /[0-9]/i.test(event.key)"
                  style="margin-bottom: 1vw; margin-top: 1vw; font-size: 1vw"
                />
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
                  id="start"
                >
                  START
                </button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
//import CourseCard from "../Components/CourseCard.vue";
export default {
  name: "Quizzes",
  //components: { CourseCard },

  data: function () {
    return {
      mode: "I",
      myCourses: JSON.parse(sessionStorage.courses),
    };
  },
  methods: {
    changeMode(mode) {
      if (this.mode == mode) return;
      this.mode = mode;
    },
    doQuiz(id) {
      //here i pass the id to quiz to have the quiz for the course i clicked
      this.$router.push({ name: "quiz", params: { courseId: id } });
    },
  },
  computed: {},
  created() {
    this.$store.dispatch("storePage", { title: "Quizzes", back: false });
  },
  mounted() {},
};
</script>

<style></style>
