<template>

  <v-container flat class="t-mt-4" v-if="response">
    <h1>{{ TAGDETAILLISTS.name }}</h1>
    <v-text-field class="t-mt-4" outlined v-model="search" append-icon="mdi-magnify" label="Search" single-line
                  hide-details></v-text-field>
    <br>
    <v-data-table :headers="headers" :items="TAGDETAILLISTS.tag_detail" :search="search">
      <template v-slot:body="{ items }">
        <tbody>
        <tr>
          <td><br>
            <v-text-field outlined v-model="form.name" label="ชื่อแท๊ก"></v-text-field>
          </td>
          <td><br>
            <v-btn text @click="createTagDetail()" color="success" dark>
              <v-icon>mdi-plus-circle</v-icon>
              เพิ่มรายการ
            </v-btn>
          </td>
        </tr>
        <tr v-for="tag,index in items" :key="index">
          <td><br>
            <v-text-field outlined :readonly="!tag.name" v-model="tag.name"></v-text-field>
          </td>
          <td>
<!--            <v-btn text v-if="tag.name" @click="tag.name = true" color="primary">-->
<!--              <v-icon>mdi-pencil</v-icon>-->
<!--              แก้ไขรายการ-->
<!--            </v-btn>-->
            <v-btn text  @click="updateTagdetail(tag.id,tag.name,tag.detail)" color="primary">
              <v-icon>mdi-pencil</v-icon>
              แก้ไข
            </v-btn>
            <v-btn text @click="removeTagdetail(tag.id)" color="red" dark>
              <v-icon>mdi-delete</v-icon>
              ลบรายการ
            </v-btn>
          </td>
        </tr>
        </tbody>
      </template>
    </v-data-table>


  </v-container>


</template>

<script>

import {call, sync} from 'vuex-pathify'
import swal from 'sweetalert2';

window.Swal = swal;


export default {
  name: "index",
  data: () => {
    return {
      form: {
        name: '',
        detail: '',
      },
      tagData: [],
      response: false,
      search: '',
      headers: [{
        text: 'ชื่อภาษาไทย',
        align: 'start',
        value: 'name_th',
      },
        {
          text: 'จัดการ',
          filterable: false,
        }
      ]

    }
  },
  computed: {
    TAGDETAILLISTS: sync('tag/tagDetailList')
  },
  async mounted() {
    await this.load()
  },
  methods: {
    ...call('tag/*'),

    clearForm: async function () {
      this.form = {}
    },

    load: async function () {
      let idtag = this.$route.query.tag;
      this.tag = await this.$store.dispatch('tag/getTagDataById', idtag)
      this.tagData = await this.$store.dispatch("tag/getTagList");

      this.TAGDETAILLISTS = this.tag;
      this.response = true
    },
    createTagDetail: async function () {
      this.form.detail = this.$route.query.tag;
      this.form.name = this.form.name
      let tagdetail = await this.$store.dispatch("tag/storeTagdetail", this.form);
      console.log(tagdetail);
      if (tagdetail != false) {
        await alert('Create Success')
        await this.load();
        await this.clearForm();
      }
    },
    updateTagdetail: async function (id, name, detail) {
      let form = {
        'detail': detail,
        'name': name,
        'id': id,
      }
      if (form.name){
        if (confirm('Do you want to edit?')) {
          let update = await this.$store.dispatch("tag/updateTagdetail", form);
          if(update != false ){
            await alert('Edit Success')
          }
          console.log(update)
          return update
        }
      }
      else {
        alert('ไม่สามารถเซฟได้')
        await this.load()
      }


    },
    removeTagdetail: async function (id) {
      if (confirm('Do you want to delete?')) {

        await this.$store.dispatch('tag/deleteTagDetail', id)
        await this.load()
      }
    },



  }

}
</script>

<style scoped>

</style>