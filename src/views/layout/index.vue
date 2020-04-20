<template>
    <div class="app-wrapper">
        <slider-nav />
        <div class="app-main">
            <nav-bar></nav-bar>
        </div>
    </div>
</template>

<script>
import sliderNav from './components/sliderNav/index.vue'
import NavBar from './components/appMain/navBar.vue'
export default {
  data () {
    return {

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
