<template>
    <v-container>
            <v-layout align-center justify-center row fill-height v-if="loading">
            <v-flex xs2>
        <v-progress-circular
                :size="70"
                :width="7"
                color="primary"
                indeterminate
                v-if="loading"
        ></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout mb10 v-else>
            <v-flex xs12 sm10 offset-sm1>
                <v-card max-height class="talkpage-card">
                    <v-img
                            class="white--text"
                            aspect-ratio="2.20"
                            :src="talkPage.imageUrl"
                    >
                        <template v-if="userIsAuth">
                            <div class="text-xs-right">
                                <v-spacer></v-spacer>
                                <app-edit-talks :talkPage="talkPage"></app-edit-talks>
                            </div>
                        </template>
                    </v-img>

                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-1">{{ talkPage.title}}</h3>
                            <p class="talkpage--subheading mb-0">Date: {{ talkPage.date | filter}} - Location: {{talkPage.location}}</p>
                            <p class="talkpage--subheading mb-0">Host: {{ talkPage.host}}</p>

                            <br>
                            <p class="talkpage--description"> {{ talkPage.description }}</p>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    export default {
        props: ['id'],
        computed: {
            talkPage() {
                return this.$store.getters.loadedTalk(this.id);
            },
            userIsAuth() {
                return this.$store.getters.user !== null && this.$store.getters.user !== undefined
            },
            loading() {
                return this.$store.getters.loading
            }

        }
    }
</script>

<style lang="scss">

    .talkpage-card {
        margin-top: 50px;
    }
</style>