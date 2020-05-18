<template>
  <div class="nav-bar">
    <a-button type="primary" class="collapsed" @click="toggleCollapsed">
      <a-icon :type="$store.state.sliderBar.opened ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <!-- 面包屑 -->
    <a-breadcrumb :routes="routes">
      <template slot="itemRender" slot-scope="{ route }">
        <span v-if="!route.meta.isPage">{{ route.meta.title }}</span>
        <router-link v-else
          :to="{name: route.name, path: route.path ? route.path : '/home'}"
        >{{ route.meta.title }}</router-link>
      </template>

    </a-breadcrumb>
    <ul class="user-info">
      <li class="username">
        欢迎{{$store.state.user.name}}
        <a-icon type="down" />
      </li>
      <li class="login-out-btn" @click="loginOut">
        退出
      </li>
    </ul>
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
    $route: {
      handler () {
        this.changeRoutes()
      }
    }
  },
  methods: {
    toggleCollapsed () {
      this.$store.dispatch('ToggleSideBar')
    },
    changeRoutes () {
      this.routes = this.$router.currentRoute.matched
    },
    loginOut () {
      this.$store.dispatch('LoginOut')
      location.reload()
    }
  },
  mounted () {
    this.routes = this.$router.currentRoute.matched
  }
}
</script>
