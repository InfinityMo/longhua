<template>
  <div class="flex-center forbidden-wrap">
    <div class="forbidden">
      <img src="@/assets/img/base/404.svg">
      <p>对不起，您访问的页面不存在！</p>
    </div>
  </div>
</template>
<script>

export default {
  name: 'None',
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.forbidden-wrap {
  height: 100vh;
  background-color: #fff;
  .forbidden {
    padding-top: 80px;
    text-align: center;
    p {
      padding-top: 10px;
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>
