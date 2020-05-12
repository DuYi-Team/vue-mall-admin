<template>
  <div class="slider-nav">
    <a-menu
     :default-selected-keys="[routes[0] ? routes[0].children[0].name: '1']"
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
              <router-link :to="route.path + '/' + subRoute.path">
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
