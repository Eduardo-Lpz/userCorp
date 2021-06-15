<template>
  <v-container fluid fill-height class="d-block pa-0 ma-0">
    <v-row ma-0 pa-0 justify="space-between">
      <v-col class="d-flex justify-center align-center">
        <v-icon dark x-large @click="badURL()">
          mdi-vuejs
        </v-icon>
      </v-col>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-col v-if="!getIsAuthenticated" class="d-flex justify-center align-center">
        <router-link to="login">
          <v-btn rounded outlined color="secondary" large>
            Log In
          </v-btn>
        </router-link>
      </v-col>
      <v-col v-else class="d-flex justify-center align-center">
        <v-btn rounded outlined color="secondary" large @click="logOut()">
          Log Out
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center" class="pa-0 ma-0">
      <v-col cols="10">
        <users-table/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import UsersTable from '@/components/UsersTable.vue';

const {
  mapGetters: mapSessionsGetters,
  mapActions: mapSessionsActions,
} = createNamespacedHelpers('sessions');

const {
  mapActions: mapUsersActions,
} = createNamespacedHelpers('users');

export default {
  name: 'Home',
  components: {
    UsersTable,
  },
  async created() {
    await this.validateSession();

    await this.fetchUsers();
  },
  computed: {
    ...mapSessionsGetters(['getIsAuthenticated']),
  },
  methods: {
    ...mapSessionsActions(['verifyToken', 'logOutUser']),
    ...mapUsersActions(['fetchUsers']),
    validateSession() {
      this.verifyToken();
      if (!this.getIsAuthenticated)
        this.$router.push('/login');

    },
    logOut() {
      this.logOutUser();
      this.$router.go(this.$router.currentRoute);
    },
    badURL(){
      this.$router.push('/very-obvius-invalid-path');
    },
  },
}
</script>

<style lang="scss" scoped>
.v-application a{
  color: transparent;
}
</style>