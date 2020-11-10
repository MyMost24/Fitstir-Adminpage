<template>
  <v-content>
    <v-container>
      <v-toolbar color="transparent" flat>
        <h2 class="text-3xl">

          {{head}}</h2>
        <v-spacer></v-spacer>
        <v-btn color="info" @click="$router.push('/app/createuser/index')">
          <v-icon color="white">mdi-account-plus</v-icon>
          Create User
        </v-btn>
      </v-toolbar>


      <v-tabs v-model="tab" color="blue" slider-color="primary">
        <v-tab>
          ผู้ใช้
        </v-tab>
        <v-tab-item>

          <div  class="t-p-10" >
            <h1>User</h1>
            <div  class="t-p-10" v-if="response">
              <v-text-field class="t-mt-4" outlined v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line hide-details></v-text-field>
              <br>

              <v-data-table  :headers="headers" :items="USERLISTS" :search="search" class="elevation-1"   >
                <template v-slot:body="{ items }">
                  <tbody>
                  <tr v-for="user,index in items" :key="index" >

                    <td class="w3-medium "  >{{user.first_name}}</td>
                    <td class="w3-medium"  >{{user.last_name}}</td>
                    <td class="w3-medium"  >{{user.email}}  </td>
                    <td class="w3-medium" v-if="user.userdetail" >{{user.userdetail.phone_number}}  </td>
                    <td class="w3-medium" v-else > -  </td>
                    <td class="w3-medium"  >
                      <div class="t-flex t-flex-row">

                        <v-btn @click="$router.push(`/app/userdetail/index?user=${user.id}`)" text color="info">
                          <v-icon>mdi-eye</v-icon>
                          ดูข้อมูล
                        </v-btn>

                        <v-btn @click="deleteUser(user.id)" color="red" text>
                          <v-icon>mdi-delete</v-icon>
                          Delete
                        </v-btn>

                      </div>
                    </td>
                  </tr>
                  </tbody>
                </template>
              </v-data-table>
            </div>
          </div>
        </v-tab-item>
        <v-tab>
          แอดมิน
        </v-tab>
        <v-tab-item>
          <div  class="t-p-10" >
            <h1>Admin</h1>
            <div  class="t-p-10" v-if="response">
              <v-text-field class="t-mt-4" outlined v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line hide-details></v-text-field>
              <br>
              <v-data-table  :headers="headers" :items="ADMINLIST" :search="search" class="elevation-1"   >
                <template v-slot:body="{ items }">
                  <tbody>
                  <tr v-for="admin,index in items" :key="index" >

                    <td class="w3-medium "  >{{admin.first_name}}</td>
                    <td class="w3-medium"  >{{admin.last_name}}</td>
                    <td class="w3-medium"  >{{admin.email}}  </td>
                    <td class="w3-medium" v-if="admin.userdetail" >{{admin.userdetail.phone_number}}  </td>
                    <td class="w3-medium" v-else > -  </td>
                    <td class="w3-medium"  >
                      <div class="t-flex t-flex-row">

                        <v-btn @click="$router.push(`/app/userdetail/index?user=${admin.id}`)" text color="info">
                          <v-icon>mdi-eye</v-icon>
                          ดูข้อมูล
                        </v-btn>

                        <v-btn @click="deleteUser(admin.id)" color="red" text>
                          <v-icon>mdi-delete</v-icon>
                          Delete
                        </v-btn>

                      </div>
                    </td>
                  </tr>
                  </tbody>
                </template>
              </v-data-table>


            </div>

          </div>
        </v-tab-item>
      </v-tabs>

    </v-container>
  </v-content>

</template>

<script>
import {call , sync} from 'vuex-pathify'
export default {
  name: "index",
  data: () => ({
    response : false,
    head: "สมาชิก",
    txt: "Hello World",
    tab: 0,
    search: '',
    headers: [
      {
        text: 'first name',
        align: 'start',
        value: 'firstname'
      },
      {
        text: 'last name',
        value: 'lastname'
      },
      {
        text: 'email',
        value: 'email'
      },
      {
        text: 'phone',
        value: 'phone'
      },
      {
        text: 'setting',
        filterable: false
      }


    ],

  }),
  computed:{
    USERLISTS : sync('user/userLists'),
    ADMINLIST : sync('user/adminList')
  },
  async mounted() {
    await this.loadData()
  },
  methods:{
    ...call('user/*'),
    async loadData(){
      this.USERLISTS = await this.getUserList()
      this.ADMINLIST = await this.getAdminList()
      console.log(this.USERLISTS)
      this.response = true
    },
    async deleteUser(pk) {
      if (confirm('Do you want to delete this user ?')) {

        await this.$store.dispatch('user/deleteUser', pk)
        await this.loadData()
      }
    },

  },

}
</script>

<style scoped>

</style>