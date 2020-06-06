<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <app-header v-if="header_show"></app-header>
    <router-view />
    <app-footer v-if="footer_show"></app-footer>
  </div>
</template>

<script>

import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';

export default {
  name: 'App',
  data () {
    return {
      header_show: true,
      footer_show: true,
    }
  },
  components: {
    'app-header': Header,
    'app-footer': Footer,
  },
  methods: {
    //是否显示头部
    public_header: function (bool) {
      this.header_show = bool;
    },
    //是否显示底部
    public_footer: function (bool) {
      this.footer_show = bool;
    }

  }

}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
