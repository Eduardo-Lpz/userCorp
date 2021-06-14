<template>
  <v-card class='tertiary info--text'>
    <v-card-title class='display-1'> Add a new training </v-card-title>
    <v-text-field
      :value='user.firstName'
      :error-messages='firstNameErrors'
      :counter='10'
      label='Name'
      class='px-4'
      color='secondary'
      dark
      required
      @keyup='setUserFirstName($event.target.value)'
      @blur='$v.user.firstName.$touch()'
    ></v-text-field>
    <v-text-field
      :value='user.lastName'
      :error-messages='lastNameErrors'
      label='Last Name'
      class='px-4'
      color='secondary'
      dark
      required
      @keyup='setUserLastName($event.target.value)'
      @blur='$v.user.lastName.$touch()'
    ></v-text-field>
    <v-text-field
      :value='user.email'
      :error-messages='emailErrors'
      label='E-mail'
      class='px-4'
      color='secondary'
      dark
      required
      @keyup='setUserEmail($event.target.value)'
      @blur='$v.user.email.$touch()'
    ></v-text-field>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        :disabled='this.$v.user.$invalid'
        class='text-capitalize'
        color='secondary'
        dark
        @click='submit'
      >
        submit
      </v-btn>
      <v-btn @click='clear'> clear </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import { createNamespacedHelpers } from 'vuex';

const { mapActions: mapUsersActions } =
  createNamespacedHelpers('users');

export default {
  mixins: [validationMixin],
  name: 'UsersCreate',
  created() {
    console.log(this.userExists);
    console.log(this.user);
  },
  data: () => ({
    user: {
      firstName: '',
      lastName: '',
      email: '',
    },
  }),
  computed: {
    firstNameErrors() {
      const errors = [];
      if (!this.$v.user.firstName.$dirty) return errors;
      !this.$v.user.firstName.required && errors.push('Name is required.');
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.user.lastName.$dirty) return errors;
      !this.$v.user.lastName.required && errors.push('Name is required.');
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.user.email.$dirty) return errors;
      !this.$v.user.email.email && errors.push('Must be valid e-mail');
      !this.$v.user.email.required && errors.push('E-mail is required');
      return errors;
    },
  },
  validations: {
    user: {
      firstName: { required },
      lastName: { required },
      email: { required, email },
    },
  },
  methods: {
    ...mapUsersActions(['createUser']),
    setUserFirstName(value) {
      this.user.firstName = value;
    },
    setUserLastName(value) {
      this.user.lastName = value;
    },
    setUserEmail(value) {
      this.user.email = value;
    },
    async submit() {
      const newUser = {
        first_name: this.user.firstName,
        last_name: this.user.lastName,
        email: this.user.email,
      };
      await this.createUser(newUser);
      this.$emit('usersCreate:create');
    },
    clear() {
      this.$v.$reset();
      this.user.firstName = '';
      this.user.lastName = '';
      this.user.email = '';

      this.$emit('usersCreate:cancel');
    },
  },
};
</script>