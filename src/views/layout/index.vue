<template>
  <div class="app-wrapper">
    <slider-nav />
    <div :class="[$store.state.sliderBar.opened ? 'expend-collapsed' : '', 'app-main']">
      <nav-bar></nav-bar>
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
  },
  watch: {},
  components: {
    sliderNav,
    NavBar
  }
}
</script>
<style lang="sass" >
@import '@/styles/layout/index.scss';
</style>
