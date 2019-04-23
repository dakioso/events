<template>
    <v-container>
    <v-layout mb10>
        <v-flex xs12 sm10 offset-sm1>
            <v-card class="talkpage-card">
                <v-img
                        class="white--text"
                        height="400px"
                        :src="talkPage.imageUrl"
                ></v-img>

                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">{{ talkPage.title }}</h3>
                        <br>
                        <div> {{ talkPage.description }} </div>
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
            }
        }
    }
</script>

<style lang="scss">

    .talkpage-card {
        margin: 50px 0 50px 0;
    }
</style>