import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify';
import tag from "./tag";
import video from "./videos";
import user from  "./user"
import error from "./error"
import spinner from "./spinner"
import success from "./success"
import playlist from "./playlist"
import challenge from "@/store/challenge";
Vue.use(Vuex)
const modules = {
  tag,
  video,
  user,
  error,
  spinner,
  success,
  playlist,
  challenge,



}
export default new Vuex.Store({
  plugins: [pathify.plugin],
  modules : modules
})