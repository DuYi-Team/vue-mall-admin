<template>
  <div class="app-wrapper">
    <slider-nav />
    <div :class="[$store.state.sliderBar.opened ? 'expend-collapsed' : '', 'app-main']">
      <nav-bar :routes="routes"></nav-bar>
      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import sliderNav from './components/sliderNav/index.vue'
import NavBar from './components/appMain/navBar.vue'
export default {
  data () {
    return {}
  },
  computed: {
    routes () {
      return this.$router.currentRoute.matched
    }
  },
  watch: {
    $router: function () {
      console.log(this.$router)
    }
  },
  components: {
    sliderNav,
    NavBar
  }
}
</script>
<style lang="sass" >
@import '@/styles/layout/index.scss';
</style>
