<template>
  <v-container fill-height class="d-inline pa-0">
    <v-row justify="center">
      <v-col cols="2" sm="1" class="d-flex justify-center align-center">
        <v-icon dark x-large> mdi-vuejs </v-icon>
      </v-col>
      <v-col cols="2" sm="1" class="d-flex justify-center align-center">
        <v-icon dark x-large> mdi-vuetify </v-icon>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="6" class="d-flex justify-center align-center pa-0">
        <div class="headline accent--text font-weight-bold pt-4 pb-2">
          Login to UserCorp
        </div>
      </v-col>
    </v-row>
    <v-row justify="center" v-if="showLoginErrors">
      <v-col cols="5" class="d-flex justify-center align-center pa-0">
        <div class="error--text pb-2">
          The email and password you entered did not match our records. Please double-check and try again.
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="8" sm="5" md="5" lg="5">
        <v-text-field
          :value="credentials.email"
          :error-messages="emailErrors"
          @keyup="setCredentialsEmail($event.target.value)"
          @blur="$v.credentials.email.$touch()"
          autofocus
          color="secondary"
          dark
          hide-details="auto"
          label="email"
          outlined
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="8" sm="5" md="5" lg="5">
        <v-text-field
          :value="credentials.password"
          :error-messages="passwordErrors"
          @keyup="setCredentialsPassword($event.target.value)"
          @blur="$v.credentials.password.$touch()"
          ref="loginPasswordTextField"
          color="secondary"
          dark
          hide-details="auto"
          label="Password"
          outlined
          type="password"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="8" sm="5" md="5" lg="5">
        <v-btn
          :disabled="this.$v.credentials.$invalid"
          @click="Login()"
          block
          class="text-capitalize"
          color="secondary"
          dark
          rounded
          x-large
        >
          Log in
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="6" class="d-flex justify-center align-center pa-0">
        <div class="body-2 accent--text pt-4">
          Forgot password? · Sign up
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { createNamespacedHelpers } from 'vuex';

const {
  mapGetters: mapSessionsGetters,
  mapActions: mapSessionsActions,
} = createNamespacedHelpers('sessions');


export default {
  name: "Login",
  created() {
    // if (localStorage.ChallengeToken !== undefined) {
    //   this.$router.push("/");
    // } // a more elaborated verify token
  },
  data: () => ({
    credentials: {
      email: '',
      password: '',
    },
    showLoginErrors: false,
  }),
  computed: {
    ...mapSessionsGetters(['getIsAuthenticated']),
    emailErrors() {
      let errorsEmail = [];
      if (!this.$v.credentials.email.$dirty) {
        return errorsEmail;
      }
      if (!this.$v.credentials.email.required) {
        errorsEmail.push("This field is required");
      }
      if (!this.$v.credentials.email.email) {
        errorsEmail.push("Must be a valid email");
      }
      return errorsEmail;
    },
    passwordErrors() {
      let errorsPassword = [];
      if (!this.$v.credentials.password.$dirty) {
        return errorsPassword;
      }
      if (!this.$v.credentials.password.required) {
        errorsPassword.push("This field is required");
      }
      return errorsPassword;
    },
  },
  validations: {
    credentials: {
      email: { required, email },
      password: { required },
    },
  },
  methods: {
    ...mapSessionsActions(['login']),
    setCredentialsEmail(value) {
      this.credentials.email = value;
    },
    setCredentialsPassword(value) {
      this.credentials.password = value;
    },
    async Login() {
      await this.login(this.credentials);
      if (this.getIsAuthenticated) {
        this.$router.push("/");
        return;
      }
      this.showLoginError();
    },
    showLoginError() {
      this.credentials.password = '';
      this.$refs.loginPasswordTextField.focus();
      this.showLoginErrors = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn-outlined) {
  background-color: #2f608a !important;
}
.v-application a{
  color: transparent;
}
</style>
