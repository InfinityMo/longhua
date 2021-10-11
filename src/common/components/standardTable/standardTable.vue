<template>
  <div>
    <el-table :data="dealData"
              :row-key="randomKey"
              class="standard-table">
      <el-table-column v-for="column in columns"
                       :show-overflow-tooltip="true"
                       :key="column.dataKey"
                       :label="column.title"
                       :header-align="column.align||''"
                       :align="column.align||''"
                       :fixed="column.fixed||false"
                       :width="column.width">
        <template slot-scope="scope">
          <operate v-if="column.render"
                   :render="column.render"
                   :row="scope.row"
                   :column="column">
          </operate>
          <template v-else>
            <span class="span-text"
                  v-if="column.align"
                  :class="['text-'+column.align]">{{ scope.row[column.dataKey] }}</span>
            <span v-else>
              <span v-if="column.isShowHtml"
                    class="span-text"
                    v-html="scope.row[column.dataKey]"></span>
              <span v-else
                    class="span-text">{{ scope.row[column.dataKey] }}</span>
            </span>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pagination"
                   v-if="!hidePagination"
                   background
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="pageChange.pageNum"
                   :page-sizes="pageSizes"
                   :page-size="pageChange.pageSize"
                   :layout="paginationLayout.join(',')"
                   :total="total">
    </el-pagination>
  </div>
</template>
<script>
import { createUUID } from '@/common/utils/funcStore'
import operate from './operate'
export default {
  components: { operate },
  props: {
    // 表格列
    columns: {
      type: Array,
      required: true,
      default: () => []
    },
    // 表格数据源
    dataSource: {
      type: Array,
      required: true,
      default: () => []
    },
    // 表格分页
    pagination: {
      type: Object || Boolean,
      default: () => { }
    },
    // 控制分页显示的组件布局
    paginationLayout: {
      type: Array,
      default: () => ['total', 'prev', 'pager', 'next', 'sizes', 'jumper']
    },
    pageSizes: {
      type: Array,
      default: () => [5, 10, 20, 50, 100]
    },
    // 是否隐藏分页
    hidePagination: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const paginationPageSize = this.pagination ? this.pagination.pageSize : 10
    return {
      pageChange: {
        pageNum: 1,
        pageSize: paginationPageSize
      }
    }
  },
  computed: {

    dealData () {
      const isIndex = this.columns.some((item, index) => {
        return item.dataKey === '_index'
      })
      if (isIndex) {
        this.dataSource.forEach((item, index) => {
          this.dataSource[index]._index = (this.pageChange.pageNum - 1) * this.pageChange.pageSize + index + 1
        })
      }
      return this.dataSource
    },
    total () {
      return this.pagination.total || 0
    }
  },
  mounted () { },
  methods: {
    randomKey () {
      return createUUID()
    },
    handleSizeChange (pageSize) {
      this.pageChange.pageSize = pageSize
      // 页数大小发生变化时，手动将当前页设置为1
      this.pageChange.pageNum = 1
      this.$emit('tableChange', this.pageChange)
    },
    handleCurrentChange (pageNum) {
      this.pageChange.pageNum = pageNum
      this.$emit('tableChange', this.pageChange)
    }
  }
}
</script>
<style lang="less" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-weight: normal;
  padding: 20px 5px;
}
</style>
