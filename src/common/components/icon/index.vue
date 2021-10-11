<template>
  <svg class="svg-icon"
       @mouseenter="mouseEnter"
       @mouseleave="mouseLeave"
       :style="[iconSize,iconPadding]"
       aria-hidden="true">
    <use :xlink:href="iconType"></use>
  </svg>
</template>
<script>
// icon 组件:
// type:为iconfont名称，icon-xxxx-height icon为iconfont前缀，可重定义,height：定义图标高度，默认为14
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    // 图标距离周围的距离，需传入数组
    padding: {
      type: Array,
      default: () => []
    },
    hover: {
      type: Boolean,
      default: false
    },
    hoverType: {
      type: String
    }
  },
  data () {
    return {
      mouseFoucs: false
    }
  },
  computed: {
    iconType () {
      if (this.hover) {
        return this.mouseFoucs ? `#${this.hoverType}` : `#${this.type}`
      } else {
        return `#${this.type}`
      }
    },
    iconSize () {
      const strArr = this.type.split('-')
      return { fontSize: `${strArr[strArr.length - 1] || 14}px` }
    },
    iconPadding () {
      let paddingStyle = {}
      this.padding.forEach((e, i) => {
        this.padding[i] = `${this.padding[i]}px`
      })
      this.padding && this.padding.length > 0 ? paddingStyle = { padding: this.padding.join(' ') } : paddingStyle = {}
      return paddingStyle
    }
    // hoverStyle () {
    //   if (this.hover) {
    //     return this.mouseFoucs ? { color: `#${this.hoverColor}` } : { color: `#${this.color}` }
    //     //       if (this.mouseFoucs) {
    //     //  return { color: `#${this.hoverColor}` }
    //     //       }
    //   } else {
    //     return { color: `#${this.color}` }
    //   }
    // }
  },
  methods: {
    mouseEnter () {
      this.mouseFoucs = true
    },
    mouseLeave () {
      this.mouseFoucs = false
    }
  }
}
</script>
<style lang="less" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
