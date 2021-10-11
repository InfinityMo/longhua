export const columnsData = (h, $this) => [{
  dataKey: '_index',
  title: '序号',
  align: 'center',
  width: 80
}, {
  dataKey: 'shop_name',
  title: '店铺名称'
}, {
  dataKey: 'shop_url',
  title: '店铺链接'
}, {
  dataKey: 'seller_type',
  title: '店铺类型'
}, {
  dataKey: 'update_time',
  title: '更新时间'
},
// {
//   dataKey: 'update_by',
//   title: '更新人'
// },
{
  dataKey: 'operate',
  title: '操作',
  width: 120,
  render: (h, scoped) => {
    return (
      <div>
        <el-button type="text" onClick={() => $this.editMoadl(scoped)}>编辑</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-popconfirm onOnConfirm={() => $this.deleteHandle(scoped)} placement="top" title="确定删除吗？">
          <el-button type="text" slot="reference" >删除</el-button>
        </el-popconfirm>
      </div>
    )
  }
}]
