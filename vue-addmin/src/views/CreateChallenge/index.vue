<template>
  <v-content>
    <v-container>
      <h1>Create Challenge</h1>
      <v-card class="t-p-8" v-if="" flat>

        <img id="imageid" class=" t-h-32 t-w-64" :src="selectedImage" ref="image" style="width: 300px;" alt=""><br>

        <div>
          <v-btn color="primary" class="text-none my-1" rounded depressed :loading="isSelecting" @click="onButtonClickImage">
            <v-icon left>
              mdi-file-image
            </v-icon>
            Upload image


          </v-btn>
          <input ref="imageuploader" class="d-none" type="file" accept="image/jpeg,image/jpg,image/*" @change="onSelectImage">
        </div>



        <br><br>

        <div>
          <v-btn color="primary" class="text-none" rounded depressed :loading="isSelecting" @click="onButtonClickVideo">
            <v-icon left>
              mdi-camcorder
            </v-icon>
            Upload Video


          </v-btn>
          <input ref="videouploader" class="d-none" type="file" accept="video/mp4,video/x-m4v,video/*" @change="onFileChanged">
        </div>
        <br><br>

        <v-text-field outlined label="name" type="text" v-model="form.name"/>
        <v-textarea outlined label="description" type="text" v-model="form.description"/>

        <v-card-actions>
          <div class="t-w-full">
            <v-btn class="t-float-right" large dark @click="createChallenge()" color="primary">
              <v-icon>mdi-playlist-plus</v-icon> Create
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
  data: ()=>({
    isSelecting: false,
    selectedVideoName: null,
    selectedImage: null,
    form:{
      name: null,
      description: null,
      image : null,
      video: null,
      user:null,
    }

  }),
  computed:{
    ...sync('user/*')

  },
  async mounted(){

  },
  methods:{
    ...call('challenge/*'),
    onButtonClickImage() {
      this.isSelecting = true
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, {
        once: true
      })

      this.$refs.imageuploader.click()

    },
    onButtonClickVideo() {
      this.isSelecting = true
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, {
        once: true
      })

      this.$refs.videouploader.click()

    },
    onFileChanged(e) {
      this.form.video = e.target.files[0]
      this.selectedVideoName = e.target.files[0].name

    },
    onSelectImage(e) {
      var files = e.target.files || e.dataTransfer.files;
      this.form.image = e.target.files[0]
      if (!files.length)
        return this.createImage(files[0]);
    },
    createImage(file) {
      this.selectedImage = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    async createChallenge(){
      this.form.user = this.userProfile.pk
      let data = await this.$store.dispatch('challenge/createChallenge', this.form)
      console.log(data)
      return data
    },
  }

}
</script>

<style scoped>

</style>