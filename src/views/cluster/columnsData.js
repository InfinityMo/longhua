export const columnsData = (h, $this) => [{
  prop: 'createTime',
  label: '上传时间',
  align: 'left'
}, {
  prop: 'fileName',
  label: '文件名称',
  align: 'left'
},
{
  prop: 'status',
  label: '文件检查状态',
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
      return (<span class="status blue">检查中</span>)
    } else if (scoped.row.status === '1') {
      return (<span class="status green">检查完成</span>)
    } else if (scoped.row.status === '-1') {
      return (<span class="status red">检查失败</span>)
    }
  }
}, {
  prop: 'operate',
  label: '操作',
  width: 150,
  align: 'left',
  columnSlots: (h, scoped) => {
    return (
      <div class="operate-btn-group">
        <el-button disabled={scoped.row.status !== '1'} style="padding-left:0" type="text" onClick={() => $this.modalShow(scoped.row)}>查看分析</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-popconfirm onConfirm={() => $this.deleteHandle(scoped.row.id)} placement="top" title="确定删除吗？">
          <el-button type="text" slot="reference" >删除</el-button>
        </el-popconfirm>
      </div>
    )
  }
}
]
