<template>
  <v-content>
    <v-container >
      <h1>Create Playlist</h1>
      <v-card class="t-p-8" v-if="" flat>

        <img id="imageid" class=" t-h-32 t-w-64" :src="selectedImage" ref="image" style="width: 300px;" alt=""><br>

        <input accept="image/jpeg,image/jpg,image/*" type="file" id="fileUpload" ref="file"
               v-on:change="handleFileUpload()"/>
        <br><br>

        <v-text-field outlined label="ชื่อ playlist" type="text" v-model="form.name"/>
        <v-textarea outlined label="รายระเอียด" type="text" v-model="form.description"/>

        <v-card-actions>
          <div class="t-w-full">
            <v-btn class="t-float-right" large dark @click="createPlaylist()" color="primary">
              <v-icon>mdi-playlist-plus</v-icon> Create Playlist
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>


    </v-container >
  </v-content>
</template>

<script>
import {call, sync} from 'vuex-pathify'

export default {
  name: "index",
  data: () => ({
    selectedImage:null,
    form: {
      name: null,
      description: null,
      image: null,
      user: null,
    }

  }),
  computed: {
    ...sync('user/*')
  },
  mounted() {

  },
  methods: {
    ...call('playlist/*'),

    async handleFileUpload() {

      let file = this.$refs.file.files[0];
      var reader = new FileReader();
      reader.onload = async (e) => {
        this.form.image = e.target.result
        this.$refs.image.src = e.target.result
      };
      reader.onerror = function (error) {
        alert(error);
      };
      console.log(file)
      this.selectedImage = URL.createObjectURL(file)
      this.form.image = file

    },
    async createPlaylist() {
      this.form.user = this.userProfile.pk
      let data = await this.$store.dispatch('playlist/createPlaylist', this.form)
      if(!false){
        await alert('Success')
        await this.$router.push('/app/playlists/playlist')
      }

      console.log(this.form)

      return data

    },
    clearForm: async function () {
      this.form = {}
    },

  },



}
</script>

<style scoped>

</style>