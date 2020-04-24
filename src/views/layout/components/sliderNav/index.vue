<template>
  <div class="slider-nav">
    <a-menu
      :defaultSelectedKeys="[ $store.state.routes[0].children[0].name]"
      :defaultOpenKeys="[$store.state.routes[0].name]"
      mode="inline"
      theme="dark"
      :inlineCollapsed="$store.state.sliderBar.opened"
      @click="clickMenu"
    >
      <a-sub-menu v-for="(route) in $store.state.routes" :key="route.name">
        <span slot="title">
          <a-icon :type="route.meta.icon" />
          <span>{{route.meta.title}}</span>
        </span>
        <a-menu-item v-for="(subRoute) in route.children" :key="subRoute.name">{{subRoute.meta.title}}</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    clickMenu (item, key, keyPath) {
      this.$router.push({
        name: item.key
      })
      this.$store.dispatch('SET_CURRENTROUTER', this.$router.currentRoute.matched)
    }
  }
}
</script>
