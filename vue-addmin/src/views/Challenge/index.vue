<template>
  <v-content>
    <v-container v-if="response">
      <v-layout column>
        <v-flex>
          <div>
            <v-card style="width: 500px; height: auto; padding: 10px">
              <h1 v-if="currentVideo.challenge">{{ currentVideo.challenge.name }}</h1><br>
              <h1 v-if="currentVideo.challenge.user">
                create by : {{ currentVideo.challenge.user.first_name }} {{ currentVideo.challenge.user.last_name }}
              </h1>
              <v-btn color="primary" @click="openDialogJoin">Join Challenge</v-btn>
            </v-card>
          </div>
        </v-flex>

        <v-flex>
          <div style="margin-top: 30px">

            <div >
              <v-layout row >
                <v-flex v-for="videos,index in CHALLENGECHOOSE" :key="index">
                  <v-card width="200" height="300">
                    <img v-if="videos.video.image" :src="'http://localhost:8000'+videos.video.image" alt=""
                         style="height:200px; width:180px;">
                    <h3 v-if="videos.video.title"> {{videos.video.title}}</h3>

                    <h3 v-if="videos.video.user"> {{videos.video.user.first_name}}</h3>


                  </v-card>

                </v-flex>
              </v-layout>
            </div>

          </div>
        </v-flex>


      </v-layout>

      <v-dialog
          v-model="dialog"

      >
        <v-card>
          <v-card-title>

            <h2 >Join Challenge</h2>
            <v-spacer></v-spacer>
            <v-btn @click="closeDialogJoin">X</v-btn>
          </v-card-title>
          <div>
            <h3>{{selectedVideoName}}</h3>
            <v-btn color="primary" class="text-none" rounded depressed :loading="isSelecting"
                   @click="onButtonClickVideo">
              <v-icon left>
                mdi-folder-upload
              </v-icon>
              Upload Video

            </v-btn>
            <input ref="videouploader" class="d-none" type="file" accept="video/mp4,video/x-m4v,video/*"
                   @change="onFileChanged">
          </div>

          <div style="margin-top: 20px">
            <v-btn color="primary" class="text-none my-1" rounded depressed :loading="isSelecting"
                   @click="onButtonClickImage">
              <v-icon left>
                mdi-folder-image
              </v-icon>
              Upload image

            </v-btn>
            <input ref="imageuploader" class="d-none" type="file" accept="image/jpeg,image/jpg,image/*"
                   @change="onSelectImage">
          </div>

          <v-text-field class="text-field" label="Video Title" v-model="form.title"></v-text-field>
        </v-card>

        <v-btn color="primary" @click="saveData">
          Upload
        </v-btn>

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
    currentVideo: null,
    dialog: false,
    isSelecting: false,
    selectedVideoName: null,
    selectedImage: null,
    form:{
      title: null,
      video: null,
      image: null,
      user: null,
      challenge: null,
    },
    form2:{
      "video": null,
      "challenge": null,

    }

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
      this.currentVideo = this.CHALLENGECHOOSE[0]
      console.log(this.currentVideo)
      this.response = true
    },
    async saveData() {
      this.form.user = this.userProfile.pk
      let challengeCurrent = this.$route.query;
      console.log(Number(challengeCurrent.id))

      this.form.challenge = Number(challengeCurrent.id)
      let data = await this.createVideoChallenge(this.form)
      this.form2.challenge = Number(challengeCurrent.id)
      this.form2.video = data.id
      if(data){
        let addVideo = await this.postVideoChallenge(this.form2)
        if (addVideo) {
          // this.dialog =false;
          swal.fire(
              'สำเร็จ',
              'เพิ่มวิดีโอสำเร็จเเล้ว',
              'success'
          )
          console.log(addVideo)
          await this.closeDialogJoin()
          await this.loadData()
          // this.dialog =true;
        } else {
          swal.fire(
              'ไม่สำเร็จ',
              'เพิ่มวิดีโอสำไม่เร็จเเล้ว',
              'error'
          )
        }
      }

      console.log(data)

      return data



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
    onButtonClickImage() {
      this.isSelecting = true
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, {
        once: true
      })

      this.$refs.imageuploader.click()

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

    clearForm: async function () {
      this.form = {}
    },
    async openDialogJoin() {

      this.dialog = true
    },
    async closeDialogJoin() {
      await this.clearForm()
      this.dialog = false
    },

  },
}
</script>

<style scoped>

</style>