<template>
    <v-toolbar app flat dark>
        <v-toolbar-title></v-toolbar-title>
        <div class="logo">
        <span class="name">Digitalist</span>
        <span class="font-weight-light">Events</span>
        </div>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/">
          Hem
      </v-btn>
      <v-btn flat to="/about">
        Events
      </v-btn>
    </v-toolbar-items>
    </v-toolbar>
</template>

<style lang="scss" scoped>
@import "../styles/components/navbar.scss";
</style>
