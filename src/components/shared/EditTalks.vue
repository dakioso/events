<template>
    <v-dialog width="400px" persistent v-model="modal">
        <v-btn fab accent small slot="activator">
        <v-icon>edit</v-icon>
        </v-btn>
        <v-card>
            <v-container>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-title>Edit Talk</v-card-title>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-text>
                            <v-text-field
                                    name="title"
                                    label="Namn på espresso talk"
                                    id="title"
                                    v-model="editedTitle"
                                    required></v-text-field>
                            <v-textarea
                                    name="description"
                                    label="Beskrivning av espresso talk"
                                    id="description"
                                    v-model="editedDescription"
                                    auto-grow
                                    required></v-textarea>
                            <v-text-field
                                    name="host"
                                    label="Vem håller 'talket'"
                                    id="host"
                                    v-model="editedHost"
                                    auto-grow
                                    required></v-text-field>
                            <v-text-field
                                    name="description"
                                    label="Vart? (Rum, plats)"
                                    id="location"
                                    v-model="editedLocation"
                                    required></v-text-field>
                        </v-card-text>
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-btn color="info" @click="modal = false">
                                Close
                            </v-btn>
                            <v-btn color="info" @click="onSaveChange">
                                Save
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="error" outline @click="onDelete">
                                Delete
                            </v-btn>
                        </v-card-actions>
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
                editedTitle: this.talkPage.title,
                editedDescription: this.talkPage.description,
                editedHost: this.talkPage.host,
                editedLocation: this.talkPage.location,
                modal: false,
                deleteCheck: false
            }
        },
        methods: {
            onSaveChange() {
                if(this.editedTitle.trim() === '' || this.editedDescription.trim() === '' && this.editedHost.trim() === '' && this.editedLocation.trim() === '') {
                    return
                }
                this.modal = false
                this.$store.dispatch('updateTalkData', {
                    id: this.talkPage.id,
                    title: this.editedTitle,
                    description: this.editedDescription,
                    host: this.editedHost,
                    location: this.editedLocation
                })
            },
            onDelete() {
                this.modal = false
                this.$store.dispatch('deleteTalkData', {
                    id: this.talkPage.id
                })
                this.$store.dispatch('loadTalks')
                this.$router.push('/talks')
            }
        }
    }
</script>