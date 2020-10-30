<template>
  <div>
    <Loader/>
    <Success></Success>
    <Error></Error>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex';
import Loader from './Loader'
import Success from "./Success";
import Error from "./Error";
export default {
  name: "Base",
  components: {Loader, Success, Error},
  props: {},
  computed: {
    ...mapGetters({
      error: "error/getError",
      spinnerVisible: "spinner/getVisible",
    }),
  },
  mounted() {
  },
  created() {
  },
  methods: {}
}
</script>