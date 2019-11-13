<template>
  <div id="app">
      <tab-bar-item>
        <img slot = "icon" src="~assets/img/tabbar/gongnengdingyi@2x.png" alt="">
        <div slot = "content">首页</div>
        <img slot = "arrows" src="~assets/img/tabbar/unfold-arrow.png" alt="">
        <p slot="item">哈哈哈哈哈哈哈哈</p>
        <p slot="item">哈哈哈哈哈哈哈哈</p>
        <p slot="item">哈哈哈哈哈哈哈哈</p>
      </tab-bar-item>
      <div  id = "abcd"></div>

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
  #abcd {
    width: 50px;
    height: 50px;
    background-color: #FF0000;
  }
</style>
