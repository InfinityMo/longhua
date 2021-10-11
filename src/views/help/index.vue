<template>
  <div class="help-wrap ">
    <ul class="menu">
      <li :class="{'active':menuIndex===menu.id}"
          v-for="menu in menus"
          :key="menu.id"
          @click="toAnchor(menu.anchor,menu.id)">{{menu.title}}</li>
    </ul>
    <div class="content">
      <h2 class="title">龙华系统使用帮助文档</h2>
      <div class="help-item-wrap"
           id="about">
        <h3 class="item-title">关于“龙华”</h3>
        <ul>
          <li>
            <div>龙华部分功能需配合插件使用，所以请确保使用此系统前，已经正确安装插件，关于插件的安装，请阅读下文<span class="link-open"
                    @click="toAnchor('#install',1)">“插件安装方法”</span>
            </div>
          </li>
          <li>
            <div>
              <label>插件的目的：</label>
              <p><span>自动获取想要爬取数据的相关网站的Cookie。</span></p>
            </div>
          </li>
          <li>
            <div>
              <label>Cookie的目的：</label>
              <p><span>从其他相关网站上爬取数据需要用到Cookie</span></p>
            </div>
          </li>
          <li>
            <div>
              <label>关于数据延迟：</label>
              <p><span>因为此系统内的数据爬取功能都是基于写好的爬虫代码和用户输入的特定参数实时的去相关网站上爬取的，所以这一环节是需要一定时间的，也就是说，</span>
                <span class="link-tip">从相关网站上爬取数据，再存入本系统的数据库，这一整个流程并不是瞬时完成的，是需要一定的时间的</span>，所以，当右上角出现“拉取成功”提示后，但是“下载”菜单却没有数据的时候，此时只需等候一段时间，等流程走完后，数据便会存入数据库， <span class="link-tip">注意：有时数据入库后需要手动点击“</span>
                <span class="link-has-icon ">
                  <Icon class="icon"
                        type="icon-refresh-button-20" />
                </span>
                <span class="link-tip">”按钮数据才会在列表里出现</span>
                。
              </p>
            </div>
          </li>
          <li>
            <div>
              <label>关于 “解析” ：</label>
              <p><span>在此系统中，上传的任何文件，都需要经过后端的解析，在确保文件的安全性和文件格式后，才能进入数据库。</span></p>
            </div>
          </li>
          <li>
            <div>
              <label>关于 “分析” ：</label>
              <p><span>此系统有将数据分析后转化成图表的功能，此功能的技术原理也是将数据通过特定的代码计算后，再结合用户设置的参数，将数据转化为用户想要的图表，并呈现给用户。但是从后端拿到文件，到通过特定代码计算，再到前端渲染出图，这整个过程也不是瞬时完成的，也是需要一定的时间的。</span></p>
            </div>
          </li>
        </ul>
      </div>
      <div class="help-item-wrap"
           id="install">
        <h3 class="item-title">插件安装方法<span class="down-extension"
                @click="downLoad">TLSE - Chrome插件下载
            <Icon class="icon"
                  :padding="[0,0,0,5]"
                  type="icon-download-blue-18" />
          </span>
        </h3>
        <ul>
          <li class="link-tip">插件仅限于Chrome浏览器（谷歌浏览器），因此，使用此系统时，请确保自己使用的是Chrome浏览器（谷歌浏览器）</li>
          <li>
            <div>
              <label>安装方法：</label>
              <p>
              <ol>
                <li>1.点击上方下载链接，将插件下载好，无需解压。</li>
                <li>2.打开Chrome浏览器（谷歌浏览器），点击浏览器右上角“
                  <Icon class="icon"
                        type="icon-extender-14" />”按钮，点击“管理扩展程序”，跳转“扩展程序”页面<img class="img-info"
                       @load="imgLoad"
                       src="@/assets/img/help/1.png" />
                </li>
                <li>3.将“扩展程序”页面右上角的“开发者选项”开关开启（滑块在右侧时，为开启状态）。<img class="img-info"
                       @load="imgLoad"
                       src="@/assets/img/help/2.png" /></li>
                <li>4.找到下载好的插件压缩包，将其拖进“扩展程序”页面。<br /><img class="img-info"
                       @load="imgLoad"
                       src="@/assets/img/help/3.png" /></li>
                <li>5.当“扩展程序”页面出现次插件后，请确保是开启状态，然后点击插件右下角的“
                  <Icon class="icon"
                        type="icon-link-refresh-14" />”按钮。<img class="img-info"
                       @load="imgLoad"
                       src="@/assets/img/help/4.png" />
                </li>
                <li>6.安装完成。</li>
              </ol>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="help-item-wrap"
           id="getCookie">
        <h3 class="item-title">Cookie获取</h3>
        <ul>
          <li>在确保Chrome插件已经安装，且开启的前提下，正常登录“
            <!-- <a target="_blabk"
               href="https://sycm.taobao.com">生意参谋</a>
            <Icon class="icon"
                  type="icon-link-14" />”或“ -->
            <a target="_blabk"
               href="https://strategy.tmall.com">策略中心</a>
            <Icon class="icon"
                  type="icon-link-14" />”系统即可，无需任何操作，插件将自动获取你对应店铺账号的 Cookie ，<span class="link-tip">注意：Cookie是与店铺挂钩的，如果想爬取A店铺的数据，则需用A店铺对应的账号登录。</span>
          </li>
          <li>但是 Cookie 是有时效性的，时间久了可能会导致Cookie过期无法使用，将影响此系统部分功能的正常使用，所以<span class="link-tip">尽量在使用此系统前10分钟内登录一次“策略中心”系统</span>，以保证插件能拿到最新的Cookie。</li>
          <li>Cookie的目的：从其他相关网站上爬取数据需要用到Cookie</li>
          <li>如果在使用此系统前“策略中心”已经是登录状态，那么请在“策略中心”内按“F5”刷新一下，插件将重新获取最新的Cookie，以保证你能正常使用此系统。</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>

