<template>
  <!-- logo组合,如果别的位置用可以直接使用 -->
  <div id = "logo">
    <img src="~assets/img/tabbar/logo.png" alt="">
    <div id = "fontlogo">
      <img src="~assets/img/tabbar/chfontlogo.png" alt="">
      <img src="~assets/img/tabbar/ecfontlogo.png" alt="">
    </div>
  </div>
</template>

<script>
</script>

<style>

  #logo {
    width: 200px;
    height: 69px;
  }

  #logo>img {
    float: left;
    margin-right: 10px;
  }

  #fontlogo {
    height: 59px;
    float: left;
  }

  #fontlogo>img {
    display: block;
    margin: 3px;
  }

</style>
