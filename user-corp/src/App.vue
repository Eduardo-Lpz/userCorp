<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height class="primary" ma-0 pa-0>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
}
</script>