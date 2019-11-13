<template>
  <div class = "tabbaritem">
        <div class="not_titem">
          <div class = "t_icon"><slot name = "icon"></slot></div>
          <div class = "t_content"><slot name = "content"></slot></div>
          <div class = "t_arrows"><slot name = "arrows"></slot></div>
        </div>
        <div class = "t_item"><slot name = "item"></slot></div>
  </div>
</template>

<script>
</script>

<style>
  .tabbaritem>div:first-child {
    background-color: red;
  }

  /* 非下拉项 */
  .not_titem {
    width: 320.3px;
    /* height: 45px; */
    padding-left: 40px;
    background-color: red;
    position: relative;
  }

  /* 鼠标划过每项时改变背景色 */
  .not_titem:hover {
    background-color: rgba(77,132,255,.17);
  }

  /* 前图标 */
  /* .t_icon {
    width: 90px;
    height: 100px;
    background-color: blue;
  } */

  .tabbaritem>div:nth-child(1)>div:first-child {
    width: 90px;
    height: 100px;
    /* background-color: red; */
    float: left;
  }

  .tabbaritem>div:nth-child(1)>div:nth-child(2) {
    float: left;
  }

  .tabbaritem>div:nth-child(1)>div:nth-child(3) {
    float: left;
  }

  .tabbaritem>div:nth-child(2) {
    clear: both;
  }

  .t_content {
    color: #C0C0C0;
    font-size: 25px;
  }
  /* 非下拉项 */





  .t_icon, .t_arrows, .t_content  {
    margin: 0 auto;
    margin-right: 10px;
    /* background-color: red; */
    width: 25px;
    height: 45px;
  }

</style>
