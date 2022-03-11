
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
            Statistics</button
          ><button
            class="flex-1 py-2 px-6 block focus:outline-none hover:bg-blue-700"
            :class="
              mode == 'B' ? ' border-blue-300 border-b-4 text-blue-300' : ''
            "
            @click="changeMode('B')"
            style="font-size: 1.1vw"
          >
            Leaderboard
          </button>
        </nav>
      </div>
      <div class="bg-opacity-0 py-2">
        <div
          v-show="mode == 'I'"
          class="justify-center text-center w-full text-xl"
        >
          <h1 style="color: white; margin-top: 10px; font-size: 0.8vw">
            Here are your statistics about this course.
          </h1>
          <div class="box">
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
                  grow  
                "
                style="width: 35vw; font-size: 1.3vw; "
              >
                <p>
                  Score: <b>150pt</b><br />
                  Level: <b>Level 1</b>
                </p>
              </div>
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
                  grow
                "
                style="width: 35vw; font-size: 1.3vw"
              >
                <p>
                  Your Position: <b>2°</b><br />
                  <b>Keep going like this!</b>
                </p>
              </div>
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
                  grow
                "
                style="width: 35vw; font-size: 1.3vw"
              >
                <p>
                  Questions answered: <b>25</b> <br /><br />
                  Correct answers: <b>23</b>
                </p>
                <div class="images">
                  
                  <div class="photo">
                    <img src="../assets/images/1.png" alt="photo" />
                  </div>

                  <div class="photo">
                    <img src="../assets/images/2.png" alt="photo" />
                  </div>

                  <div class="photo">
                    <img src="../assets/images/3.png" alt="photo" />
                  </div>
                </div>
                <div>Your Badges:</div>
                
                
              </div>
            </template>
          </div>
        </div>
        <div
          id="chart_container"
          v-show="mode == 'B'"
          class="justify-center text-center w-full text-xl"
        >
          <div class="box">
            <template>
              <!-- controllo se ho la classifica di questo corso, se non la ho mostro questo -->
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
                style="width: 80vw; overflow-y: scroll; scrollbar-width: none"
              >
                <ol style="text-align: left">
                  <li>1 Alessandro</li>
                  <li>2 Danilo</li>
                  <li>3 Niccolò</li>
                  <li>4 Roberto</li>
                  <li>5 Federico</li>
                  <li>6 Andrea</li>
                  <li>7 Matteo</li>
                  <li>8 Robin</li>
                  <li>9 Edin</li>
                  <li>10 Arturo</li>
                  <li>11 Alexis</li>
                  <li>12 Marcelo</li>
                </ol>
              </div>
            </template>
          </div>
        </div>
      </div>
      <!-- <context-menu
        ref="menu"
        class="mx-auto -mb-8"
        @click.native="sortCampaign()"
        v-bind:_options="[
          { name: 'my', view_name: 'Le mie Campagne', default: true },
          { name: 'active', view_name: 'Campagne Attive', default: false },
          { name: 'finished', view_name: 'Campagne Concluse', default: false },
        ]"
      /> -->
    </div>
  </div>
</template>

<script>
//import axios from "axios";
//import CourseCard from "../Components/CourseCard.vue";
export default {
  name: "Stats",
  //components: { CourseCard },

  data: function () {
    return {
      fakeCampaigns: [],
      myCampaigns: [],
      allCampaigns: [],
      courses: true,
      mode: "I",
    };
  },
  methods: {
    changeMode(mode) {
      if (this.mode == mode) return;
      this.mode = mode;
    },
  },
  computed: {
    campaignToShow: function () {
      // let toRtn = this.myCampaigns;
      let toRtn = [];
      if (this.mode == "B") {
        this.allCampaigns.forEach((campaign) => {
          toRtn.push(campaign);
        });
      } else if (this.mode == "I") {
        this.myCampaigns.forEach((campaign) => {
          toRtn.push(campaign);
        });
      }
      return toRtn;
    },
  },
  created() {
    this.$store.dispatch("storePage", { title: "", back: false });
  },
  mounted() {},
};
</script>

<style></style>
