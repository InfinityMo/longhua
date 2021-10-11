export default {
  name: 'operate',
  functional: true,
  props: {
    row: {
      type: Object
    },
    render: {
      type: Function,
      required: true
    },
    column: {
      type: Object,
      default: null
    }
  },
  render: (h, ctx) => {
    const params = {
      ...ctx.props
    }
    // if (ctx.props.column) {
    //   params.column = ctx.props.column
    // }
    return ctx.props.render(h, params)
  }
}
