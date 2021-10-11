export const modalForm = {
  shop_name: '', // 店铺名称
  user_id: '', // 店铺user_id
  shop_id: '', // 店铺shop_id
  seller_type: '', // 店铺类型
  is_owner: '', // 店铺归属
  shop_url: '', // 店铺链接
  select_brand: [] // 已选择品牌
}

export const modalFormRules = {
  shop_name: [
    { required: true, message: '请输入店铺名称', trigger: 'blur' }
  ],
  seller_type: [
    { required: true, message: '请选择店铺类型', trigger: 'change' }
  ],
  is_owner: [
    { required: true, message: '请选择店铺归属', trigger: 'change' }
  ],
  shop_url: [
    { required: true, trigger: 'blur' }
  ],
  select_brand: [
    { required: true, message: '请选择品牌', trigger: ['change', 'blur'] }
  ]
}
