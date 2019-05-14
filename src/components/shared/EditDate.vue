<template>
    <v-dialog width="400px" persistent v-model="modal" :fullscreen="$vuetify.breakpoint.smAndDown">
        <v-btn  fab
                accent
                small
                slot="activator">
            <v-icon>update</v-icon>
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-date-picker v-model="editableDate" full-width locale="sv-se">
                                <v-btn color="info" @click="modal = false">Close</v-btn>
                                <v-btn color="info" @click="onSaveChanges">Save</v-btn>
                        </v-date-picker>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        props: ['talkPage'],
        data() {
            return {
                modal: false,
                editableDate: null
            }
        },
        methods: {
            onSaveChanges() {
                const newDate = new Date(this.talkPage.date)
                const newDay = new Date(this.editableDate).getUTCDate()
                const newMonth = new Date(this.editableDate).getUTCMonth()
                const newYear = new Date(this.editableDate).getUTCFullYear()
                newDate.setUTCDate(newDay)
                newDate.setUTCMonth(newMonth)
                newDate.setUTCFullYear(newYear)
                this.$store.dispatch('updateTalkData', {
                    id: this.talkPage.id,
                    date: newDate
                })
            }
        },
        created() {
            this.editableDate = new Date(this.talkPage.date).toISOString().substr(0,10)
        }
    }
</script>