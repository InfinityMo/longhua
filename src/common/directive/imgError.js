import Vue from 'vue'
import nopicture from '@/assets/img/base/nopicture.png'
Vue.directive('imgError', {
  inserted (el) {
    el.onerror = function () {
      el.src = nopicture
    }
  }
})
