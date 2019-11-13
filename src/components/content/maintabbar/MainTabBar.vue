<template>
  <!-- TabBar具有通用性,这个组件封装TabBar只用于这个项目 -->
  <div id = "maintabbar">
    <tab-bar>
      <logo slot = "logo"></logo>
      <tab-bar-item slot = "list">
        <img slot = "icon" src="~assets/img/tabbar/gongnengdingyi@2x.png" alt="">
        <div slot = "content">首页</div>
        <img slot = "arrows" src="~assets/img/tabbar/unfold-arrow.png" alt="">
        <p slot="item">哈哈哈哈哈哈哈哈</p>
        <p slot="item">哈哈哈哈哈哈哈哈</p>
        <p slot="item">哈哈哈哈哈哈哈哈</p>
      </tab-bar-item>
      <tab-bar-item slot = "list">
        <img slot = "icon" src="~assets/img/tabbar/gongnengdingyi@2x.png" alt="">
        <div slot = "content">年级管理</div>
        <img slot = "arrows" src="~assets/img/tabbar/fold-arrow.png" alt="">
      </tab-bar-item>
      <tab-bar-item slot = "list">
        <div slot = "content">首页</div>
        <img slot = "arrows" src="~assets/img/tabbar/fold-arrow.png" alt="">
      </tab-bar-item>
      <tab-bar-item slot = "list">
        <img slot = "icon" src="~assets/img/tabbar/gongnengdingyi@2x.png" alt="">
        <div slot = "content">年级管理</div>
        <img slot = "arrows" src="~assets/img/tabbar/fold-arrow.png" alt="">
      </tab-bar-item>

    </tab-bar>
  </div>
</template>

<script>
   import TabBar from "components/common/tabbar/TabBar.vue"
   import Logo from "components/content/logo/logo.vue"
   import TabBarItem from "../../common/tabbar/TabBarItem.vue"

   export default {
     components: {
       TabBar,
       Logo,
       TabBarItem
     }
   }

</script>

<style>
</style>
