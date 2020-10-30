<template>
  <v-content>
    <v-container v-if="response">
      <div>
        <v-card style="padding: 20px;" class="col">
          <v-flex>
            <h2 class="text-5xl  text-white nav-txt ">{{ CHALLENGECHOOSE.challenge.name }}
              <hr class="w-4/12 border-red-900 border-2">
            </h2>
          </v-flex>
          <br>
          <v-flex>

            <img crossorigin="anonymous" height="300" width="300" id="imageid"
                 v-if="CHALLENGECHOOSE.challenge.image" class=" t-h-32 t-w-64"
                 :src="'http://localhost:8000'+ CHALLENGECHOOSE.challenge.image"
                 ref="image" alt="">

          </v-flex>
          <br>
          <h4>description :</h4>
          <v-card v-model="CHALLENGECHOOSE.challenge.description"></v-card>
          <v-textarea readonly style="margin-top: 10px; height: auto" outlined type="text"
                      v-model="CHALLENGECHOOSE.challenge.description"/>
        </v-card>
      </div>
      <div style="margin-top: 50px">
        <v-card style="padding: 20px">
          <h3>Comment</h3>
          <v-text-field outlined style="margin-top: 20px" label="ADD COMMENT"></v-text-field>
          <div v-for="items,index in CHALLENGECHOOSE.comment" :key="index">
            <v-card style="margin: 10px;padding: 10px">
              <h4></h4>
            </v-card>
          </div>
        </v-card>
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
    ...sync('user/*'),
    CHALLENGECHOOSE: sync('challenge/challengeChoose')
  },
  async mounted() {
    await this.loadData()
  },
  methods: {
    ...call('challenge/*'),
    loadData: async function () {
      let id = this.$route.query.id;
      this.challenge = await this.$store.dispatch('challenge/getChallengeById', id)
      this.CHALLENGECHOOSE = this.challenge
      console.log(this.CHALLENGECHOOSE)
      this.response = true
      console.log(this.CHALLENGECHOOSE.comment)
    },
    addComment: async function () {

    },

  },
}
</script>

<style scoped>

</style>