<template>
  <v-content>
    <v-container >
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


    </v-container>
  </v-content>
</template>

<script>
import {call, sync} from 'vuex-pathify'

export default {
  name: "index",
  data:()=>({
    response: false,

  }),
  computed:{
    PLAYLISTCHOOSE: sync('playlist/playListChoose')
  },
  async mounted() {
    await this.loadData()
  },
  methods:{
    ...call('playlist/*'),
    loadData: async  function(){
      let id = this.$route.query.playlist;
      this.playlist = await this.$store.dispatch('playlist/getPlaylistById', id)
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
      this.PLAYLISTCHOOSE.image = file
      // await reader.readAsDataURL(file)
      // return this.selectedImage = file
    },
    updatePlaylist: async function(){
      console.log(document.getElementById("imageid"));
      console.log(this.PLAYLISTCHOOSE)
      await  this.$store.dispatch('playlist/updatePlaylist', this.PLAYLISTCHOOSE)
      if(!false){
       await alert('Update Success')
       await this.$router.push('/app/playlists/playlist')
      }


    },

  }
}
</script>

<style scoped>

</style>