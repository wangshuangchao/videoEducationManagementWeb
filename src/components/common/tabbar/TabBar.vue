<template>
  <div id = "tabbar">
    <!-- 预留logo展示位置 -->
    <div id = "tlogo"><slot name="logo"></slot></div>
    <!-- 导航预留位置 -->
    <div id = "tlist_su">
      <div id = "tlist">
        <slot name = "list"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style>
  #tabbar {
    width: 320.3px;
    height: 100%;
    background-color: #262A33;
    /* 固定到浏览器左上角,不随浏览器滚动二滚动 */
    position: fixed;
    top: 0px;
    left: 0px;
  }

  #tlogo {
    /* 固定logo位置 */
    position: relative;
    top: 68px;
    left: 36px;
  }

  #tlist_su {
    /* 固定导航位置 */
    height: 75%;
    position: relative;
    top: 100px;
    /* padding-bottom: 10px; */
    /* 隐藏滚动条 */
    overflow: hidden;
  }

  #tlist {
    /* 使得内容上下滚动 */
    overflow-x: hidden;
    overflow-y: scroll;
    /* 隐藏滚动条 */
    position: absolute;
    left: 0;
    top: 0;
    right: -55px;
    bottom: 0;
  }

</style>
