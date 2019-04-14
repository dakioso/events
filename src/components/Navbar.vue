<template>
<nav>
  <v-toolbar app flat dark>
    <a href="/" class="logo">
      <span class="name">Espresso</span>
      <span class="font-weight-light talks">Talks</span>
    </a>
    <v-spacer></v-spacer>
    <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
  </v-toolbar>

  <v-navigation-drawer app mobile-break-point v-model="drawer" right class="indigo">
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn @click="drawer = !drawer" to="/">
        Hem
      </v-btn>
      <v-btn @click="drawer = !drawer" to="/talks">
        Talks
      </v-btn>
      <v-btn @click="drawer = !drawer" to="/about">
        About
      </v-btn>
    </v-toolbar-items>
  </v-navigation-drawer>

</nav>
</template>

<script>
export default {
  data() {
    return {
      drawer: false
    }
  }
}
</script>


<style lang="scss" scoped>
@import "../styles/components/navbar.scss";
</style>
