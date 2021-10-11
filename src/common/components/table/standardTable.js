/*
Author：Infinity
Email：cmohan@foxmail.com
Time：2021-06-11
Remark：此组件为element-table的jsx封装。所有表格的属性、方法及回调参数均与element官方文档保持一致，
区别在于自定义加了header、column的slot组件进行二次jsx封装，以及分页器的集成。
*/
/* eslint-disable no-void */
import { Table, TableColumn, Pagination } from 'element-ui'
import Operate from '@/common/components/standardTable/operate'
import { kebabCaseToCamelCase } from '@/common/utils/funcStore'
const tableAttrs = Object.keys(Object.assign({}, Table.props))
const columnAttrs = Object.keys(Object.assign({}, TableColumn.props))
const pagingAttrs = Object.keys(Object.assign({}, Pagination.props))
export default {
  props: {
    pageSizes: {
      type: Array,
      default: () => [5, 10, 20, 50, 100]
    },
    layout: {
      type: String,
      default: 'total,prev,pager,next,sizes,jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    showOverflowTooltip: {
      type: Boolean,
      default: true
    }
  },
  data () {
    const paginationPageSize = this.$attrs.pagination ? this.$attrs.pagination.pageSize : 10
    return {
      tableMethods: {},
      pageChange: {
        pageNum: 1,
        pageSize: paginationPageSize
      }
    }
  },
  methods: {
    handleSizeChange (pageSize) {
      this.pageChange.pageSize = pageSize
      // 页数大小发生变化时，手动将当前页设置为1
      this.pageChange.pageNum = 1
      this.$emit('tableChange', this.pageChange)
    },
    handleCurrentChange (pageNum) {
      this.pageChange.pageNum = pageNum
      this.$emit('tableChange', this.pageChange)
    },
    dealProp ($this) {
      const attrs = { ...$this.$attrs, ...$this.$props }
      const tableFilterProps = {}
      const pagingFilterProps = {}
      const columnsFilterProps = {}
      Object.keys(attrs).forEach(item => {
        tableAttrs.includes(kebabCaseToCamelCase(item)) ? tableFilterProps[item] = attrs[item] : void (0)
        pagingAttrs.includes(kebabCaseToCamelCase(item)) ? pagingFilterProps[item] = attrs[item] : void (0)
        if (item === 'pagination') {
          pagingFilterProps['page-size'] = attrs[item].pageSize || 10
          pagingFilterProps['current-page'] = attrs[item].pageNum || 1
          pagingFilterProps.total = attrs[item].total || 0
        }
      })
      Object.keys($this.$props).forEach(item => {
        columnAttrs.includes(kebabCaseToCamelCase(item)) ? columnsFilterProps[item] = attrs[item] : void (0)
      })
      return { tableFilterProps, columnsFilterProps, pagingFilterProps }
    },
    dealListeners ($this) {
      const tableListeners = {}
      const { $listeners } = $this
      Object.keys($listeners).forEach(item => {
        if (item !== 'tableChange') {
          // 此处用箭头函数指向当前vue实例
          tableListeners[item] = (...args) => {
            this.$emit(item, ...args)
          }
        }
      })
      return tableListeners
    },
    setSlots (item) {
      const columnSlots = item.columnSlots ? {
        default: ({ row }) => {
          return item.columnSlots ? <Operate render={item.columnSlots} row={row} column={item}></Operate> : null
        }
      } : {}
      const headerSlots = item.headerSlots ? {
        header: ({ row }) => {
          return item.headerSlots ? <Operate render={item.headerSlots} row={row} column={item}></Operate> : null
        }
      } : {}
      const expandSlots = item.expandSlots ? {
        default: ({ row }) => {
          return item.expandSlots ? <Operate render={item.expandSlots} row={row} column={item}></Operate> : null
        }
      } : {}
      return Object.assign(columnSlots, headerSlots, expandSlots)
    },
    tableEmpty (emptyText = '暂无数据') {
      return {
        empty: ({ row }) => {
          return (<div class="empty-wrap">
            <Icon type="icon-no-data-54" padding={[50, 0, 10, 0]} />
            <div>{emptyText}</div>
          </div>)
        }
      }
    },
    // 在组件内部挂载table的方法
    mountMethods () {
      // eslint-disable-next-line no-unused-vars
      let that = this
      const orginMethods = Table.methods
      const proxyMethods = {}
      Object.keys(orginMethods).forEach(item => {
        proxyMethods[item] = () => {
          this.$refs.standardTable[item].call()
        }
      })
      that = Object.assign(this, proxyMethods)
    }
  },
  created () {
    this.mountMethods()
  },
  render () {
    const attrs = this.$attrs
    const props = this.dealProp(this)
    const listeners = this.dealListeners(this)
    return (<div>
      <el-table class="standard-table"
        ref="standardTable"
        scopedSlots={this.tableEmpty(props.tableFilterProps['empty-text'])}
        {...{ attrs: props.tableFilterProps }}
        {...{ on: { ...listeners } }}>
        {attrs.columns.map((item, index) => {
          return item.columnSlots || item.headerSlots || item.expandSlots
            ? <el-table-column {...{ attrs: { ...props.columnsFilterProps, ...item } }} scopedSlots={this.setSlots(item)}></el-table-column>
            : <el-table-column {...{ attrs: { ...props.columnsFilterProps, ...item } }} ></el-table-column>
        })}
      </el-table>
      {attrs.hidePagination || attrs.hidePagination === '' || props.tableFilterProps.data.length <= 0
        ? null : <el-pagination
          class="pagination"
          {...{ attrs: props.pagingFilterProps }}
          onsize-change={this.handleSizeChange}
          oncurrent-change={this.handleCurrentChange}>
        </el-pagination>
      }
    </div>)
  }
}
