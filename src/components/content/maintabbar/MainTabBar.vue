<template>
  <!-- TabBar具有通用性,这个组件封装TabBar只用于这个项目 -->
  <div id = "maintabbar">
    <tab-bar>
      <div slot = "logo">
        <logo></logo>
      </div>
      <div slot = "list">
        <tab-bar-item :routepath="'/home'">
          <img slot = "icon" src="~assets/img/tabbar/gongnengdingyi@2x.png" alt="">
          <div slot = "content">首页</div>
        </tab-bar-item>
        <tab-bar-item>
          <img slot = "icon" src="~assets/img/tabbar/gongnengdingyi@2x.png" alt="">
          <div slot = "content">测试数据管理</div>
          <img slot = "fold_arrows" src="~assets/img/tabbar/fold-arrow.png" alt="">
          <img slot = "unfold_arrows" src="~assets/img/tabbar/unfold-arrow.png" alt="">
          <div slot = "titem">
            <tab-bar-item-item :routepath="'/testuser'">
              <p slot = "itme">测试用户管理</p>
            </tab-bar-item-item>
            <tab-bar-item-item :routepath="'/testVideos'">
              <p slot = "itme">测试视频管理</p>
            </tab-bar-item-item>
            <tab-bar-item-item :routepath="'/testLiveRooms'">
              <p slot = "itme">测试直播间管理</p>
            </tab-bar-item-item>
          </div>
        </tab-bar-item>
        <tab-bar-item>
          <img slot = "icon" src="~assets/img/tabbar/gongnengdingyi@2x.png" alt="">
          <div slot = "content">科目年级管理</div>
          <img slot = "fold_arrows" src="~assets/img/tabbar/fold-arrow.png" alt="">
          <img slot = "unfold_arrows" src="~assets/img/tabbar/unfold-arrow.png" alt="">
          <div slot = "titem">
            <tab-bar-item-item :routepath="'/couser'">
              <p slot = "itme">科目管理</p>
            </tab-bar-item-item>
            <tab-bar-item-item :routepath="'/grade'">
              <p slot = "itme">年级管理</p>
            </tab-bar-item-item>
            <tab-bar-item-item :routepath="'/courseGrade'">
              <p slot = "itme">科目年级管理</p>
            </tab-bar-item-item>
          </div>
        </tab-bar-item>
        <tab-bar-item>
          <img slot = "icon" src="~assets/img/tabbar/gongnengdingyi@2x.png" alt="">
          <div slot = "content">管理员管理</div>
          <img slot = "fold_arrows" src="~assets/img/tabbar/fold-arrow.png" alt="">
          <img slot = "unfold_arrows" src="~assets/img/tabbar/unfold-arrow.png" alt="">
          <div slot = "titem">
            <tab-bar-item-item>
              <p slot = "itme">角色管理</p>
            </tab-bar-item-item>
            <tab-bar-item-item>
              <p slot = "itme">管理员管理</p>
            </tab-bar-item-item>
          </div>
        </tab-bar-item>
        <tab-bar-item>
          <img slot = "icon" src="~assets/img/tabbar/gongnengdingyi@2x.png" alt="">
          <div slot = "content">用户管理</div>
          <img slot = "fold_arrows" src="~assets/img/tabbar/fold-arrow.png" alt="">
          <img slot = "unfold_arrows" src="~assets/img/tabbar/unfold-arrow.png" alt="">
          <div slot = "titem">
            <tab-bar-item-item>
              <p slot = "itme">所有用户列表</p>
            </tab-bar-item-item>
            <tab-bar-item-item>
              <p slot = "itme">冻结用户列表</p>
            </tab-bar-item-item>
          </div>
        </tab-bar-item>
        <tab-bar-item>
          <img slot = "icon" src="~assets/img/tabbar/gongnengdingyi@2x.png" alt="">
          <div slot = "content">审核</div>
          <img slot = "fold_arrows" src="~assets/img/tabbar/fold-arrow.png" alt="">
          <img slot = "unfold_arrows" src="~assets/img/tabbar/unfold-arrow.png" alt="">
          <div slot = "titem">
            <tab-bar-item-item>
              <p slot = "itme">实名认证审核</p>
            </tab-bar-item-item>
            <tab-bar-item-item>
              <p slot = "itme">视频审核</p>
            </tab-bar-item-item>
            <tab-bar-item-item>
              <p slot = "itme">直播间审核</p>
            </tab-bar-item-item>
          </div>
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
     },
     methods: {
     }
   }

</script>

<style>
</style>
