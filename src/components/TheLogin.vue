<template>
  <v-app>
    <v-container fluid fill-height class="container">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <!-- <img src="@/assets/logo.svg" class="mb-6 mx-6" alt="" /> -->
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <form ref="form" @submit.prevent="loginUser()">
                <v-text-field
                  v-model="loginForm.email"
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Enter your email here"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="loginForm.password"
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password here"
                  required
                ></v-text-field>
                <v-btn type="submit" class="mt-4" color="primary" value="login"
                  >Login</v-btn
                >
              </form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import Swal from "sweetalert2";

export default {
  name: "TheLogin",
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions("auth", ["login"]),
    async loginUser() {
      new Swal({
        title: "Please wait",
        allowOutsideClick: false,
      });
      Swal.showLoading();

      const { status, msg } = await this.login(this.loginForm);
      if (status) {
        Swal.close();
        this.$router.push({ name: "Dashboard" });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: msg,
        });
      }
    },
  },
};
</script>

<style scoped>
.container {
  background-color: var(--bg-color);
}
</style>
