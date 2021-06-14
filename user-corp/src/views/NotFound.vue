<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md6 lg6 xl4>
      <v-card class="tertiary lighten-1">
        <v-card-text class="headline info--text">
          This page isn't available
        </v-card-text>
        <v-card-text class="subheading info--text">
          The link you followed may be broken, or the page may have been removed.
        </v-card-text>
        <v-card-actions>
          <v-btn :to="{ name: 'Home' }"  color="info darken-2">Go back to home</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  name: 'NotFound',
  data: () => ({
  }),
  created() {
  },
  computed: {
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
</style>