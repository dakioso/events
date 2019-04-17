<template>
    <div class="container">
        <div class="event-list">
            <ul>
                <li v-for="(item, index) in people" :key="index" class="event-item">
                    <v-flex>
                        <v-card>
                            <v-img
                                    src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                                    aspect-ratio="2.75"
                            ></v-img>

                            <v-card-title primary-title>
                                <div>
                                    <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                                    <div> {{ item.first_name }} {{ item.last_name }}</div>
                                </div>
                            </v-card-title>


                        </v-card>
                    </v-flex>

                </li>
            </ul>
        </div>
    </div>
</template>


<script>

    export default {
        name: 'event-list',
        mounted() {
            this.$store.dispatch('loadPeople')
        },
        computed: {
            people() {
                return this.$store.state.people;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../styles/global.scss";

   .event-list {
       padding: 50px 0 50px 0;
      ul {
          list-style: none;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr;
          grid-gap: 20px;
          justify-items: stretch;
          align-items: stretch;
          @media (min-width: $breakpoint-small) {
              grid-template-columns: 2fr 2fr;
          }
      }
   }

</style>