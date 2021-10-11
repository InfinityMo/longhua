
// import { createUUID } from '../common/utils/funcStore'
const mixins = {
  data () {
    return {
      PAGING: {
        total: 0,
        pageNum: 1,
        pageSize: 10
      },
      INNERDIALOG: false,
      pickerRangeMonth: '',
      pickerThreeRangeMonth: '',
      pickerMinDate: '',
      pickerNowOption: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.pickerMinDate = minDate.getTime()
          if (maxDate) {
            this.pickerMinDate = ''
          }
        },
        disabledDate: (time) => {
          // 时间最大选择区间为30天，且当前时间不可选择
          if (this.pickerMinDate) {
            const thirtyDay = (30 - 1) * 24 * 3600 * 1000
            let maxTime = this.pickerMinDate + thirtyDay
            const minTime = this.pickerMinDate - thirtyDay
            if (maxTime > new Date()) {
              maxTime = new Date() - 1 * 24 * 3600 * 1000
            }
            return time.getTime() > maxTime || time.getTime() < minTime
          }
          return time.getTime() > Date.now() - 1 * 24 * 3600 * 1000
        }
      },
      monthPickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > new Date(`${this.getLastMonth()}-01`).getTime() // 如果现在是12月，则getLastMonth（）为 2020-11，那么十二月不能选，之后年的月份都不可选
        }
      }
    }
  },
  methods: {
    _dialogToBody (flag = false) {
      this.INNERDIALOG = flag
    },
    _fetchSelectData (...params) {
      return new Promise((resolve, reject) => {
        this.$request.post('/interfacecommon/dropdownlist', { type: arguments[0], optionalDict: arguments[1] || {} }).then(res => {
          if (res) {
            const dropData = res.data || []
            resolve(dropData)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    _getSelectData (type) {
      const option = []
      return new Promise((resolve, reject) => {
        this.$request.post('/promotionconfig/dropdownlist', { type: type }).then(res => {
          if (res) {
            const dropData = res.data || []
            dropData.map((i) => {
              option.push({
                value: i.value,
                label: i.name
              })
            })
            resolve(option)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    _getCascader (level, type) {
      // const option = []
      return new Promise((resolve, reject) => {
        this.$request.post('/channeldropdownlist', { level: level, type: type }).then(res => {
          if (res) {
            const dropData = res.data || []
            // dropData.map((i) => {
            //   option.push({
            //     value: i.value,
            //     label: i.name,
            //     children: i.children && i.children.length > 0 ? this._setChild(i.children) : []
            //   })
            // })
            resolve(dropData)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    _setChild (arr) {
      const child = []
      arr.map(i => {
        child.push({
          value: i.value,
          label: i.name
        })
      })
      return child
    },
    _isLastPage () {
      const lastPage = Math.ceil(this.PAGING.total / this.PAGING.pageSize)
      // 最后一页的条数
      const lastPageLength = this.PAGING.total % this.PAGING.pageSize
      // 判断当前页是否是最后一页
      if (this.PAGING.pageNum === lastPage) {
        if (this.PAGING.pageNum !== 1) {
          if (lastPageLength === 1) {
            this.PAGING.pageNum--
          }
        }
      }
    },
    // 查询时重置当前页数为1
    _resetPageNum () {
      this.PAGING.pageNum = 1
    },
    // 重置表单
    _resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}

export default mixins
