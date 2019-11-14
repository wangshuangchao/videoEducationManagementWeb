<template>
  <!-- TabBar具有通用性,这个组件封装TabBar只用于这个项目 -->
  <div id = "maintabbar">
    <tab-bar>
      <div slot = "logo">
        <logo></logo>
      </div>
      <div slot = "list">
        <tab-bar-item>
          <img slot = "icon" src="~assets/img/tabbar/gongnengdingyi@2x.png" alt="">
          <div slot = "content">首页</div>
          <img slot = "arrows" src="~assets/img/tabbar/unfold-arrow.png" alt="">
          <div slot = "titem">
            <tab-bar-item-item>
              <p slot = "itme">哈哈哈哈哈哈</p>
            </tab-bar-item-item>
            <tab-bar-item-item>
              <p slot = "itme">哈哈哈哈哈哈</p>
            </tab-bar-item-item>
            <tab-bar-item-item>
              <p slot = "itme">哈哈哈哈哈哈</p>
            </tab-bar-item-item>
          </div>
        </tab-bar-item>
        <tab-bar-item>
          <img slot = "icon" src="~assets/img/tabbar/gongnengdingyi@2x.png" alt="">
          <div slot = "content">年级管理</div>
          <img slot = "arrows" src="~assets/img/tabbar/fold-arrow.png" alt="">

        </tab-bar-item>
        <tab-bar-item>
          <img slot = "icon" src="~assets/img/tabbar/gongnengdingyi@2x.png" alt="">
          <div slot = "content">首页</div>
          <img slot = "arrows" src="~assets/img/tabbar/fold-arrow.png" alt="">
        </tab-bar-item>
        <tab-bar-item>
          <img slot = "icon" src="~assets/img/tabbar/gongnengdingyi@2x.png" alt="">
          <div slot = "content">年级管理</div>
          <img slot = "arrows" src="~assets/img/tabbar/fold-arrow.png" alt="">
        </tab-bar-item>
      </div>
    </tab-bar>
  </div>
</template>

<script>
   import TabBar from "components/common/tabbar/TabBar.vue"
   import Logo from "components/content/logo/logo.vue"
   import TabBarItem from "components/common/tabbar/TabBarItem.vue"
   import TabBarItemItem from "components/common/tabbar/TItemItem.vue"

   export default {
     components: {
       TabBar,
       Logo,
       TabBarItem,
       TabBarItemItem
     }
   }

</script>

<style>
</style>
