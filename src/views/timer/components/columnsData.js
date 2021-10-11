export const columnsData = (h, $this) => [{
  prop: 'createTime',
  label: '生成时间',
  width: 220,
  align: 'left'
}, {
  prop: 'forecastLength',
  label: '时间长度 ',
  align: 'left'
}, {
  prop: 'modelType',
  label: '模型类型',
  align: 'left'
}, {
  prop: 'seasonCycle',
  label: '季节周期',
  align: 'left'
},
{
  prop: 'boxCox',
  label: 'box-cox变换',
  align: 'left'
},
{
  prop: 'status',
  label: '数据计算状态',
  align: 'left',
  columnSlots: (h, scoped) => {
    if (scoped.row.status === '0') {
      return (<span class="status blue">计算中</span>)
    } else if (scoped.row.status === '1') {
      return (<span class="status green">计算完成</span>)
    } else if (scoped.row.status === '-1') {
      return (<span class="status red">计算失败</span>)
    }
  }
}, {
  prop: 'operate',
  label: '操作',
  width: 230,
  align: 'left',
  columnSlots: (h, scoped) => {
    return (
      <div class="operate-btn-group">
        <el-button disabled={scoped.row.status !== '1'} style="padding-left:0" type="text" onClick={() => $this.downLoad(scoped.row.id)}>下载数据</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button disabled={scoped.row.status !== '1'} type="text" onClick={() => $this.showChart(scoped.row)}>查看图表</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-popconfirm onConfirm={() => $this.deleteHandle(scoped.row.id)} placement="top" title="确定删除吗？">
          <el-button type="text" slot="reference" >删除</el-button>
        </el-popconfirm>
      </div>
    )
  }
}
]
