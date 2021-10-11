const mixins = {
  data () {
    return {

    }
  },
  methods: {
    _fetchSelectData (url, type) {
      return new Promise((resolve, reject) => {
        this.$request.post(url, type).then(res => {
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
        this.$request.post('/dropdownlist', { type: type }).then(res => {
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
    }
  }
}

export default mixins
