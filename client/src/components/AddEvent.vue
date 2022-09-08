<template>
    <v-form v-model="valid">
        <v-container>
            <v-row>
                <v-col align="center" justify="center">
                    <v-date-picker v-model="picker" :min="today" :max="sevenDays" color="green lighten-1">
                    </v-date-picker>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="11" sm="5">
                    <v-dialog ref="dialogStart" v-model="modal2" :return-value.sync="startTime" persistent
                        width="290px">
                        <template v-slot:activator="{ on, startAttrs }">
                            <v-text-field v-model="startTime" label="Start" prepend-icon="mdi-clock-time-four-outline"
                                readonly v-bind="startAttrs" v-on="on" color="green lighten-1">
                            </v-text-field>
                        </template>
                        <v-time-picker v-if="modal2" v-model="startTime" full-width format="ampm"
                            color="green lighten-1">
                            <v-spacer></v-spacer>
                            <v-btn text color="green lighten-1" @click="modal2 = false">
                                Cancel
                            </v-btn>
                            <v-btn text color="green lighten-1" @click="$refs.dialogStart.save(startTime)">
                                OK
                            </v-btn>
                        </v-time-picker>
                    </v-dialog>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="11" sm="5">
                    <v-dialog ref="dialogEnd" v-model="modal3" :return-value.sync="endTime" persistent width="290px">
                        <template v-slot:activator="{ on, endAttrs }">
                            <v-text-field v-model="endTime" label="End" prepend-icon="mdi-clock-time-four-outline"
                                readonly v-bind="endAttrs" v-on="on" color="green lighten-1">
                            </v-text-field>
                        </template>
                        <v-time-picker v-if="modal3" v-model="endTime" full-width format="ampm" color="green lighten-1">
                            <v-spacer></v-spacer>
                            <v-btn text color="green lighten-1" @click="modal3 = false">
                                Cancel
                            </v-btn>
                            <v-btn text color="green lighten-1" @click="$refs.dialogEnd.save(endTime)">
                                OK
                            </v-btn>
                        </v-time-picker>
                    </v-dialog>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12" md="4">
                    <v-select v-model="selectedCourse" :items="courses" attach chips label="Course">
                    </v-select>
                </v-col>
            </v-row>

            <v-row align="center" justify="center">
                <v-col cols="12">
                    <p class="text-center">
                        Number of Golfers
                    </p>
                </v-col>
                <v-btn-toggle v-model="golfers" multiple>
                    <v-btn>
                        <v-icon>mdi-numeric-1</v-icon>
                    </v-btn>
                    <v-btn>
                        <v-icon>mdi-numeric-2</v-icon>
                    </v-btn>
                    <v-btn>
                        <v-icon>mdi-numeric-3</v-icon>
                    </v-btn>
                    <v-btn>
                        <v-icon>mdi-numeric-4</v-icon>
                    </v-btn>
                </v-btn-toggle>

                <v-btn x-large color="success" dark rounded class="mt-10">
                    <v-icon>mdi-calendar-search</v-icon>
                    <span>START SEARCHING!</span>
                </v-btn>
            </v-row>


        </v-container>
    </v-form>
</template>

<script>
export default {
    name: 'AddEvent',

    data: () => ({
        picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        startTime: null,
        endTime: null,
        selectedCourse: null,
        // NEED TO ADD ONE TO EACH AS THIS IS 0 INDEXED
        golfers: [],
        modal2: false,
        modal3: false,
    }),
    computed: {
        today() {
            const today = new Date();
            const minusOne = today.setDate(today.getDay() + 3);

            return new Date(minusOne).toJSON().split('T')[0]
        },
        sevenDays() {
            const today = new Date();
            const plusSeven = today.setDate(today.getDay() + 10);

            return new Date(plusSeven).toJSON().split('T')[0]
        },
        courses() {
            return ['Sunset Valley', 'Birkshire Valley', 'Pinch Brook', 'Flanders R/G', 'Flanders B/W']
        }
    }
}
</script>
