export const columnsData = (h, $this) => [{
  type: 'selection',
  align: 'center',
  width: 45
}, {
  prop: 'createTime',
  label: '创建时间',
  align: 'left'
}, {
  prop: 'crowdName',
  label: '人群名称',
  align: 'left'
},
{
  prop: 'brandName',
  label: '品牌',
  align: 'left'
},
{
  prop: 'crowdNumIndex',
  label: '人群数量指数',
  align: 'left'
}, {
  columnKey: 'status',
  prop: 'status',
  label: '拉取状态',
  align: 'left',
  // filters: [
  //   { text: '拉取中', value: '0' },
  //   { text: '拉取成功', value: '1' },
  //   { text: '拉取失败', value: '-1' }
  // ],
  // headerSlots: () => {
  //   return (<span class="table-head-link">拉取状态</span>)
  // },
  columnSlots: (h, scoped) => {
    if (scoped.row.status === '0') {
      return (<span class="status blue">拉取中</span>)
    } else if (scoped.row.status === '1') {
      return (<span class="status green">拉取成功</span>)
    } else if (scoped.row.status === '-1') {
      return (<span class="status red">拉取失败</span>)
    }
  }
}, {
  prop: 'operate',
  label: '操作',
  width: 120,
  align: 'left',
  columnSlots: (h, scoped) => {
    return (
      <div class="operate-btn-group">
        <el-button disabled={scoped.row.status !== '1'} style="padding-left:0" type="text" onClick={() => $this.downLoadHandle(scoped.row.id)}>下载</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-popconfirm onConfirm={() => $this.deleteHandle(scoped.row.id)} placement="top" title="确定删除吗？">
          <el-button type="text" slot="reference" >删除</el-button>
        </el-popconfirm>
      </div>
    )
  }
}
]
