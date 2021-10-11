<template>
  <div class="flex-between-center flex-item-center bottom-check"
       v-show="bottomShow">
    <p class="select-wrap">已选择<span>{{selectDataNum}}</span>条数据</p>
    <div class="btn-group">
      <slot name="btn"></slot>
      <!--  -->
    </div>
  </div>
</template>
<script>
export default {
  props: {
    bottomShow: {
      type: Boolean,
      default: false
    },
    selectDataNum: {
      type: Number || String,
      default: 0
    }
  }
}
</script>
<style lang="less" scoped>
.select-wrap {
  font-size: 18px;
  line-height: 26px;
  color: #333;
  span {
    padding: 0 5px;
    color: #1890ff;
  }
}
.bottom-check {
  position: fixed;
  bottom: 0;
  left: 200px;
  right: 0;
  height: 50px;
  padding: 0 40px;
  background-color: #fff;
  box-shadow: 0px -1px 2px -2px rgba(0, 0, 0, 0.16),
    0px -3px 6px rgba(0, 0, 0, 0.12), 0px 5px 12px 4px rgba(0, 0, 0, 0.09);
  z-index: 1;
  // .btn-group {
  //   padding-right: 20px;
  // }
}
</style>
