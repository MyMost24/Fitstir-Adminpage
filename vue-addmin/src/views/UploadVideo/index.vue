<template>
  <app>
    <template>
      <v-content>
        <v-container>
          <v-col>
            <v-flex>
              <h1> Upload Video</h1>
            </v-flex>

            <v-flex class="partAdd">
              <v-stepper v-model="e1">
                <v-stepper-header>
                  <v-stepper-step :complete="e1 > 1" step="1">
                    Select video file
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step :complete="e1 > 2" step="2">
                    Select image
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step :complete="e1 > 3" step="3">
                    Enter video detail
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step :complete="e1 > 4" step="4">
                    Choose video tag
                  </v-stepper-step>

                </v-stepper-header>

                <v-stepper-items>
                  <v-stepper-content step="1">
                    <v-card class="mb-12" height="400px" align="center">

                      <h3 style="margin-top: 20px">{{ selectedVideoName }}</h3>

                      <div>
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
                    </v-card>

                    <v-btn color="primary" @click="e1 = 2">
                      Continue
                    </v-btn>

                    <v-btn text>
                      Cancel
                    </v-btn>
                  </v-stepper-content>

                  <v-stepper-content step="2">
                    <v-card class="mb-12" height="400" align="center">
                      <v-card class="cardImage">
                        <v-img :src="selectedImage"></v-img>
                      </v-card>
                      <div>
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
                    </v-card>

                    <v-btn color="primary" @click="e1 = 3">
                      Continue
                    </v-btn>

                    <v-btn text @click="e1 = 1">
                      Back
                    </v-btn>
                  </v-stepper-content>

                  <v-stepper-content step="3">
                    <v-card class="mb-12" height="400px">
                      <v-layout row>
                        <v-flex class="col-4">
                          <v-text-field class="text-field" label="Video Name" v-model="form.name"></v-text-field>
                          <v-textarea class="text-field" label="Description" v-model="form.description">
                          </v-textarea>

                          <h5>
                            {{ selectedVideoName }}
                          </h5>

                        </v-flex>
                        <v-flex class="col-8">
                          <v-card class="showImage">
                            <v-img :src="selectedImage"></v-img>
                          </v-card>
                        </v-flex>

                      </v-layout>
                    </v-card>

                    <v-btn color="primary" @click="e1 = 4">
                      Continue
                    </v-btn>

                    <v-btn text @click="e1 = 2">
                      Back
                    </v-btn>

                  </v-stepper-content>

                  <v-stepper-content step="4">
                    <v-card class="mb-12" height="auto">
                      <v-layout wrap>
                        <div v-for="item,index in tags" :key="index">

                          <div>
                            <h3>{{ item.name }}</h3>
                            <div v-for="detail, index in item.tag_detail" :key="index">
                              <!--                              <pre>{{form.tag_type}}</pre>-->
                              <input id="tag_checkbox" type="checkbox" :name="`tag${index}`" :id="`tag${index}`"
                                     :value="detail.id" v-model="form.tag_type">
                              <label :for="`tag${index}`">{{ detail.name }}</label><br>


                            </div>
                          </div>

                        </div>
                      </v-layout>

                    </v-card>

                    <v-btn color="primary" @click="saveData">
                      Upload
                    </v-btn>

                    <v-btn text @click="e1 = 3">
                      Back
                    </v-btn>

                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
            </v-flex>
          </v-col>

        </v-container>
      </v-content>
    </template>

  </app>
</template>

<script>
import axios from 'axios';
import {sync, call} from 'vuex-pathify'

export default {
  name: "index",

  data: () => {
    return {
      e1: 1,
      isSelecting: false,
      selectedVideoName: null,
      selectedImage: null,
      tags: [],

      form: {
        image: null,
        name: null,
        video: null,
        description: null,
        tag_type: [],
      }

    };
  },
  computed: {

    ...sync('video/*'),
    buttonText() {
      return this.selectedFile ? this.selectedFile.name : this.defaultButtonText
    },
  },

  async mounted() {
    await this.loadData()
  },

  methods: {
    ...call('video/*'),
    ...call('tag/*'),

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
      var file = e.target.files || e.dataTransfer.files;
      this.form.image = e.target.files[0]
      this.selectedImage = URL.createObjectURL(e.target.files[0]);
    },


    async loadData() {
      this.tags = await this.$store.dispatch('tag/getTagList')
    },
    async saveData() {
      console.log(this.form.tag_type)
      let data = await this.saveVideo(this.form)
      if(!false){
        await alert('Upload Success')
        await this.$router.push('/app/video/listvideo')

      }
      console.log(data)
      return data
    }
  },
}
</script>

<style scoped>
.text-field {
  margin-left: 20px;
}

.cardImage {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}

.showImage {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
</style>
