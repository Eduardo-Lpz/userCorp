<template>
  <v-card class='tertiary info--text'>
    <v-card-title class='display-1'> Edit user </v-card-title>
    <v-text-field
      :value='userData.firstName'
      :error-messages='firstNameErrors'
      label='Name'
      class='px-4'
      color='secondary'
      dark
      required
      @keyup='setUserFirstName($event.target.value)'
      @blur='$v.userData.firstName.$touch()'
    ></v-text-field>
    <v-text-field
      :value='userData.lastName'
      :error-messages='lastNameErrors'
      label='Last Name'
      class='px-4'
      color='secondary'
      dark
      required
      @keyup='setUserLastName($event.target.value)'
      @blur='$v.userData.lastName.$touch()'
    ></v-text-field>
    <v-text-field
      :disabled='true'
      :value='userData.email'
      label='E-mail'
      class='px-4'
      color='secondary'
      dark
      required
    ></v-text-field>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        :disabled='this.$v.userData.$invalid'
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
import { required } from 'vuelidate/lib/validators';
import { createNamespacedHelpers } from 'vuex';

const { mapActions: mapUsersActions } =
  createNamespacedHelpers('users');

export default {
  mixins: [validationMixin],
  name: 'UsersCreate',
  props: {
    user: {
      type: Object,
    },
  },
  computed: {
    userData() {
      return {
        firstName: this.user.first_name,
        lastName: this.user.last_name,
        email: this.user.email
      }
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.userData.firstName.$dirty) return errors;
      !this.$v.userData.firstName.required && errors.push('Name is required.');
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.userData.lastName.$dirty) return errors;
      !this.$v.userData.lastName.required && errors.push('Name is required.');
      return errors;
    },
  },
  validations: {
    userData: {
      firstName: { required },
      lastName: { required },
    },
  },
  methods: {
    ...mapUsersActions(['createUser', 'updateUser']),
    setUserFirstName(value) {
      this.userData.firstName = value;
    },
    setUserLastName(value) {
      this.userData.lastName = value;
    },
    async submit() {
      const data = {
        id: this.user.id,
        first_name: this.userData.firstName,
        last_name: this.userData.lastName,
      };
      this.updateUser(data);
      this.$emit('usersEdit:update');
    },
    clear() {
      this.$v.$reset();
      this.userData.firstName = '';
      this.userData.lastName = '';

      this.$emit('usersEdit:cancel');
    },
  },
};
</script>