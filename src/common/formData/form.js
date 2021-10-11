export const editForm = {
  wareName: '', // 商品名称
  brandName: '', // 品牌名称
  wareType: '', // 商品类型
  wareDate: '', // 商品保质期
  wareDateType: '1', // 保质期日期类型
  limitNum: '', // 限购数量
  saleTime: [], // 销售时间
  desc: ''// 商品描述
}

export const editFormRules = {
  wareName: [
    { required: true, message: '请输入商品名称', trigger: 'blur' }
  ],
  brandName: [
    { required: true, message: '请选择品牌名称', trigger: 'change' }
  ],
  wareType: [
    { required: true, message: '请选择商品类型', trigger: 'change' }
  ],
  limitNum: [
    { required: true, message: '请输入限购数量', trigger: 'blur' },
    { pattern: /^[1-9]+$/, message: '请输入正确的数字', trigger: 'blur' }
  ],
  saleTime: [
    { required: true, message: '请选择上/下架时间', trigger: 'blur' }
  ],
  desc: [
    { required: true, message: '请输入商品描述', trigger: 'blur' }
  ]

}
export const treeData = [{
  id: 1,
  label: '数据开发部',
  children: [{
    id: 2,
    label: '开发组',
    children: [{
      id: 4,
      label: '王顾津'
    }, {
      id: 5,
      label: '倪志豪'
    }, {
      id: 6,
      label: '罗佺仪'
    }, {
      id: 7,
      label: '程帅'
    }, {
      id: 8,
      label: '任威龙'
    }]
  }, {
    id: 3,
    label: '数据组',
    children: []
  }]
},
{
  id: 9,
  label: '第三事业中心',
  children: [{
    id: 10,
    label: '营业三部',
    children: [{
      id: 11,
      label: '销售一组',
      children: [
        {
          id: 14,
          label: '张秀娟'
        }, {
          id: 15,
          label: '王思捷'
        }, {
          id: 16,
          label: '张玲莉'
        }, {
          id: 17,
          label: '王岚'
        }, {
          id: 18,
          label: '朱国华'
        }
      ]
    }, {
      id: 12,
      label: '销售二组',
      children: [
        {
          id: 19,
          label: '董雪'
        }, {
          id: 20,
          label: '左怡'
        }, {
          id: 21,
          label: '时薇'
        }, {
          id: 22,
          label: '葛基芸'
        }
      ]
    }, {
      id: 13,
      label: '销售三组',
      children: [
        {
          id: 23,
          label: '夏煜斐'
        }, {
          id: 24,
          label: '贾慧婷'
        }, {
          id: 25,
          label: '胡怡文'
        }, {
          id: 26,
          label: '汪吉'
        }, {
          id: 27,
          label: '孙路林'
        }, {
          id: 28,
          label: '朱史君'
        }, {
          id: 29,
          label: '叶娟'
        }, {
          id: 30,
          label: '徐诺'
        }, {
          id: 31,
          label: '阮慧敏'
        }
      ]
    }]
  }]
}
]
