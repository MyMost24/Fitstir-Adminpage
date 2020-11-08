<template>

  <v-content>
    <v-container>

      <div v-if="response">
        <h1>Play List</h1>
        <v-text-field outlined v-model="search" append-icon="mdi-magnify" label="Search" single-line
                      hide-details></v-text-field>
        <br>
        <v-btn color="info" @click="$router.push('/app/createplaylist/index')"
        >
          <v-icon color="white">mdi-playlist-plus</v-icon>
          Create playlist
        </v-btn>
        <v-data-table :headers="headers" :items="PLAYLISTS" :search="search" class="elevation-1">
          <template v-slot:body="{ items }">
            <tbody>
            <tr v-for="playlist,index in items" :key="index">

              <td class="t-w-64  t-p-4">
                <div class="t-w-full t-flex t-flex-row t-items-center w3-medium ">
                  <img width="60" height="60" :src="'http://localhost:8000'+ playlist.image" alt="">
                  {{ playlist.name }}
                </div>
              </td>

              <td>
                <v-btn color="purple" text @click="$router.push(`/app/playlistpage/index?id=${playlist.id}`)">
                  <v-icon>mdi-play-circle-outline</v-icon>
                  Play
                </v-btn>
              </td>

              <td>
                <v-btn @click="$router.push(`/app/playlistdetail/index?playlist=${playlist.id}`)" text color="info">
                  <v-icon>mdi-eye</v-icon>
                  ดูข้อมูล
                </v-btn>


                <v-btn @click="deletePlaylist(playlist.id)" color="red" text>
                  <v-icon>mdi-delete</v-icon>
                  Delete
                </v-btn>
              </td>
            </tr>
            </tbody>
          </template>
        </v-data-table>

      </div>

    </v-container>
  </v-content>

</template>


<script>
import {call, sync} from 'vuex-pathify'

export default {
  name: "playlist",
  data: () => ({
    response: false,
    search: '',
    headers: [
      {
        text: 'play list name',
        align: 'start',
        value: 'title'
      },
      {
        text: 'play',
        value: 'playlist'

      },
      {
        text: 'setting',
        filterable: false,
      }
    ]


  }),
  computed: {
    PLAYLISTS: sync('playlist/playLists')
  },
  async mounted() {
    await this.loadData()
  },
  methods: {
    ...call('playlist/*'),
    async loadData() {
      this.PLAYLISTS = await this.$store.dispatch('playlist/getPlaylist')
      console.log(this.PLAYLISTS)
      this.response = true
      return this.PLAYLISTS
    },
    async deletePlaylist(pk){
      if (confirm('Do you want to delete?')) {

        await this.$store.dispatch('playlist/deletePlaylist', pk)
        await this.loadData()
      }
    }
  }
}
</script>

<style scoped>

</style>