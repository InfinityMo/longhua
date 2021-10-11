<template>
  <div class="main-wrap">
    <breadcrumb />
    <div class="main-content">
      <router-view></router-view>
      <copyright />
    </div>
  </div>
</template>

<script>
import breadcrumb from './breadcrumb'
import copyright from './copyrightLayout'
export default {
  components: {
    breadcrumb,
    copyright
  }
}
</script>

<style lang="less" scoped>
.main-wrap {
  position: relative;
  width: 100%;
  padding: 90px 20px 0 20px;
  box-sizing: border-box;
  .main-content {
    padding: 20px 0 30px 0;
  }
}
</style>>
