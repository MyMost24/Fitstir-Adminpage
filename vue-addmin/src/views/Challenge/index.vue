<template>
  <v-content>
    <v-container v-if="response">
      <div>
        <h1>{{CHALLENGECHOOSE}}</h1>
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