<template>
  <div class="slider-nav">
    <a-menu
      :defaultSelectedKeys="[ $store.state.routes[0].children[0].name]"
      :defaultOpenKeys="[$store.state.routes[0].name]"
      mode="inline"
      theme="dark"
      :inlineCollapsed="$store.state.sliderBar.opened"
    >
      <!-- <a-menu-item v-for="(route, index) in $store.state.routes" :key="index">
        <a-icon :type="route.meta.icon"></a-icon>
        <span v-bind:key="index">{{route.meta.title}}</span>
      </a-menu-item> -->
      <a-sub-menu v-for="(route) in $store.state.routes" :key="route.name">
        <span slot="title">
          <a-icon :type="route.meta.icon" />
          <span>{{route.meta.title}}</span>
        </span>
        <a-menu-item v-for="(subRoute) in route.children" :key="subRoute.name">{{subRoute.meta.title}}</a-menu-item>

      </a-sub-menu>
      <!-- <a-menu-item key="1">
        <a-icon type="pie-chart" />
        <span>Option 1</span>
      </a-menu-item>
      <a-menu-item key="2">
        <a-icon type="desktop" />
        <span>Option 2</span>
      </a-menu-item>
      <a-menu-item key="3">
        <a-icon type="inbox" />
        <span>Option 3</span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <span slot="title">
          <a-icon type="mail" />
          <span>Navigation One</span>
        </span>
        <a-menu-item key="5">Option 5</a-menu-item>
        <a-menu-item key="6">Option 6</a-menu-item>
        <a-menu-item key="7">Option 7</a-menu-item>
        <a-menu-item key="8">Option 8</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title">
          <a-icon type="appstore" />
          <span>Navigation Two</span>
        </span>
        <a-menu-item key="9">Option 9</a-menu-item>
        <a-menu-item key="10">Option 10</a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="11">Option 11</a-menu-item>
          <a-menu-item key="12">Option 12</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
      -->
    </a-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {}
}
</script>
