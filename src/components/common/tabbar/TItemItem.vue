<template>
  <div class="titemitem" @click="titemitem_click">
    <slot name = "itme"></slot>
  </div>
</template>

<script>
  export default {
    props: {
      routepath: String
    },
    methods: {
      titemitem_click(){
        if (this.routepath) {
          this.$router.replace(this.routepath)
        }
      }
    }
  }
</script>

<style>
  .titemitem {
    padding-left: 70px;
    line-height: 35px;
  }

  .titemitem:hover {
    color: #FFFFFF;
  }

  .titemitem {
    color: #A0A8B3;
    font-size: 17px;
  }

  .titemitem p{
    margin: 0px;
  }

</style>
