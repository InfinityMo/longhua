<template>
  <div class="bread">
    <label v-for="(bread,index) in getBreadCurmb"
           :class="{'last-bread':index ===getBreadCurmb.length-1}"
           :key="index">{{bread.title}}<span v-if="index!==getBreadCurmb.length-1">/</span></label>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {},
  computed: {
    ...mapGetters(['getBreadCurmb'])
  }
}
</script>

<style lang="less" scoped>
.bread {
  position: fixed;
  top: 50px;
  right: 0;
  left: 200px;
  height: 40px;
  padding: 0 40px;
  font-size: 14px;
  line-height: 40px;
  color: #777;
  background-color: #fff;
  box-shadow: 0 1px 2px #ddd;
  z-index: 2500;
  span {
    padding: 0 10px;
  }
  .last-bread {
    color: #333;
  }
}
</style>>
