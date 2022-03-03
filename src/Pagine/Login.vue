

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
                this.retrieveCourses(token, this.user.username);
              });
          }
        });
      } else {
        alert("A username and password must be present");
      }
    },
    retrieveCourses(token, playerName) {
      var apiUrl =
        process.env.VUE_APP_BASE_URL +
        process.env.VUE_APP_REGISTERED_COURSE +
        "?playerId=" +
        playerName;

      var config = {
        method: "get",
        url: apiUrl,
      };
      let self = this;
      axios(config)
        .then(function (response) {
          // here I receive the courses at which the player is registered
          sessionStorage.setItem("courses", JSON.stringify(response.data));

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
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },

  created() {},
};
</script>

<style></style>