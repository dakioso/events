<template>
<div class="event-items">
  <ul>
    <li v-for="(item, index) in people" :key="index" class="event-list">
     {{ item.id }} {{ item.first_name }} {{ item.last_name }}
    </li>
  </ul>
</div>
</template>


<script>
  import {mapState} from 'vuex'
  
  export default {
    name: 'event-items',
    mounted() {
      this.$store.dispatch('loadPeople')
    },
    computed: {
      ...mapState([
        'people'
      ])
    }
  }
</script>

<style lang="scss" scoped>
@import "../styles/components/talkcall.scss";
</style>