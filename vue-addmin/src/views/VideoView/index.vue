<template>
  <div v-if="response">
    <v-text-field outlined v-model="search" append-icon="mdi-magnify" label="Search" single-line
                  hide-details></v-text-field>
    <br>
    <v-btn color="info" @click="$router.push('/app/upload/index')"
    >
      <v-icon color="white">mdi-upload</v-icon>
      Upload video
    </v-btn>
    <v-data-table :headers="headers" :items="VIDEOLISTS" :search="search" class="elevation-1">
      <template v-slot:body="{ items }">
        <tbody>
        <tr v-for="video,index in items" :key="index">

          <td class="t-w-64  t-p-4">
            <div class="t-w-full t-flex t-flex-row t-items-center w3-medium ">
              <img style="width: 60px ; height: 60px;" :src="video.image" alt="">
              {{ video.name }}
            </div>
          </td>
          <td>
            <v-btn color="purple" text @click="openVideoPlayer(video)">
              <v-icon>mdi-play-circle-outline</v-icon>
              Preview
            </v-btn>
          </td>
          <td>
            <v-btn @click="$router.push(`/app/detail/index?video=${video.id}`)" text color="info">
              <v-icon>mdi-eye</v-icon>
              ดูข้อมูล
            </v-btn>

            <v-btn @click="deleteVideo(video.id)" color="red" text>
              <v-icon>mdi-delete</v-icon>
              Delete
            </v-btn>
          </td>
        </tr>
        </tbody>
        <v-dialog
            v-model="dialog"
            v-if="videoData"
        >
          <v-card>
            <v-card-title>
              <h2>{{ videoData.name }}</h2>
              <v-spacer></v-spacer>
              <v-btn @click="dialog = false">X</v-btn>
            </v-card-title>
            <video style="width:100%;" controls autoplay v-if="videoData" :src="videoData.video"></video>
          </v-card>
        </v-dialog>
      </template>
    </v-data-table>

  </div>
</template>

<script>
import axios from 'axios';
import {sync, call} from 'vuex-pathify'

export default {
  name: "index",
  data: () => {
    return {
      search: '',
      response: false,
      dialog: false,
      videoData:{},
      headers: [
        {
          text: 'video',
          align: 'start',
          value: 'title'
        },
        {
          text: 'PreView',
          value: 'video'
        },
        {
          text: 'setting',
          filterable: false,
        }

      ]

    }

  },
  computed: {
    VIDEOLISTS: sync('video/videoLists'),
  },
  async mounted() {
    await this.loadData()
  },
  methods: {
    ...call('video/*'),
    async loadData() {
      this.VIDEOLISTS = await this.$store.dispatch('video/getListVideo')
      console.log(this.VIDEOLISTS)
      this.response = true
    },

    async deleteVideo(pk) {
      if (confirm('Do you want to delete?')) {

        await this.$store.dispatch('video/deleteVideo', pk)
        await this.loadData()
      }
    },
    async openVideoPlayer(video) {
      this.videoData = video
      this.dialog = true
      console.log(this.videoData)

    },


  },
}
</script>

<style scoped>

</style>