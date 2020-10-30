<template>
  <v-app id="inspire" style="background-image: url('./assets/Bg4.jpg')">
    <v-main class="">
      <v-container
          class="fill-height"
          fluid
      >
        <v-row
            align="center"
            justify="center"
        >
          <v-col
              cols="12"
              sm="8"
              md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                  color="primary"
                  dark
                  flat
              >
                <v-toolbar-title>Fitstir: Login</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <span>Source</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                      label="Username"
                      prepend-icon="mdi-account"
                      v-model="form.username"
                      :rules="[rules.required]"
                  ></v-text-field>

                  <v-text-field
                      label="Password"
                      v-model="form.password"
                      prepend-icon="mdi-lock"
                      :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show_password ? 'text' : 'password'"
                      @click:append="show_password = !show_password"
                      :rules="[rules.required]"
                      @keypress.13="getUserToken"
                      :error="error.password"
                      :error-messages="error.password"

                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn text="Login" @click="getUserToken">Login</v-btn>

              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Buttons from "../components/Buttons";
import Textinput from "../components/Textinput";
import Base from '@/components/Base/Base';

export default {
  extends: Base,
  name:"Login",
  component: {Buttons, Textinput},
  comments: {
    Textinput,
    Buttons
  },
  data: () => ({
    show_password: false,
    rules: {
      required: value => !!value || 'Required.',
    },
    form: {
      username: "",
      password: "",
      remember_me: false
    },
    user: {
      username: null,
      password: null
    }
  }),
  created() {
    this.get_logInItem()
  },
  methods: {
    remember__me() {
      let item = JSON.stringify(this.form)
      localStorage.setItem('login_item', item)
    },
    get_logInItem() {
      if (localStorage.getItem('login_item')) {
        let item = localStorage.getItem('login_item')
        localStorage.removeItem('login_item')
        this.form = JSON.parse(item)
      }
    },
    async getUserToken() {
      let token = await this.$store.dispatch('user/getUserToken', this.form)
      if (token) {
        if (this.form.remember_me) {
          this.remember__me()
        }
        await this.$router.push({
          name: 'VideoView'
        })
      }
    }
  },
}
</script>