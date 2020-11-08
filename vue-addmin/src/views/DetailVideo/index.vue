<template>
  <v-card flat v-if="response">
    <v-card class="t-p-8" flat>
      <form @submit.prevent="updateVideo()">
        <v-toolbar color="transparent" flat>
          <h2 class="t-font-bold t-text-xl">ข้อมูลทั่วไป</h2>
          <v-spacer></v-spacer>
          <v-btn color="purple" dark @click="openVideoPlayer(VIDEOCHOOSE)">
            <v-icon>mdi-play-circle-outline</v-icon>
            พรีวิว
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <br>
        <img crossorigin="anonymous" style="height: 300px;" id="imageid"
             v-if="VIDEOCHOOSE.image" class=" t-h-32 t-w-64"
             :src="'http://localhost:8000'+ VIDEOCHOOSE.image"
             ref="image" alt="">
        <img v-else class=" t-h-32 t-w-64" :src="VIDEOCHOOSE.image" ref="image" alt="" style="height: 300px;">
        <br/>
        <input accept="image/jpeg,image/jpg,image/*" type="file" id="fileUpload" ref="file"
               v-on:change="handleFileUpload()"/>
        <br><br>
        <v-text-field outlined label="ชื่อวีดีโอ (ต้องระบุ)" v-model="VIDEOCHOOSE.name"></v-text-field>
        <v-textarea outlined v-model="VIDEOCHOOSE.description" label="รายระเอียด"></v-textarea>


        <v-toolbar color="transparent" flat>
          <h2 class="t-font-bold t-text-xl">แท็ก</h2>

        </v-toolbar>
        <v-divider></v-divider>
        <br>
        <v-container grid-list-xs>
          <v-layout column wrap>
            <div class="flex flex-wrap ml-2">

              <div v-for="item,index in tagData" :key="index">
                <div>
                  <h3>{{ item.name }}</h3>

                  <div v-for="(data, index) in item.tag_detail" :key="index">
                    <v-checkbox :value="data.id" v-model="VIDEOCHOOSE.tag_type" :label="data.name"></v-checkbox>
                  </div>

                </div>
              </div>

            </div>
          </v-layout>
        </v-container>
        <v-card-actions>
          <div class="t-w-full">
            <v-btn class="t-float-right" large color="primary" type="submit">
              <v-icon>mdi-pencil</v-icon>
              แก้ไขข้อมูลวีดีโอ
            </v-btn>
          </div>
        </v-card-actions>
      </form>
    </v-card>

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
        <video style="width:100%;" controls autoplay v-if="videoData" :src="'http://localhost:8000'+videoData.video"></video>
      </v-card>
    </v-dialog>

  </v-card>



</template>

<script>
import {
  sync,
  call
} from "vuex-pathify";
import swal from 'sweetalert2';

window.Swal = swal;

export default {
  name: "index",
  data: () => {
    return {
      response: false,
      tagData: [],
      selectedImage: null,
      dialog: false,
      videoData:{},


    };
  },
  computed: {
    VIDEOCHOOSE: sync('video/videoChoose'),

  },
  async mounted() {
    await this.load()
  },

  methods: {

    async getBase64Image(img) {
      var canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png");
      return dataURL
    },

    load: async function () {
      let idVideo = this.$route.query.video;
      this.VIDEOCHOOSE = await this.$store.dispatch('video/getVideoData', idVideo)
      this.tagData = await this.$store.dispatch("tag/getTagList");

      this.response = true


    },
    async handleFileUpload(e) {

      let file = this.$refs.file.files[0];
      var reader = new FileReader();
      reader.onload = async (e) => {
        this.VIDEOCHOOSE.image = e.target.result
        this.$refs.image.src = e.target.result
      };

      reader.onerror = function (error) {
        alert(error);
      };
      this.VIDEOCHOOSE.image = file
      // await reader.readAsDataURL(file)
      // return this.selectedImage = file


    },

    updateVideo: async function () {
      console.log(document.getElementById("imageid"));
      
      console.log(this.VIDEOCHOOSE.image)
      delete this.VIDEOCHOOSE.video
      let update = await this.$store.dispatch("video/updateVideo", this.VIDEOCHOOSE);
      // this.tagData = await this.$store.dispatch("tag/getTagList");
      if (!false) {
        await Swal.fire(
            'สำเร็จ',
            'อัพโหลดวีดีโอสำเร็จแล้ว',
            'success'
        )
      }
      else{
        alert('can not update')
      }
      console.log(update)
      return update
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