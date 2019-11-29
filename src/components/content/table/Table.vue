<template>
  <div>
    <table class="table">
      <slot></slot>
    </table>
  </div>
</template>

<script>

</script>

<style>
  .table {
    width: 1000px;
    text-align: center;
    line-height: 45px;
    color: #666666;
    margin-left: 30px;
  }

  .table tr:nth-child(odd){
    background: #F5F5F5;
  }

  .table thead tr:first-child {
    color: #000000;
    background-color: #FFFFFF;
  }

  .table tbody tr td:last-child span {
    margin-left: 10px;
    cursor:pointer;
    color: #4D84FF;
  }

  .table tbody tr td:last-child span:hover {
    color: #FF0000;
  }

</style>
