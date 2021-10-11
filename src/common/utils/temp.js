export function messageBox ($that) {
  $that.$alert('<div class="flex message-box-wrap"><i class="el-message-box__status el-icon-warning"></i><div class="content"><p>该品牌cookie异常，请检查你的Chrome浏览器是否已安装TLSE插件，且10分钟内登陆过该品牌账号下的<a class="link-open strategy-link" target="_blabk" href="https://strategy.tmall.com">策略中心</a></p><p class="other-help">如需下载插件或其他帮助，请点击<span class="link-open" id="help">“帮助文档”</span></p></div ></div > ', '提示', {
    confirmButtonText: '确定',
    dangerouslyUseHTMLString: true,
    callback: action => { }
  })
  $that.$nextTick(() => {
    document.getElementById('help').onclick = toHelp.bind($that)
  })
}
function toHelp () {
  this.$router.push('/help/doc')
  const messageBox = document.querySelector('.el-message-box__wrapper')
  const closeIcon = messageBox.querySelector('.el-message-box__close')
  closeIcon.click()
}
