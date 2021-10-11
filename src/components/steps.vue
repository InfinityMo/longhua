<template>
  <div>
    <ul class="flex-item-center flex-justify-center step-wrap">
      <li v-for="(step,index) in stepsArr"
          :key="index"
          class="flex-item-center"
          :class="{'flex-basis':index!==stepsArr.length-1,'is-flex':index===stepsArr.length-1}">
        <div class="flex-item-center title">
          <span v-if="step.status==='normal'">{{index+1}}</span>
          <span class="item-active"
                v-else-if="step.status==='active'">{{index+1}}</span>
          <span v-else-if="step.status==='success'"
                class="item-success"></span>
          <label>{{step.value}}</label>
        </div>
        <div class="line"
             :class="{'line-active':active>index}"
             v-if="index!==stepsArr.length-1">
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    stepsData: {
      type: Array,
      required: true,
      default: () => []
    },
    active: {
      type: Number,
      required: true,
      default: 0
    }
  },
  computed: {
    stepsArr () {
      const steps = []
      this.stepsData.map((item, index) => {
        // steps.push({
        //   value: item,
        //   status: this.active === this.stepsData.length - 1 ? true : this.active > index
        // })
        switch (this.active) {
          case 0:
            steps.push({
              value: item,
              status: index === this.active ? 'active' : 'normal'
            })
            break
          case 1:
            if (index === 0) {
              steps.push({
                value: item,
                status: 'success'
              })
            } else if (index === 1) {
              steps.push({
                value: item,
                status: 'active'
              })
            } else {
              steps.push({
                value: item,
                status: 'normal'
              })
            }

            break
          case 2:
            steps.push({
              value: item,
              status: 'success'
            })
            break
        }
      })
      return steps
    }
  }
}
</script>
<style lang="less" scoped>
.step-wrap {
  .flex-basis {
    flex-basis: 50%;
  }
  li {
    position: relative;
    color: #aaa;
    .title {
      position: absolute;
      left: 0;
      top: -16px;
      padding: 0 20px;
      background-color: #fff;
      span {
        width: 32px;
        height: 32px;
        margin-right: 10px;
        font-size: 16px;
        text-align: center;
        line-height: 32px;
        border-radius: 50%;
        border: 1px solid #aaa;
        box-sizing: border-box;
      }
      .item-active {
        color: #fff;
        border: 1px solid #2bb8bd;
        background-color: #2bb8bd;
      }
      .item-success {
        border: 1px solid #2bb8bd;
        background: url("~@/assets/img/icons/step-success.png") center center
          no-repeat;
      }
      label {
        font-size: 18px;
      }
    }
    .title:last-child {
      position: relative;
      top: 0;
    }
    // .text-active {
    //   span {
    //     color: #fff;
    //     border: 1px solid #2bb8bd;
    //   }
    //   label {
    //     color: #333;
    //   }
    // }

    .line {
      width: 100%;
      height: 1px;
      border-bottom-color: #f0f0f0;
      border-bottom: 1px solid;
      box-sizing: border-box;
    }
    .line-active {
      border-bottom-color: #2bb8bd;
    }
  }
  li:first-child {
    .title {
      span {
        color: #fff;
        border: 1px solid #2bb8bd;
        background-color: #2bb8bd;
      }
    }
  }
  .is-flex {
    flex-basis: auto !important;
    flex-shrink: 0;
    flex-grow: 0;
  }
}
</style>
