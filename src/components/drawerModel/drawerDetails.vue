<template>
  <div class="details-drawer-wrap"
       :class="{'flex-item-center flex-justify-center':nodata}">
    <div v-if="!nodata">
      <div class="details-item no-padding"
           v-if="detailInfo.duringActivityList&&detailInfo.duringActivityList.length>0">
        <h4>{{dataTimeRange[0]}} ~ {{dataTimeRange[1]}} 活动</h4>
        <ul v-for="(item,index) in detailInfo.duringActivityList"
            :key="index">
          <li class="flex"><label>隶属活动：</label><span>{{item.activityName}}</span></li>
          <li class="flex level-status">
            <label>活动等级：</label><span>{{item.levelName}}</span>
            <label>活动状态：</label>
            <span class="activity-status orange"
                  v-if="item.activityStatus===3">未开始</span>
            <span class="activity-status green"
                  v-if="item.activityStatus===2">进行中</span>
            <span class="activity-status gray"
                  v-if="item.activityStatus===1">已结束</span>
          </li>
          <li class="flex"><label>活动时间：</label><span>{{item.start}} ~ {{item.end}}</span></li>
          <li class="flex"><label>活动玩法：</label><span>{{item.rules}}</span></li>
        </ul>
      </div>
      <div class="details-item border-top"
           v-if="(detailInfo.laterActivityList&&detailInfo.laterActivityList.length>0)||(detailInfo.beforeActivityList&&detailInfo.beforeActivityList.length>0)">
        <h4>所有活动</h4>
        <div v-if="detailInfo.laterActivityList&&detailInfo.laterActivityList.length>0">
          <ul v-for="(item,index) in detailInfo.laterActivityList"
              :key="index">
            <li class="flex"><label>隶属活动：</label><span>{{item.activityName}}</span></li>
            <li class="flex level-status">
              <label>活动等级：</label><span>{{item.levelName}}</span>
              <label>活动状态：</label>
              <span class="activity-status orange"
                    v-if="item.activityStatus===3">未开始</span>
              <span class="activity-status green"
                    v-if="item.activityStatus===2">进行中</span>
              <span class="activity-status gray"
                    v-if="item.activityStatus===1">已结束</span>
            </li>
            <li class="flex"><label>活动时间：</label><span>{{item.start}} ~ {{item.end}}</span></li>
            <li class="flex"><label>活动玩法：</label><span>{{item.rules}}</span></li>
          </ul>
        </div>
        <div class="ul-last"
             v-if="detailInfo.beforeActivityList&&detailInfo.beforeActivityList.length>0">
          <ul v-for="(item,index) in detailInfo.beforeActivityList"
              :key="index">
            <li class="flex"><label>隶属活动：</label><span>{{item.activityName}}</span></li>
            <li class="flex level-status">
              <label>活动等级：</label><span>{{item.levelName}}</span>
              <label>活动状态：</label>
              <span class="activity-status orange"
                    v-if="item.activityStatus===3">未开始</span>
              <span class="activity-status green"
                    v-if="item.activityStatus===2">进行中</span>
              <span class="activity-status gray"
                    v-if="item.activityStatus===1">已结束</span>
            </li>
            <li class="flex"><label>活动时间：</label><span>{{item.start}} ~ {{item.end}}</span></li>
            <li class="flex"><label>活动玩法：</label><span>{{item.rules}}</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else
         class="no-data flex-item-center flex-justify-center">
      <aside>
        <img src="@/assets//img/base/nodata.png">
        <p>暂无数据</p>
      </aside>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    dataId: {
      type: [String, Number],
      required: true
    },
    dataType: {
      type: [String, Number],
      required: true
    },
    dataTimeRange: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data () {
    return {
      detailInfo: {}
    }
  },
  computed: {
    nodata () {
      return (this.detailInfo.duringActivityList && this.detailInfo.duringActivityList.length <= 0) && (this.detailInfo.laterActivityList && this.detailInfo.laterActivityList.length <= 0) && (this.detailInfo.beforeActivityList && this.detailInfo.beforeActivityList.length <= 0)
    }
  },
  created () {
    if (this.dataId) {
      this.getDetailInfo()
    }
  },
  methods: {
    getDetailInfo () {
      const url = this.dataType === '1' ? '/shopexpress/shoppromotion' : '/linkexpress/linkpromotion'
      const queryForm = this.dataType === '1'
        ? {
          shopId: this.dataId,
          start: this.dataTimeRange[0] || '',
          end: this.dataTimeRange[1] || ''
        }
        : {
          linkId: this.dataId,
          start: this.dataTimeRange[0] || '',
          end: this.dataTimeRange[1] || ''
        }
      this.$request.post(url, queryForm).then(res => {
        if (res) {
          this.detailInfo = {
            ...res.data
          }
        }
      })
    }
  }
}
</script>
