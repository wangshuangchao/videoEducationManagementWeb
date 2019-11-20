<template>
  <div id="app">
    <main-tab-bar></main-tab-bar>
    <heading></heading>
    <div id="marinview">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import MainTabBar from "components/content/maintabbar/MainTabBar.vue"
  import Heading from "components/common/heading/Heading.vue"

  export default {
    components: {
      MainTabBar,
      Heading
    },
  }

</script>
<style>
  @import url("assets/css/base.css");
  #marinview {
    margin-left: 288px;
    margin-top: 3px;
    margin-bottom: 3px;
    background-color: #FFFFFF;
  }

</style>
