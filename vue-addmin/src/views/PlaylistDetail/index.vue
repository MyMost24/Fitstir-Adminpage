<template>
  <v-content>
    <v-container>
      <v-tabs color="primary" class="mt-4" slider-color="primary">
        <v-tab>
          ข้อมูลทั่วไป
        </v-tab>
        <v-tab-item>
          <h1>Playlist Detail</h1>
          <v-card class="t-p-8" v-if="" flat>

            <img crossorigin="anonymous" style="height: 300px;" id="imageid"
                 v-if="PLAYLISTCHOOSE.image" class=" t-h-32 t-w-64"
                 :src="'http://localhost:8000'+ PLAYLISTCHOOSE.image"
                 ref="image" alt=""><br>

            <input accept="image/jpeg,image/jpg,image/*" type="file" id="fileUpload" ref="file"
                   v-on:change="handleFileUpload()"/>
            <br><br>

            <v-text-field outlined label="ชื่อ playlist" type="text" v-model="PLAYLISTCHOOSE.name"/>
            <v-textarea outlined label="รายระเอียด" type="text" v-model="PLAYLISTCHOOSE.description"/>

            <v-card-actions>
              <div class="t-w-full">
                <v-btn class="t-float-right" large dark @click="updatePlaylist()" color="primary">
                  <v-icon>mdi-playlist-plus</v-icon>
                  Edit Playlist
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-tab-item>
        <v-tab>
          รายการวีดีโอ
        </v-tab>
        <v-tab-item>

          <h1>
            Add video Playlist
          </h1>
          <br>

          <v-dialog
              v-model="dialog1"
              fullscreen
              hide-overlay
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  class="t-text-blue-600"
                  color="primary"
                  dark
                  v-bind="attrs"
                  v-on="on"
              >
                <v-icon color="white">mdi-movie-open</v-icon>
                Add Video
              </v-btn>
            </template>
            <v-card>
              <v-toolbar
                  dark
                  color="primary"
              >
                <v-btn
                    icon
                    dark
                    @click="dialog1 = false"
                > X <!--                        <v-icon>mdi-close</v-icon>-->
                </v-btn>
                <v-toolbar-title>Choose Video</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-data-table
                  :headers="headers"
                  :items="videos"
              >
                <template v-slot:body="{ items }">
                  <tbody>
                  <tr v-for="list,index in items"
                      :key="index"
                  >
                    <td>
                      <img :src="list.image" alt="" width="100" height="100">
                    </td>
                    <td class="w3-large">{{ list.name }}</td>
                    <td>
                      <v-btn text color="primary" @click="chooseVideo(list.id)" border>
                        <v-icon>mdi-check</v-icon>
                        Select
                      </v-btn>
                    </td>
                  </tr>
                  </tbody>
                </template>
              </v-data-table>
            </v-card>
          </v-dialog>
          <br>


          <v-data-table
              :headers="headers1"
              :items="videoplaylist"
          >
            <template v-slot:body="{ items }">
              <tbody>
              <tr v-for="list,index in items" :key="index">
                <td>
                  <img :src="'http://localhost:8000'+list.video.image" alt="" width="100" height="100">
                </td>
                <td class="w3-large">{{ list.video.name }}</td>
                <td>

                  <v-btn color="purple" text @click="openVideoPlayer(list)">
                    <v-icon>mdi-play-circle-outline</v-icon>
                    Preview
                  </v-btn>

                </td>
                <td>
                  <v-btn text color="red" @click="remove(list.id)" border>
                    <v-icon>mdi-cup-off-outline</v-icon>
                    remove
                  </v-btn>
                </td>
              </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-tab-item>
      </v-tabs>

      <v-dialog
          v-model="dialog"
          v-if="videoData"
      >
        <v-card>
          <v-card-title>

            <h2 v-if="videoData.video">{{ videoData.video.name }}</h2>
            <v-spacer></v-spacer>
            <v-btn @click="dialog = false">X</v-btn>
          </v-card-title>
          <video style="width:100%;" controls autoplay v-if="videoData.video"
                 :src="'http://localhost:8000'+videoData.video.video"></video>
        </v-card>
      </v-dialog>


    </v-container>
  </v-content>
</template>

<script>
import {call, sync} from 'vuex-pathify'
import swal from "sweetalert2";

export default {
  name: "index",
  data: () => ({
    response: false,
    videoplaylist: [],
    videoData: {},
    videos: [],
    dialog: false,
    dialog1: false,
    headers1: [
      {
        align: 'start',
        sortable: false,
        value: 'name',
      },
      {
        text: 'Name',
        value: 'name'
      },

      {
        text: 'Play',
        value: 'play'
      },

      {
        text: 'Manage',
        value: 'manage'
      },
    ],
    headers: [
      {
        align: 'start',
        sortable: false,
        value: 'name',
      },
      {
        text: 'Name',
        value: 'name'
      },

      {
        text: 'Play',
        value: 'play'
      },

      {
        text: 'Manage',
        value: 'manage'
      },
    ],

  }),
  computed: {
    PLAYLISTCHOOSE: sync('playlist/playListChoose')
  },
  async mounted() {
    await this.loadData()
  },
  methods: {
    ...call('playlist/*'),
    loadData: async function () {
      let id = this.$route.query.playlist;
      this.playlist = await this.$store.dispatch('playlist/getPlaylistById', id)
      this.videoplaylist = await this.$store.dispatch('playlist/getVideoPlaylist', id)
      this.videos = await this.$store.dispatch('video/getListVideo')
      this.PLAYLISTCHOOSE = this.playlist
      this.response = true
    },
    async handleFileUpload(e) {

      let file = this.$refs.file.files[0];
      var reader = new FileReader();
      reader.onload = async (e) => {
        this.PLAYLISTCHOOSE.image = e.target.result
        this.$refs.image.src = e.target.result
      };
      reader.onerror = function (error) {
        alert(error);
      };
      this.selectedImage = URL.createObjectURL(file)
      this.PLAYLISTCHOOSE.image = file
      // await reader.readAsDataURL(file)
      // return this.selectedImage = file
    },
    updatePlaylist: async function () {
      console.log(document.getElementById("imageid"));
      console.log(this.PLAYLISTCHOOSE.image)
      await this.$store.dispatch('playlist/updatePlaylist', this.PLAYLISTCHOOSE)
      if (!false) {
        await alert('Update Success')
        await this.$router.push('/app/playlists/playlist')
      }


    },

    async openVideoPlayer(video) {
      this.videoData = video
      this.dialog = true
      console.log(this.videoData.video)

    },
    chooseVideo: async function (videoId, day) {
      this.videos.id = videoId
      let playlistCurrent = this.$route.query;
      console.log(Number(playlistCurrent.playlist))
      let addVideo = await this.$store.dispatch('playlist/postVideoPlaylist', {
        "video": videoId,
        "playlist": Number(playlistCurrent.playlist),
      })
      if (addVideo != false) {
        // this.dialog =false;
        swal.fire(
            'สำเร็จ',
            'เพิ่มวิดีโอสำเร็จเเล้ว',
            'success'
        )
        // this.dialog =true;
      } else {
        swal.fire(
            'ไม่สำเร็จ',
            'เพิ่มวิดีโอสำไม่เร็จเเล้ว',
            'error'
        )
      }
      await this.loadData();

    },
    remove: async function (id) {
      await this.$store.dispatch('playlist/deleteVideoPlaylist', id)
      await this.loadData();
    },

  }
}
</script>

<style scoped>

</style>