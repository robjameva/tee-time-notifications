<style>
/* .avatar {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain
} */
</style>

<script>
export default {
    name: 'WatchList',

    data: () => ({
        teeTimes: [
            {
                course: 'Sunset Valley',
                date: 'Sunday Sept 11th',
                start: '7:00am',
                end: '9:00am'
            },
            {
                course: 'Birkshire Valley',
                date: 'Sunday Sept 11th',
                start: '7:00am',
                end: '9:00am'
            },
            {
                course: 'Pinch Brook',
                date: 'Sunday Sept 11th',
                start: '7:00am',
                end: '9:00am'
            },
            {
                course: 'Flanders Valley',
                date: 'Sunday Sept 11th',
                start: '7:00am',
                end: '9:00am'
            },
        ]
    }),
    methods: {

    }
}
</script>

<template>
    <div>
        <v-card v-for="(item, index) in teeTimes" :key="index" class="mx-auto my-5" max-width="344" outlined
            elevation="7">
            <v-list-item three-line>
                <v-list-item-content>
                    <div class="text-overline mb-4">
                        {{ item.course }}
                    </div>
                    <v-list-item-title class="text-h5 mb-1">
                        {{ item.date }}
                    </v-list-item-title>
                    <v-list-item-subtitle>Start: {{ item.start }}</v-list-item-subtitle>
                    <v-list-item-subtitle>End: {{ item.end }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar rounded size="100" color="green lighten-1">
                    <img v-if="item.course === 'Sunset Valley'" src="../assets/sunset.png" alt="Sunset Valley">
                    <img v-if="item.course === 'Flanders Valley'" src="../assets/flanders.png" alt="Flanders Valley">
                    <img v-if="item.course === 'Birkshire Valley'" src="../assets/birkshire.png" alt="Birkshire Valley">
                    <img v-if="item.course === 'Pinch Brook'" src="../assets/pinchBrook.png" alt="Pinch Brook">
                </v-list-item-avatar>
            </v-list-item>

            <v-card-actions>
                <v-btn outlined rounded text color="primary">
                    Duplicate
                </v-btn>
                <v-btn outlined rounded text color="warning">
                    Edit
                </v-btn>
                <v-btn outlined rounded text color="error">
                    Remove
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>