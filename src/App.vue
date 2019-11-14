<template>
  <div id="app">
    <main-tab-bar></main-tab-bar>
  </div>
</template>
<script>
  import MainTabBar from "components/content/maintabbar/MainTabBar.vue"
  import TabBarItem from "components/common/tabbar/TabBarItem.vue"

  export default {
    components: {
      MainTabBar,
      TabBarItem
    },
  }

</script>
<style>
  @import url("assets/css/base.css");
</style>
