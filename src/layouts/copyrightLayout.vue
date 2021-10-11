<template>
  <div class="copyright">© {{nowYear}} 上海联恩商钥互联网科技股份有限公司. All rights reserved.</div>
</template>
<script>
export default {
  computed: {
    nowYear () {
      return new Date().getFullYear()
    }
  }
}
</script>
<style lang="less" scoped>
.copyright {
  position: absolute;
  bottom: 20px;
  left: calc(50% - 190px);
  font-size: 12px;
  color: #777;
  text-align: center;
  box-sizing: border-box;
}
</style>
