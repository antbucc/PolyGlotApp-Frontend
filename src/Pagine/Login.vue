

<template>
  <div class="flex flex-col lg:flex-row bg-primary contact">
    <div class="lg:w-4/12 lg:my-2" style="margin: auto; font-size: 0.9em">
      <form
        action=""
        class="form flex flex-col bg-white p-6 lg:rounded-xl justify-center"
        style="width: 25em; height: 40em; text-align: center; margin: auto"
      >
        <img
          style="
            margin-top: 2em;
            margin-bottom: 2em;
            margin-left: auto;
            margin-right: auto;
            height: 5em;
          "
          src="../../public/logo.png"
          alt="PolyGlot"
        />
        <h2
          style="
            margin-left: auto;
            margin-right: auto;
            font-size: 1em;
            margin-bottom: 10px;
          "
        >
          Insert your credentials:
        </h2>
        <div
          class="flex flex-col md:flex-row mt-3 justify-stretch lg:flex-col"
          style="justify-content: auto"
        >
          <input
            type="text"
            v-model="user.username"
            placeholder="Insert your Email"
            style="
              height: 3em;
              width: 20em;
              margin: auto;
              margin-bottom: 50px;
              border-color: #ffa700;
            "
          />

          <input
            type="password"
            v-model="user.password"
            placeholder="Insert your Password"
            style="
              height: 3em;
              width: 20em;
              border-color: #ffa700;
              margin: auto;
              font-size: 1em;
            "
          />
        </div>
        <div
          class="btn-class"
          style="
            height: 3em;
            width: 10em;
            margin-left: auto;
            margin-right: auto;
          "
        >
          <button
            class="btn-class"
            @click.prevent="login()"
            style="font-size: 1em; width: 10em; height: 2em"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  token: "",
  data() {
    return {
      loginResult: [],
      myCampaigns: [],
      allCampaigns: [],
      user: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    login() {
      var apiUrl = process.env.VUE_APP_BASE_URL + process.env.VUE_APP_LOGIN;
      if (this.user.username != "" && this.user.password != "") {
        let url =
          apiUrl +
          "?username=" +
          this.user.username +
          "&password=" +
          this.user.password;

        axios.get(url).then((response) => {
          if (response.data == "error") {
            console.log("Error during login");
          } else if (response.data == "no-login") {
            alert("The username and / or password are / is incorrect");
          } else {
            let token = response.data;
            console.log("here the login is done correctly");
            this.$store
              .dispatch("loginWithToken", { idToken: token })
              .then(() => {
                // this.retrieveCourses(token, this.user.username);
                //this.retrievePoints(this.user.username);
                this.retrieveRegisteredCourses(token, this.user.username);
              });
          }
        });
      } else {
        alert("A username and password must be present");
      }
    },
    // retrievePoints(playerName) {
    //   var apiUrl =
    //     process.env.VUE_APP_BASE_URL +
    //     process.env.VUE_APP_PLAYER_STATUS +
    //     "?playerId" +
    //     playerName;

    //   var config = {
    //     method: "get",
    //     url: apiUrl,
    //   };
    //   axios(config).then(function (response) {
    //     sessionStorage.setItem(
    //       "points",
    //       JSON.stringify(response.data.state.PointConcept)
    //     );
    //     console.log("here points are stored");
    //   });
    // },

    retrieveRegisteredCourses(token, playerName) {
      var apiUrl =
        process.env.VUE_APP_BASE_URL +
        process.env.VUE_APP_REGISTERED_COURSE +
        "?playerId=" +
        playerName;
      sessionStorage.setItem("player", playerName);

      axios
        .get(apiUrl)
        .then((response) => {
          if (response.data == "error") {
            console.log("Error during courses extraction");
          } else {
            if (
              response.data == null ||
              response.data == undefined ||
              response.data == ""
            ) {
              console.log("asd");
            } else {
              // here I receive the courses at which the player is registered
              sessionStorage.setItem("courses", JSON.stringify(response.data));
              this.retrieveLevel();
              this.getRole();
              this.$router
                .push({
                  name: "courses",
                  params: {
                    finalToken: token,
                    playerName: this.user.username,
                  },
                })
                .catch(function (error) {
                  console.log("Login Page: " + error);
                });
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    /*  retrieveRegisteredCourses(token, playerName) {
      var apiUrl =
        process.env.VUE_APP_BASE_URL +
        process.env.VUE_APP_REGISTERED_COURSE +
        "?playerId=" +
        playerName;
      sessionStorage.setItem("player", playerName);
      alert("arrivo qui");
      // let self = this;
      axios
        .get(apiUrl)
        .then(function (response) {
          alert("response: " + response);
          if (
            response.data == null ||
            response.data == undefined ||
            response.data == ""
          ) {
            console.log("asd");
          } else {
            // here I receive the courses at which the player is registered
            console.log("quanti sono: " + JSON.stringify(response.data));
            sessionStorage.setItem("courses", JSON.stringify(response.data));
          }
        })
        .catch(function (error) {
          console.log(error);
        });
       self.$router
        .push({
          name: "courses",
          params: {
            finalToken: token,
            playerName: self.user.username,
          },
        })
        .catch(function (error) {
          console.log("Login Page: " + error);
        });
    },*/
    retrieveLevel() {
      console.log("here we retrieve the player level");
      const player = sessionStorage.getItem("player");
      //var registeredPoints = JSON.parse(sessionStorage.points);

      var apiUrl =
        process.env.VUE_APP_BASE_URL + process.env.VUE_APP_PLAYER_STATUS;
      let url = apiUrl + "?playerId=" + player;
      axios.get(url).then((response) => {
        if (response.data == "error") {
          console.log("Error during stats extraction");
        } else {
          let level = response.data.customData.level; //here we store the pointconcept inside allpoints
          sessionStorage.setItem("level", level);
        }
      });
    },
    getRole() {
      var roles = [];
      var nToken = sessionStorage.getItem("token");
      console.log("token: ");
      console.log(nToken);
      var apiUrl =
        process.env.VUE_APP_BASE_URL + "role?token=" + nToken + "&courseid=5";
      axios.get(apiUrl).then((response) => {
        if (response.data == "error" || response.data == null || response.data == "") {
          console.log("Error during role extraction");
        } else {
          if (response.data == "no-role") {
            sessionStorage.setItem("role", response.data);
          } else {
            var obj = 0;
            for (obj in response.data) {
              roles.push(JSON.stringify(response.data[obj].shortname));
              console.log(obj)
            }
            sessionStorage.setItem("roles", roles);
          }
        }
      });
    },
  },

  created() {
    this.$store.dispatch("storePage", { title: "Login", back: false });
  },
};
</script>

<style></style>