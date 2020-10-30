<template>
  <v-card>
    <v-card-title primary-title>
      <h2 class="t-text-2xl  t-text-bold">
        <v-icon class="t-text-orange-500">mdi-account</v-icon>
        ข้อมูลผู้ใช้
      </h2>
    </v-card-title>
    <v-card class="t-p-8">


          <v-text-field v-model=" USERCHOOSE.first_name" required outlined label="First Name"
                        prepend-inner-icon="mdi-account-card-details" type="text"/><br>

          <v-text-field v-model=" USERCHOOSE.last_name" class="t-ml-0 md:t-ml-2" required outlined label="Last Name"
                        prepend-inner-icon="mdi-account-card-details" type="text"/><br>

          <v-text-field v-model=" USERCHOOSE.email" required outlined label="Email" prepend-inner-icon="mdi-email"
                        type="email"/>



      <v-card-actions>
        <div class="t-w-full">
          <v-btn class="t-float-right" large dark @click="updateUser()" color="primary">
            <v-icon>mdi-account-add-outline</v-icon>
            แก้ไขผู้ใช้
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>

  </v-card>

</template>

<script>
import {call, sync} from 'vuex-pathify'
export default {
  name: "index",
  data :()=>({
    user:[]
  }),
  computed:{
    USERCHOOSE: sync('user/userChoose')

  },
  async mounted() {
    await this.load()
  },
  methods:{
    ...call('user/*'),
    load : async function(){
      let idUser = this.$route.query.user;
      this.user = await this.$store.dispatch('user/getUserById', idUser)
      this.USERCHOOSE = this.user
      console.log(this.USERCHOOSE)

    },
    async updateUser(){
      let update = await this.$store.dispatch('user/UpdateUser', this.USERCHOOSE);
      if(!false){
        alert('Update Success')
        this.$router.push('/app/user/index')
      }
      console.log(update)
      return update
    },
  }
}
</script>

<style scoped>

</style>