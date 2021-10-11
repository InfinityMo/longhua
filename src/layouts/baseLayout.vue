<template>
  <div>
    <!-- 左侧菜单 -->
    <Menu />
    <!-- 右侧内容区 -->
    <section class="content"
             v-loading="$store.state.spinning"
             element-loading-text="加载中，请稍后..."
             element-loading-background="rgba(0, 0, 0, .6)">
      <Header />
      <Main />
    </section>
  </div>
</template>

<script>
import Header from './headLayout'
import Menu from './menuLayout'
import Main from './mainLayout'
export default {
  components: {
    Header,
    Menu,
    Main
  }
}
</script>

<style lang="less" scoped>
.content {
  position: relative;
  left: 200px;
  width: calc(100% - 200px);
  min-height: 100vh;
  display: flex;
  height: 100%;
}
</style>
