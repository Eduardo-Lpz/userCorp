<template>
  <v-card class='tertiary info--text'>
    <v-card-title class='display-1'> Edit user </v-card-title>
    <v-text-field
      :value='this.user.firstName'
      :error-messages='firstNameErrors'
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
      :disabled='this.userExists'
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
        update
      </v-btn>
      <v-btn @click='clear'> cancel </v-btn>
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
  props: {
    userData: {
      type: Object,
    },
  },
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
    ...mapUsersActions(['createUser', 'updateUser']),
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
      const data = {
        id: this.userData.id,
        first_name: this.user.firstName,
        last_name: this.user.lastName,
      };
      this.updateUser(data);
      this.$emit('usersEdit:update');
    },
    clear() {
      this.$v.$reset();
      this.user.firstName = '';
      this.user.lastName = '';
      this.user.email = '';

      this.$emit('usersEdit:cancel');
    },
  },
};
</script>