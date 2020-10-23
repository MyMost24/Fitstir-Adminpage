import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify';
import tag from "./tag";
import video from "./video";
Vue.use(Vuex)
const modules = {
  tag,
  video
}
export default new Vuex.Store({
  plugins: [pathify.plugin],
  modules : modules
})