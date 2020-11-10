<template>
  <v-content>
    <v-container v-if="response">
      <v-layout column>
        <v-flex>
          <div>
            <v-card style="width: 500px; height: auto; padding: 10px">
              <div class="row ">
                <div>
                  <img v-if="getchallenge.image" :src="'http://localhost:8000'+getchallenge.image" alt=""
                       width="60" height="60">
                </div>
                <div>
                  <h1 v-if="getchallenge">{{ getchallenge.name }}</h1><br>
                </div>

              </div>

              <h1 v-if="getchallenge.user">
                create by : {{ getchallenge.user.first_name }} {{ getchallenge.user.last_name }}
              </h1>
              <v-btn color="primary" @click="openDialogJoin">Join Challenge</v-btn>
            </v-card>
          </div>
        </v-flex>

        <v-flex>
          <div style="margin-top: 30px">

            <div>
              <v-layout row>
                <v-flex v-for="videos,index in CHALLENGECHOOSE" :key="index">
                  <v-card
                      @click="openVideoPlayer(videos)"
                      width="200"
                      height="300">
                    <img v-if="videos.video.image" :src="'http://localhost:8000'+videos.video.image" alt=""
                         style="height:200px; width:180px;">
                    <h3 v-if="videos.video.title"> {{ videos.video.title }}</h3>
                    <div class="row flex-wrap">
                      <div>
                        <img v-if="videos.video.user.userdetail"
                             :src="'http://localhost:8000'+videos.video.user.userdetail.image" alt=""
                             width="30" height="30">
                      </div>
                      <div>
                        <h3 v-if="videos.video.user"> {{ videos.video.user.first_name }} {{
                            videos.video.user.last_name
                          }}</h3>
                      </div>

                    </div>

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

            <h2>Join Challenge</h2>
            <v-spacer></v-spacer>
            <v-btn @click="closeDialog">X</v-btn>
          </v-card-title>
          <div>
            <h3>{{ selectedVideoName }}</h3>
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

      <v-dialog
          v-model="dialog2"
          v-if="inVideo"
      >

        <v-card>
          <v-card-title style="border-bottom: black ">
            <v-btn @click="dialog2 = false">X</v-btn>
          </v-card-title>

          <div class="flex flex-wrap">

            <div class="p-0 md:p-2 w-full md:w-8/12">

              <video style="width:100%;" controls autoplay v-if="inVideo.video"
                     :src="'http://localhost:8000'+inVideo.video.video"></video>
            </div>
            <div class="p-0 md:p-2 w-full md:w-4/12">


              <div class="row">

                <div class="flex-column">
                  <img v-if="inVideo.video"
                       :src="'http://localhost:8000'+inVideo.video.user.userdetail.image" alt=""
                       width="60" height="60">
                </div>
                <div class="flex-column" style="margin-left: 10px">
                  <div class="flex">
                    <h1 v-if="inVideo.video">{{ inVideo.video.user.first_name }}</h1>
                  </div>

                  <br>
                  <div class="flex">
                    <h2 v-if="inVideo.video">{{ inVideo.video.title }}</h2>
                    <v-spacer></v-spacer>
                  </div>

                  <br>
                  <div class="flex">
                    <h2>Challenge : </h2>
                    <h2 v-if="inVideo.challenge"> {{ inVideo.challenge.name }}</h2>
                  </div>
                </div>

              </div>

              <v-divider></v-divider>
              <br>
              <div class="column">

                <div class="row" v-for="item, index in commentList" :key="index">
                  <div class="column">
                    <img v-if="item.comment"
                         :src="'http://localhost:8000'+item.comment.user.userdetail.image" alt=""
                         width="30" height="30">
                  </div>
                  <div class="column" style="margin-left: 10px">
                    <v-card >
                      <h2 v-if="item.comment">{{ item.comment.user.first_name }} {{ item.comment.user.last_name }}</h2>
                      <h2 v-if="item.comment">{{item.comment.commentText}}</h2>
                    </v-card><br>
                  </div>

                </div>

              </div>
              <div  class="fixed-bottom row">
                <v-text-field @keyup.enter="enterPress()" v-model="form3.commentText" outlined label="comment"></v-text-field>
              </div>

            </div>


          </div>
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
    responseComment: false,
    currentVideo: null,
    currentComment: null,
    inVideo: {},
    getchallenge: {},
    commentList: {},
    dialog: false,
    dialog2: false,
    isSelecting: false,
    selectedVideoName: null,
    selectedImage: null,

    form: {
      title: null,
      video: null,
      image: null,
      user: null,
      challenge: null,
    },
    form2: {
      video: null,
      challenge: null,
    },
    form3: {
      video: null,
      user: null,
      commentText: null,
    },
    form4:{
      video: null,
      comment: null,
    },

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
    ...call('videochallenge/*'),
    loadData: async function () {
      let id = this.$route.query.id;
      this.getchallenge = await this.getChallengeById(id)
      this.inchallenge = await this.getInChallengeById(id)
      this.getinvideo = await this.getVideoChallenge()
      console.log(this.getinvideo)
      this.CHALLENGECHOOSE = this.inchallenge


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
      if (data) {
        let addVideo = await this.postVideoChallenge(this.form2)
        if (addVideo) {
          // this.dialog =false;
          swal.fire(
              'สำเร็จ',
              'เพิ่มวิดีโอสำเร็จเเล้ว',
              'success'
          )
          console.log(addVideo)
          await this.closeDialog()
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
      this.form2 = {}
      this.form3 = {}
    },
    async openDialogJoin() {
      this.dialog = true
    },
    async closeDialog() {
      await this.clearForm()
      this.dialog = false
    },

    async openVideoPlayer(video) {
      this.responseComment = true
      this.inVideo = video
      let pk = this.inVideo.video.id
      this.commentList = await this.getVideoChallenge(pk)
      console.log(this.commentList)
      this.currentComment = this.commentList[0]
      this.dialog2 = true
      console.log(this.inVideo.video.user)
      console.log(this.currentComment.comment.user)

    },
    async saveComment(){
      this.form3.user = this.userProfile.pk
      let pk = this.inVideo.video.id
      this.form3.video = pk
      let data = await this.storeComment(this.form3)
      console.log(this.form3.user)
      console.log(this.form3.video)
      console.log(data.id)
      this.form4.comment =  data.id
      this.form4.video =  pk
      if (data) {
        let addComment = await this.postComment(this.form4)
        if (addComment) {
          console.log(addComment)

          let pk = this.inVideo.video.id
          this.commentList = await this.getVideoChallenge(pk)
          await this.loadData()
          await this.clearForm()


          // this.dialog =true;
        } else {
          console.log("Test")

        }
      }


      return data


    },
    async enterPress(){
      await this.saveComment()
    }

  },
}
</script>

<style scoped>

</style>