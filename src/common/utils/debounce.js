/*
function：防抖函数
anthor：Infinity
time：2020-08-04

func：函数引用
args：剩余参数
默认200ms
*/
export default function (func, ...args) {
  // 是否立即执行
  const immediate = true
  // vue当前实例赋值给self，用于执行外部传入的函数引用时，改变其内部this指向
  const self = this._self
  return () => {
    const context = self
    if (self.timeout) clearTimeout(self.timeout)
    if (immediate) {
      const callNow = !self.timeout
      self.timeout = setTimeout(() => {
        self.timeout = null
      }, 200)
      if (callNow) func.apply(context, args)
    } else {
      self.timeout = setTimeout(() => {
        func.apply(context, args)
      }, 200)
    }
  }
}
