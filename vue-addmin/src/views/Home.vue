<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
        clipped
        color="#3498DB"
    >
      <v-list dense v-for="item , index in links" :key="index">
        <v-list-item
            link
            :to="{name : item.routeName}"
        >
          <v-list-item-action>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>


    </v-navigation-drawer>


    <v-app-bar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        app
        color="#3498DB"
        dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title
          style="width: 300px"
          class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">Fitstir</span>
      </v-toolbar-title>
      <v-text-field
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Search"
          class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>


    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script>
export default {
  props: {
    source: String,
  },
  data: () => ({
    drawer: true,
    links: [
      {
        routeName: "listvideo",
        icon: "mdi-video",
        text: "Video"
      },
      {
        routeName: "tag",
        icon: "mdi-tag-multiple",
        text: "Tag"
      },
      {
        routeName: "userlist",
        icon: "mdi-account",
        text: "User"
      },
      {
        routeName: "videoplaylist",
        icon: "mdi-play-box-outline",
        text: "Play List"
      },
      {
        routeName: "challengelist",
        icon: "mdi-gamepad-variant",
        text: "ChallengeList"
      },

    ],
  }),
  async created() {
    this.$vuetify.theme.dark = false
    await this.$store.dispatch('user/storeToken');
    let user = await this.$store.dispatch('user/myProfile')
    console.log(user);
  },
}
</script>