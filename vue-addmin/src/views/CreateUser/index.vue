<template>
  <div>

    <v-card>
      <v-card-title primary-title>
        <h2 class="t-text-2xl  t-text-bold">
          <v-icon class="t-text-orange-500">mdi-account</v-icon>
          สร้างผู้ใช้
        </h2>
      </v-card-title>
      <v-card class="t-p-8">
        <v-layout row>
          <v-flex md6 xs12>
            <v-text-field v-model=" form.first_name" required outlined label="First Name"
                          prepend-inner-icon="mdi-account-card-details" type="text"/>
          </v-flex>
          <v-flex md6 xs12>
            <v-text-field v-model=" form.last_name" class="t-ml-0 md:t-ml-2" required outlined label="Last Name"
                          prepend-inner-icon="mdi-account-card-details" type="text"/>
          </v-flex>
          <v-flex md6 xs12>
            <v-text-field v-model=" form.username" required outlined label="Username"
                          prepend-inner-icon="mdi-account" type="text"/>

          </v-flex>
          <v-flex md6 xs12>
            <v-text-field v-model=" form.email" required outlined label="Email" prepend-inner-icon="mdi-email"
                          type="email"/>

          </v-flex>

          <v-flex md6 xs12>
            <v-text-field v-model=" form.password" required outlined label="Password" type="password"/>
          </v-flex>

          <v-flex md6 xs12>
            <v-text-field v-model=" form.password_confirm" class="t-ml-0 md:t-ml-2" required outlined
                          label="Confirm password" type="password"/>
          </v-flex>


        </v-layout>
<!--        <v-checkbox label="ตั้งค่าเป็นแอดมิน" v-model="is_staff" @click="addToAdmin()"></v-checkbox>-->

        <v-card-actions>
          <div class="t-w-full">
            <v-btn class="t-float-right" large dark @click="createUser()" color="primary">
              <v-icon>mdi-account-add-outline</v-icon>
              สร้างผู้ใช้
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>

    </v-card>

  </div>
</template>

<script>
import {call, sync} from 'vuex-pathify'

export default {
  name: "index",
  data: () => ({

    form: {
      first_name: null,
      last_name: null,
      username: null,
      password: null,
      password_confirm: null,
      email: null,
    }
  }),
  computed: {},
  mounted() {

  },
  methods: {
    ...call('user/*'),
    async createUser() {
      let data = await this.$store.dispatch('user/createUser', this.form)
      if (data) {
        await alert('Create Success')
        await this.$router.push('/app/user/index')
      }

      console.log(this.form)
      return data
    },

    async addToAdmin(){
      this.is_staff = true
    }
  }
}
</script>

<style scoped>

</style>