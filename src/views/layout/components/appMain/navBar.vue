<template>
  <div class="nav-bar">
    <a-button type="primary" class="collapsed" @click="toggleCollapsed">
      <a-icon :type="$store.state.sliderBar.opened ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <!-- 面包屑 -->
    <a-breadcrumb :routes="$store.state.currentRoute">
      <template slot="itemRender" slot-scope="{ route }">
        <router-link
          :to="{name: route.name, path: route.path ? route.path : '/home'}"
        >{{ route.meta.title }}</router-link>
      </template>

    </a-breadcrumb>
  </div>
</template>
<script>
export default {
  data () {
    return {
      routes: []
    }
  },
  computed: {

  },
  watch: {
    $routes: 'changeRoutes'
  },
  methods: {
    toggleCollapsed () {
      this.$store.dispatch('ToggleSideBar')
    },
    changeRoutes () {
      this.routes = this.$router.currentRoute.matched
    }
  },
  mounted () {
    this.routes = this.$router.currentRoute.matched
  }
}
</script>
