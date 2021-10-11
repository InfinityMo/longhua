import Vue from 'vue'
import standardTable from '@/common/components/standardTable/standardTable'
import Icon from '@/common/components/icon'
import dialog from '@/components/dialog'
import drawer from '@/components/drawer'
import Table from '@/common/components/table/standardTable'
// import drawerEdit from '@/components/drawerMode/drawerEdit'
// import drawerView from '@/components/drawerMode/drawerView'

Vue.component('standard-table', standardTable)
Vue.component('Table', Table)
Vue.component('Dialog', dialog)
Vue.component('Icon', Icon)
Vue.component('Drawer', drawer)
// Vue.component('drawer-edit', drawerEdit)
// Vue.component('drawer-view', drawerView)
