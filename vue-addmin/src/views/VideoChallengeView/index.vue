<template>
  <div v-if="response">
        <pre>{{VIDEOCHALLENGE}}</pre>
    <div class="flex flex-wrap">
      <div class="p-0 md:p-2 w-full md:w-8/12">



<!--        <h1 v-if="currentInVideo.video">{{ currentInVideo.video.title }}</h1><br>-->
<!--        <video v-if="currentInVideo.video.video" autoplay controls-->
<!--               :src="'http://localhost:8000'+currentComment.video.video"></video>-->
<!--        <h2 class="text-2xl" v-if="currentInVideo.video.title">{{ currentInVideo.video.title }}</h2>-->

<!--        <br>-->
      </div>
      <div class="p-0 md:p-2 w-full md:w-4/12">
<!--        <div @click="changeVideo(video)" class="flex flex-row m-2 p-3" v-for="video,i in VIDEOCHALLENGE" :key="i">-->
<!--          <img v-if="video.video.image" :src="'http://localhost:8000'+video.video.image" alt=""-->
<!--               style="height:60px; width:120px;">-->
<!--          <div class="p-2">-->
<!--            <h2 class="text-xl" v-if="video.video.title">{{ video.video.title }}</h2>-->

<!--          </div>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import {call, sync} from 'vuex-pathify'


export default {
  name: "index",
  data: () => ({
    response: false,
    currentInVideo: null,

  }),
  computed: {
    VIDEOCHALLENGE: sync('videochallenge/videochallenge')

  },
  async mounted() {
    await this.loadData()
  },
  methods: {
    ...call('videochallenge/*'),
    ...call('challenge/*'),
    async loadData() {
      let id = this.$route.query.id
      this.VIDEOCHALLENGE = await this.getVideoChallenge(id)
      console.log(this.VIDEOCHALLENGE)
      this.currentInVideo = this.VIDEOCHALLENGE[0]
      console.log(this.currentInVideo)
      this.response = true

    },
    async changeVideo(video) {
      this.currentVideo = video
    },
  }
}
</script>

<style scoped>

</style>