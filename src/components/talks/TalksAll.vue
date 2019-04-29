<template>
    <div class="container">
        <div class="event-list">
            <ul>
                <li v-for="(talk, index) in allTalks" :key="index" class="event-item">
                    <v-flex>
                        <router-link :to="{ name: 'talkpage', params: { id:talk.id }}">
                            <v-card hover>
                                <v-img
                                        :src="talk.imageUrl"
                                        aspect-ratio="2.75"
                                ></v-img>

                                <v-card-title secondary-title>
                                    <div>
                                        <h3 class="headline mb-0">{{ talk.title }}</h3>
                                        <br>
                                        <p>{{ talk.date | filter}} - {{talk.location}}</p>
                                        <br>
                                        <div> {{ talk.description }}</div>
                                    </div>
                                </v-card-title>
                                <v-spacer></v-spacer>
                                <v-card-actions>
                                    <v-btn flat color="orange">
                                        Check it out!
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </router-link>
                    </v-flex>

                </li>
            </ul>
        </div>
        <router-link tag="span" :to="{ name: 'createnewtalk' }">
            <v-btn fab dark color="red" class="newtalk-button">
                <i class="material-icons">
                    create
                </i>
            </v-btn>
        </router-link>

    </div>
</template>


<script>

    export default {
        name: 'event-list',

        computed: {
            allTalks() {
                return this.$store.getters.loadedTalks;
            }
        }
    }
</script>

<style lang="scss">


    .event-list {
        padding: 100px 0 50px 0;

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

        a {
            text-decoration: none;
        }
    }

    .newtalk-button {
        float: right;
    }

</style>