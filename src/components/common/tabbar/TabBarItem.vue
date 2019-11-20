<template>
  <div class = "tabbaritem">
        <div class="not_titem" @click="not_titem_click">
          <div class = "t_icon"><slot name = "icon"></slot></div>
          <div class = "t_content"><slot name = "content"></slot></div>
          <div class = "t_arrows" :class="{fold: !isFold}"><slot name = "fold_arrows"></slot></div>
          <div class = "t_arrows" :class="{fold: isFold}"><slot name = "unfold_arrows"></slot></div>
        </div>
        <div class = "t_item" :class="{fold: isFold}"><slot name = "titem"></slot></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        fold: "fold",
        isFold: true,
      }
    },

    props: {
      routepath: String
    },

    methods: {
      not_titem_click(event) {
        this.isFold = !this.isFold
        if (this.routepath) {
          this.$router.replace(this.routepath)
        }
      }
    }
  }
</script>

<style>
  /* 非下拉项 */
  .not_titem {
    font-size: 22px;
    color: #A0A8B3;
    width: 320.3px;
    padding-left: 40px;
  }

  /* 鼠标划过时改变背景色 */
  .not_titem:hover {
    background-color: rgba(77,132,255,.17);
  }

  /* 清楚浮动 */
  .not_titem::after {
    content: "";
    display: block;
    clear: both;
  }

  /* 非下拉项左浮动在一行显示 */
  /* 以及其他相同样式 */
  .t_icon, .t_content, .t_arrows {
    float: left;
    height: 50px;
    margin-right: 10px;
    display: flex;
    align-items: center;
  }

  .t_icon>img{
    width: 25px;
    height: 25px;
  }
  /* 非下拉项 */

  /* 下拉项 */
  .fold {
    display: none;
  }
  /* 下拉项 */
</style>
