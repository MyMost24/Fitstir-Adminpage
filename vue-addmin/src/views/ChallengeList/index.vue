<template>
  <v-content>
    <v-container class="align-center" v-if="response">
      <h2 >Challenge

      </h2>

      <v-btn color="info" @click="$router.push('/app/createchallenge/index')"
             style="margin-top: 10px;"
      >
        <v-icon color="white">mdi-plus</v-icon>
        Create Challenge
      </v-btn>


      <div
          class="flex flex-wrap sm:-m-4 -mx-4 -mb-10  justify-center md:justify-start items-center md:items-start mt-8">
        <div style="width:300px;" v-for="list,index in CHALLENGELISTS" :key="index">
          <v-layout class="row">
            <v-flex md6 xs12>
              <v-card class="p-4  w-full  justify-center items-center"
                      @click="$router.push(`/app/challenge/index?id=${list.id}`)">
                <img width="300" height="300" :src="'http://localhost:8000'+ CHALLENGELISTS.image" alt="">
                <div class="">{{ list.name }}</div>

              </v-card>
            </v-flex>
          </v-layout>
        </div>
      </div>



    </v-container>
  </v-content>
</template>

<script>
import {call, sync} from 'vuex-pathify'

export default {
  name: "index",
  data: () => ({
    response: false,


  }),
  computed: {
    CHALLENGELISTS: sync('challenge/challengeLists')

  },
  async mounted() {
    await this.loadData()
  },
  methods: {
    ...call('challenge/*'),
    async loadData() {
      this.challenge = await this.$store.dispatch('challenge/getListChallenge')
      this.CHALLENGELISTS = this.challenge
      console.log(this.CHALLENGELISTS)
      this.response = true
    },


  }
}
</script>

<style scoped>

</style>