<template>
  <div class="slider-nav">
    <a-menu
     :default-selected-keys="[$router.currentRoute.name]"
     :default-open-keys="[$router.currentRoute.matched[0].name]"
      mode="inline"
      theme="dark"
      :inlineCollapsed="$store.state.sliderBar.opened"
    >
      <a-sub-menu v-for="(route) in routes" :key="route.name" >
          <span slot="title">
            <a-icon :type="route.meta.icon" />
            <span>{{route.meta.title}}</span>
          </span>

            <a-menu-item v-for="(subRoute) in route.children" :key="subRoute.name">
              <router-link :to="route.path ? route.path + '/' + subRoute.path : subRoute.path">
              <a-icon :type="subRoute.meta.icon" />
            <span>{{subRoute.meta.title}}</span>
            </router-link>
            </a-menu-item>

      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      routes: this.$store.state.permission.routers.filter((v) => !v.hidden)
    }
  },
  computed: {
    // routes () {
    //   const routes = this.$store.state.permission.routers.filter((v) => !v.hidden)
    //   console.log(routes)
    //   return routes
    // }
  },
  methods: {

  }
}
</script>
