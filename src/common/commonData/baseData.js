/*
Author：Infinity
Time：2021-04-25
function：全局固定的数据文件
*/
// 基础信息配置-店铺配置，链接配置页面状态
export const stateOptions = [{
  value: '-1',
  label: '全部'
}, {
  value: '0',
  label: '关闭'
}, {
  value: '1',
  label: '打开'
}]

export const linkStateOptions = [
  {
    value: '-1',
    label: '全部'
  }, {
    value: '0',
    label: '已下架'
  }, {
    value: '1',
    label: '在售'
  }
]

export const statusOption = [
  {
    value: '1',
    label: '拉取成功'
  }, {
    value: '0',
    label: '拉取中'
  }, {
    value: '-1',
    label: '拉取失败'
  }
]

export const reductionType = [
  {
    value: '1',
    label: 'PCA'
  }, {
    value: '2',
    label: 'TSNE'
  }
]

export const kValues = [
  {
    value: '2',
    label: '2'
  }, {
    value: '3',
    label: '3'
  }, {
    value: '4',
    label: '4'
  }, {
    value: '5',
    label: '5'
  }, {
    value: '6',
    label: '6'
  }, {
    value: '7',
    label: '7'
  }, {
    value: '8',
    label: '8'
  }, {
    value: '9',
    label: '9'
  }, {
    value: '10',
    label: '10'
  }
]

export const modelType = [
  {
    value: '1',
    label: '乘法'
  }, {
    value: '2',
    label: '加法'
  }
]
export const seasonCycle = [
  {
    value: '4',
    label: '4'
  }, {
    value: '7',
    label: '7'
  }, {
    value: '12',
    label: '12'
  }, {
    value: '30',
    label: '30'
  }, {
    value: '365',
    label: '365'
  }
]

export const boxCox = [
  {
    value: '1',
    label: '是'
  }, {
    value: '0',
    label: '否'
  }
]
