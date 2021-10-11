export const columnsData = (h, $this) => [{
  prop: 'createTime',
  label: '生成时间',
  align: 'left'
}, {
  prop: 'kValue',
  label: 'k值',
  align: 'left'
}, {
  prop: 'reductionType',
  label: '降维类型',
  align: 'left'
},
{
  prop: 'status',
  label: '数据计算状态',
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
      return (
        <span class="status blue">计算中<el-tooltip class="item"
          effect="dark"
          content="降维算法较为复杂，计算可能会花费较久的时间，请耐心等待"
          placement="top">
          <Icon type="icon-tip-14" padding={[0, 0, 0, 5]} />
        </el-tooltip></span>)
    } else if (scoped.row.status === '1') {
      return (<span class="status green">计算完成</span>)
    } else if (scoped.row.status === '-1') {
      return (<span class="status red">计算失败</span>)
    }
  }
}, {
  prop: 'operate',
  label: '操作',
  width: 320,
  align: 'left',
  columnSlots: (h, scoped) => {
    return (
      <div class="operate-btn-group">
        <el-button disabled={scoped.row.status !== '1'} style="padding-left:0" type="text" onClick={() => $this.downLoad(scoped.row.id)}>下载数据</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button disabled={scoped.row.status !== '1'} type="text" onClick={() => $this.showChart(scoped.row)}>查看图表</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button disabled={scoped.row.status !== '1' || isNaN(Number(scoped.row.kValue))} type="text" onClick={() => $this.showContribution(scoped.row.id)}>查看贡献度</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-popconfirm onConfirm={() => $this.deleteHandle(scoped.row.id)} placement="top" title="确定删除吗？">
          <el-button type="text" slot="reference" >删除</el-button>
        </el-popconfirm>
      </div>
    )
  }
}
]