import tableMixin from '@/mixins/dealTable'
import { isScrollToBottom } from '@/common/utils/funcStore'
export default {
  mixins: [tableMixin],
  data () {
    return {
      initPosition: [],
      menus: [{
        id: 0,
        anchor: '#about',
        title: '关于“龙华”'
      }, {
        id: 1,
        anchor: '#install',
        title: '插件安装方法'
      }, {
        id: 2,
        anchor: '#getCookie',
        title: 'Cookie获取'
      }],
      menuIndex: 0
    }
  },

  mounted () {
    this.$nextTick(() => {
      window.addEventListener('scroll', this.handleScroll)
    })
  },
  methods: {
    imgLoad () {
      this.$debounce(this.getInitPosition)()
    },
    getInitPosition () {
      const items = document.getElementsByClassName('help-item-wrap')
      this.initPosition = []
      items.forEach(element => {
        this.initPosition.push({
          id: `#${element.id}`,
          offsetTop: element.offsetTop
        })
      })
    },
    toAnchor (postion, index) {
      const anchor = this.$el.querySelector(postion)
      window.scrollTo({
        left: 0,
        top: anchor.offsetTop,
        behavior: 'smooth'
      })
      setTimeout(() => {
        this.menuIndex = index
      }, 200)
    },
    handleScroll () {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const filterArr = this.initPosition.filter(item => item.offsetTop <= (scrollTop + 50))
      if (filterArr.length > 0) {
        if (isScrollToBottom()) {
          this.menuIndex = 2
          return
        }
        const target = this.menus.filter(item => item.anchor === filterArr[filterArr.length - 1].id)[0]
        if (target) {
          this.menuIndex = target.id
        }
      } else {
        this.menuIndex = 0
      }
    },
    downLoad () {
      this.$request.file('/extension/chromeExtensionsxfstoken.zip', { responseType: 'arraybuffer' }).then(res => {
        const eleLink = document.createElement('a')
        eleLink.download = 'TLSE'
        eleLink.style.display = 'none'
        const blob = new Blob([res], { type: 'application/zip' })
        eleLink.href = URL.createObjectURL(blob)
        document.body.appendChild(eleLink)
        eleLink.click()
        document.body.removeChild(eleLink)
      })
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll, true)
  }
}
</script>
<style lang="less" scoped>
</style>
