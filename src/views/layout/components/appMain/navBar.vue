<template>
  <div class="nav-bar">
    <a-button type="primary" class="collapsed" @click="toggleCollapsed">
      <a-icon :type="$store.state.sliderBar.opened ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <!-- 面包屑 -->
    <a-breadcrumb :routes="routes">
      <template slot="itemRender" slot-scope="{ route }">
        <!-- {{routes.indexOf(route)}}{{routes.length}} -->
        <!-- {{route}} -->
        <!-- <span v-if="routes.indexOf(route) === routes.length - 1">{{ route.meta.title }}</span> -->
        <router-link
          :to="{name: route.name, path: route.path ? route.path : '/home'}"
        >{{ route.meta.title }}</router-link>
        <!-- <router-link :to="`${paths}`">{{route.meta.title}}</router-link> -->
      </template>
    </a-breadcrumb>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: ['routes'],
  watch: {},
  computed: {},
  methods: {
    toggleCollapsed () {
      this.$store.dispatch('ToggleSideBar')
    }
  }
}
</script>
