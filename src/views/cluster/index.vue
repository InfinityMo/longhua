<template>
  <div class="page">
    <div class="search-wrap">
      <el-form class="search-form-inline"
               ref="searchForm"
               label-width="70px">
        <el-col :span="24">
          <el-form-item label="上传文件：">
            <Upload className="upload-wrap"
                    icon="icon-upload-14"
                    :fileType="['.xlsx','.xls']"
                    fileSize="5"
                    :fileList="fileList"
                    @uploadHandel="uploadHandel" />
            <p class="upload-tip">请上传需要分析的人群数据表格，仅限 xlsx 格式，大小不超过5M<span class="link-open"
                    @click="downTemplate">下载模板</span></p>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <div class="table-wrap">
      <div class="flex-between-center table-info">
        <h4>数据列表</h4>
        <el-button type="primary"
                   @click="queryHandel">
          <Icon type="icon-refresh-14"
                :padding="[0,5,0,0]" />刷新
        </el-button>
      </div>
      <Table ref="table"
             :data="tableData"
             :columns="columns"
             :pagination="PAGING"
             @tableChange="tableChange" />
    </div>
    <Dialog :class="{'has-inner-dialog':INNERDIALOG}"
            :dialogTitle="dialogTitle"
            offestTop="30px"
            dialogWidth="1022px"
            :isShowFooter="false"
            :dialogShow="dialogShow"
            @dialogCancel="dialogCancel">
      <ClusterList v-if="dialogShow"
                   :dialogId="dialogId"
                   @dialogToBody="_dialogToBody"
                   slot="content"
                   ref="addContent" />
    </Dialog>
  </div>
</template>
<script>

import tableMixin from '@/mixins/dealTable'
import Upload from '@/common/components/upload/index'
import { downLoadFile } from '@/common/utils/funcStore'
import { columnsData } from './columnsData.js'
import { queryForm } from './searchForm'
import ClusterList from './components/clusterList'
export default {
  mixins: [tableMixin],
  components: { Upload, ClusterList },
  data () {
    return {
      fileList: [],
      fileType: ['xlsx', 'xls'],
      columns: columnsData(this.$createElement, this),
      queryFrom: JSON.parse(JSON.stringify(queryForm)),
      tableData: [],
      // 聚类列表
      dialogId: '',
      dialogTitle: '',
      dialogShow: false
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    uploadHandel (fileList) {
      const formData = new FormData()
      fileList.forEach(file => {
        formData.append('file', file)
      })
      this.$request.post('/cluster/upload', formData, {
        spinning: false,
        contentType: 'multipart/form-data'
      }).then(res => {
        if (res.errorCode === 1) {
          this.$message.success('导入成功')
          this.getTableData()
        } else if (res.errorCode === -1) {
          this.$message.error('文件上传失败')
        } else if (res.errorCode === 104) {
          this.$message.error('文件内容不正确，请检查文件')
        }
      })
    },
    queryHandel () {
      this._resetPageNum()
      this.getTableData()
    },
    getTableData () {
      const searchForm = {
        ...this.queryFrom,
        pageNum: this.PAGING.pageNum,
        pageSize: this.PAGING.pageSize
      }
      this.$request.post('/cluster/filelist', searchForm).then(res => {
        const resData = res.data.result || []
        this.tableData = resData
        this.PAGING.total = res.data.total
      })
    },
    deleteHandle (id) {
      this.$request.post('cluster/filedelete', { id }).then(res => {
        if (res) {
          this.$message.success('删除成功')
          this._isLastPage()
          this.getTableData()
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    modalShow (row) {
      const { id, fileName } = row
      this.dialogId = id
      this.dialogTitle = fileName
      this.dialogShow = true
    },
    dialogCancel () {
      this.dialogShow = false
    },
    downTemplate () {
      downLoadFile('/cluster/downloadmold')
    },
    // 表格分页的变化
    tableChange (changeParams) {
      this.PAGING.pageSize = changeParams.pageSize
      this.PAGING.pageNum = changeParams.pageNum
      this.getTableData()
    }
  }
}
</script>
<style lang="less" scoped>
@import "~@/common/styles/page-table";
@import "~@/common/styles/cluster";
</style>
