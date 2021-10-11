<template>
  <div class="page">
    <div class="search-wrap">
      <el-form class="search-form-inline"
               :model="queryFrom"
               ref="searchForm"
               label-width="70px">
        <el-col :span="8">
          <el-form-item label="选择品牌：">
            <el-select v-model="queryFrom.brandId"
                       clearable
                       @change="selectChange"
                       placeholder="请选择品牌">
              <el-option v-for="item in selectOption"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="关键词：">
            <el-input v-model="queryFrom.keyword"
                      clearable
                      placeholder="请输入关键词"
                      autocomplete="off">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="PAGE：">
            <div slot="label">PAGE<el-tooltip effect="dark"
                          content="策略中心的页码"
                          placement="top">
                <Icon type="icon-tip-14"
                      :padding="[0, 2, 0, 2]" />
              </el-tooltip>：</div>
            <el-input v-model="queryFrom.page"
                      placeholder="请输入页码"
                      clearable
                      type="text"
                      @keyup.native="changeAmount">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8"
                class="search-btn">
          <el-form-item>
            <el-button type="primary"
                       :disabled="btnDisabled"
                       @click="queryHandel">拉取数据</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <div class="table-wrap">
      <div class="flex-between-center table-info">
        <h4>画像数据</h4>
      </div>
      <Table :data="tableData"
             :columns="columns"
             hidePagination
             empty-text="请输入正确的参数后，点击 “拉取数据” 查看画像数据" />
    </div>
  </div>
</template>
<script>
import tableMixin from '@/mixins/dealTable'
import { columnsData } from './columnsData.js'
import { queryForm } from './searchForm'
import { messageBox } from '@/common/utils/temp'
export default {
  mixins: [tableMixin],
  data () {
    return {
      queryFrom: JSON.parse(JSON.stringify(queryForm)),
      columns: columnsData(this.$createElement, this),
      tableData: [],
      btnDisabled: true,
      selectOption: [] // 品牌数据
    }
  },
  watch: {
    'queryFrom.brandId' () {
      this.btnDisabled = !String(this.queryFrom.brandId)
    }
  },
  created () {
    this.getSelectData()
  },
  methods: {
    getSelectData () {
      this._fetchSelectData('1').then(res => {
        this.selectOption = res
      })
    },
    changeAmount () {
      if (!(/^[1-9]\d*$/).test(this.queryFrom.page)) {
        this.queryFrom.page = ''
      }
    },
    getTableData () {
      const searchForm = {
        ...this.queryFrom
      }
      this.$request.post('/tacticalcentercrawl/getmainlist', searchForm).then(res => {
        if (res.errorCode === 100 || res.errorCode === 104) {
          // messageBox.call(this)
          messageBox(this)
          return
        }
        if (res.errorCode === 105) {
          this.tableData = []
          this.$message.warning('请输入正确的参数')
          return
        }
        if (res.errorCode === 1) {
          this.$notify({
            title: '开始拉取',
            message: '数据拉取成功后不再弹出"成功"通知，可直接至"策略中心画像下载"菜单进行查看',
            type: 'success',
            duration: 5000
          })
          const resData = res.data.result || []
          this.tableData = resData
        }
      })
    },
    selectChange (value) {
      this.$request.post('/tacticalcentercrawl/checkcookie', { brandId: value }).then(res => {
        if (res.errorCode === 100) {
          messageBox(this)
        }
      })
    },
    queryHandel () {
      this._resetPageNum()
      this.getTableData()
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/common/styles/page-table";
</style>
