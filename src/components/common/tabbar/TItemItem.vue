<template>
  <div class="titemitem">
    <slot name = "itme"></slot>
  </div>
</template>

<script>
</script>

<style>
  .titemitem {
    padding-left: 70px;
    /* height: 35px; */
    line-height: 35px;
  }
  .titemitem:hover {
    background-color: rgba(77,132,255,.17);
  }
  .titemitem p{
    font-size: 19px;
    margin: 0px;
    color: darkgray;
  }
</style>
