<template>
  <div class="p-0 md:p-4 " v-if="response">
<!--    <pre>{{VIDEOINPLAYLIST}}</pre>-->

    <div class="flex flex-wrap">
      <div class="p-0 md:p-2 w-full md:w-8/12" >
        <h1 v-if="currentVideo.playlist" >{{ currentVideo.playlist.name }}</h1><br>
        <video v-if="currentVideo.video.video" autoplay controls :src="'http://localhost:8000'+currentVideo.video.video"></video>
        <h2 class="text-2xl" v-if="currentVideo.video.name">{{currentVideo.video.name}}</h2>
        <br>
        <h3 class="text-2xl" v-if="currentVideo.video">{{currentVideo.video.description}}</h3>
        <br>
      </div>
      <div class="p-0 md:p-2 w-full md:w-4/12">
        <div @click="changeVideo(video)" class="flex flex-row m-2 p-3" v-for="video,i in VIDEOINPLAYLIST" :key="i">
          <img v-if="video.video.image" :src="'http://localhost:8000'+video.video.image" alt="" style="height:60px; width:120px;" >
          <div class="p-2">
            <h2 class="text-xl" v-if="video.video.name">{{video.video.name}}</h2>
            <h3 v-if="video.video">{{video.video.description}}</h3>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {sync, call} from 'vuex-pathify'

export default {
  name: "index",
  data: () => ({
    currentVideo: null,
    response: false,
  }),
  computed:{
    VIDEOINPLAYLIST: sync('playlist/videoplaylist')
  },
  async mounted() {
    await this.loadData()
  },
  methods:{
    async changeVideo(video){
      this.currentVideo = video
    },
    async loadData(){
      let id = this.$route.query.id
      this.VIDEOINPLAYLIST = await this.$store.dispatch('playlist/getVideoPlaylist',id)
      console.log(this.VIDEOINPLAYLIST)
      this.currentVideo = this.VIDEOINPLAYLIST[0]
      this.response = true

    },
  }
}
</script>

<style scoped>

</style>