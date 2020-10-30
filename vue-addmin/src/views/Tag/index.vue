<template>

  <div>
    <v-text-field outlined v-model="search" append-icon="mdi-magnify" label="Search" single-line
                  hide-details></v-text-field>
    <br>
    <v-data-table :headers="headers" :items="TAGLIST" :search="search" class="elevation-1">
      <template v-slot:body="{ items }">
        <tbody>
        <tr>
          <td><br>
            <v-text-field outlined v-model="form.name" label="ชื่อ"></v-text-field>
          </td>
          <td><br>
            <v-btn text @click="createTag()" color="success" dark>
              <v-icon>mdi-plus-circle</v-icon>
              เพิ่มรายการ
            </v-btn>
          </td>
        </tr>

        <tr v-for="tag,index in items" :key="index">


          <td class="t-w-64  t-p-4">
            <br>
            <v-text-field outlined :readonly="!tag.name" v-model="tag.name"></v-text-field>
          </td>



          <td>
            <v-btn @click="$router.push(`/app/tagdetail/index?tag=${tag.id}`)" text color="info">
              <v-icon>mdi-eye</v-icon>
              ดูข้อมูล
            </v-btn>

            <v-btn text  @click="updateTag(tag.id,tag.name)" color="primary">
              <v-icon>mdi-pencil</v-icon>
              แก้ไข
            </v-btn>

            <v-btn @click="deleteTag(tag.id)" color="red" text>
              <v-icon>mdi-delete</v-icon>
              Delete
            </v-btn>
          </td>
        </tr>
        </tbody>
      </template>
    </v-data-table>

  </div>
</template>

<script>
import {call, sync} from "vuex-pathify";

export default {
  name: "index",
  data: () => {
    return {
      form:{
        name: ''
      },
      search: '',
      headers: [
        {
          text: 'ชื่อภาษาไทย',
          align: 'start',
          value: 'name',
        },
        {
          text: 'จัดการ',
          filterable: false,
        }
      ]
    }

  },
  computed: {
    TAGLIST: sync('tag/tagLists'),
  },
  async mounted() {
    await this.loadData()
  },
  methods: {
    ...call('tag/*'),
    clearForm: async function () {
      this.form = {}
    },
    async loadData() {
      this.TAGLIST = await this.$store.dispatch('tag/getTagList')
      console.log(this.VIDEOLISTS)
    },
    async createTag(){
      this.form.name = this.form.name
      let tag = await this.$store.dispatch('tag/storeTag',this.form)
      if (tag != false) {
        await alert('Create Success.')
        await this.loadData();
        await this.clearForm();
      }

    },
    updateTag: async function (id, name) {
      let form = {
        'name': name,
        'id': id,
      }
      if (form.name) {
        if (confirm('Do you want to edit?')) {
          let update = await this.$store.dispatch("tag/updateTag", form);
          if(update != false ){
            await alert('Edit Success')
          }
          console.log(update)
          return update
        }
      } else {
        alert('ไม่สามารถเซฟได้')
        await this.load()
      }
    },
    async deleteTag(pk) {
      if (confirm('Do you want to delete?')) {
        if(!false){
          await alert('Tag deleted')
          await this.$store.dispatch('tag/deleteTag',pk)
          await this.loadData()
        }


      }
    },



  },
}
</script>

<style scoped>

</style>