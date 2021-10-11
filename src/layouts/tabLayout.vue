<template>
  <div>
    <!-- 右侧内容区 -->
    <section class="content"
             v-loading="$store.state.spinning"
             element-loading-text="加载中，请稍后..."
             element-loading-background="rgba(0, 0, 0, .6)">
      <Header class="tab-head">
        <div slot="left"
             class="flex-item-center">
          <img class="title"
               src="@/assets/img/system/title2.svg">
        </div>
      </Header>
      <router-view class="tab-content-wrap"></router-view>
      <copyright />
    </section>
  </div>
</template>

<script>
import Header from './headLayout'
import copyright from './copyrightLayout'
export default {
  components: {
    Header,
    copyright
  }
}
</script>

<style lang="less" scoped>
.tab-head {
  left: 0;
  width: 100%;
}
.tab-content-wrap {
  padding: 66px 20px 0 20px;
}
</style>
