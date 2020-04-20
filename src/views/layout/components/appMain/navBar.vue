<template>
  <div class="nav-bar">
    <a-button
      type="primary"
      :class="[$store.state.sliderBar.opened ? 'expend-collapsed' : '', 'collapsed']"
      @click="toggleCollapsed"
    >
      <a-icon :type="$store.state.sliderBar.opened ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <!-- <div> -->
      <a-breadcrumb :routes="routes" >
        <template slot="itemRender" slot-scope="{ route, params, routes, paths }">
          <span v-if="routes.indexOf(route) === routes.length - 1">{{ route.breadcrumbName }}</span>
          <router-link v-else :to="`${basePath}/${paths.join('/')}`">{{ route.breadcrumbName }}</router-link>
        </template>
      </a-breadcrumb>
      <br />
      {{ $route.path }}
    <!-- </div> -->
  </div>
</template>
<script>
export default {
  data () {
    // const { lang } = this.$route.params
    return {
      basePath: '/components/breadcrumb',
      routes: [
        {
          path: 'index',
          breadcrumbName: 'home'
        },
        {
          path: 'first',
          breadcrumbName: 'first',
          children: [
            {
              path: '/general',
              breadcrumbName: 'General'
            },
            {
              path: '/layout',
              breadcrumbName: 'Layout'
            },
            {
              path: '/navigation',
              breadcrumbName: 'Navigation'
            }
          ]
        },
        {
          path: 'second',
          breadcrumbName: 'second'
        }
      ]
    }
  },
  methods: {
    toggleCollapsed () {
      this.$store.dispatch('ToggleSideBar')
    }
  }
}
</script>
