<template>
  <div class="menu-wrap">
    <!-- logo -->
    <div class="flex-between-center logo-wrap">
      <img class="title"
           src="@/assets/img/system/title.svg">
    </div>
    <!-- 菜单区 -->
    <el-menu class="customer-menu"
             :router="true"
             :default-active="defaultActive"
             text-color="#fff"
             :unique-opened="true">
      <div v-for="(menu,index) in menus"
           :key="index">
        <div v-if="menu.children">
          <el-submenu :index="menu.id">
            <template slot="title">
              <Icon v-if="menu.icon"
                    class="ststem-icon"
                    :type="menu.icon" />
              <span>{{menu.title}}</span>
            </template>
            <el-menu-item v-for="(child,index) in menu.children"
                          :index="child.path"
                          :key="index">{{child.title}}</el-menu-item>
          </el-submenu>
        </div>
        <div v-else>
          <el-menu-item :index="menu.path">
            <icon v-if="menu.icon"
                  class="ststem-icon"
                  :type="menu.icon" />
            <span slot="title">{{menu.title}}</span>
          </el-menu-item>
        </div>
      </div>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {},
  computed: {
    ...mapGetters(['menus']),
    defaultActive () {
      const breadArr = []
      this.$route.matched.forEach(item => {
        if (item.meta.title) {
          if (!item.path) {
            item.path = item.redirect
          }
          if (breadArr.filter(breadItem => breadItem.title === item.meta.title).length <= 0) {
            breadArr.push({
              title: item.meta.title,
              path: item.path
            })
          }
        }
      })
      this.SEtBREADCURMB(breadArr)
      return this.$route.path
    }
  },
  mounted () { },
  methods: {
    ...mapMutations(['SEtBREADCURMB'])
  }
}
</script>

<style lang="less" scoped>
@import "../common/styles/iconSet";
.menu-wrap {
  position: fixed;
  top: 0;
  width: 200px;
  height: 100vh;
  background-color: #001433;
  overflow: hidden;
  box-sizing: border-box;
  z-index: 1;
  .logo-wrap {
    display: flex;
    justify-content: center;
    padding: 0 20px;
    height: 90px;
    .logo {
      width: 60px;
      height: 40px;
    }
    .title {
      width: 144px;
      height: 34px;
    }
  }

  .customer-menu {
    background-color: #001433;
  }
  .el-menu {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
}
</style>>
