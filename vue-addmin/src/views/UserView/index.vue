<template>

  <div  class="t-p-10" >
    <h1>User</h1>
    <div  class="t-p-10" v-if="response">
      <v-text-field class="t-mt-4" outlined v-model="search" append-icon="mdi-magnify" label="ค้นหา" single-line hide-details></v-text-field>
      <br>
      <v-btn color="info" @click="$router.push('/app/createuser/index')">
        <v-icon color="white">mdi-account-plus</v-icon>
        Create User
      </v-btn>
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

</template>

<script>
import {call , sync} from 'vuex-pathify'
export default {
  name: "index",
  data: () => ({
    response : false,
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
    USERLISTS : sync('user/userLists')
  },
  async mounted() {
    await this.loadData()
  },
  methods:{
    ...call('user/*'),
    async loadData(){
      this.USERLISTS = await this.$store.dispatch('user/getUserList')
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