<template>
  <div>
    <el-upload :class="className"
               :accept="fileType.join()"
               action=""
               :before-upload="beforeUpload"
               :file-list="fileArray"
               :show-file-list="false">
      <Icon v-if="icon"
            :type="icon"
            :padding="[0,5,0,0]" />
      <span>{{btnName}}</span>
    </el-upload>
  </div>
</template>
<script>
export default {
  props: {
    className: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    btnName: {
      type: String,
      default: '点击上传'
    },
    fileList: {
      type: Array,
      default: () => []
    },
    fileType: {
      type: Array,
      default: () => []
    },
    fileSize: {
      type: String,
      default: '5'
    }
  },
  data () {
    return {
      fileArray: JSON.parse(JSON.stringify(this.$props.fileList))
    }
  },
  methods: {
    beforeUpload (file) {
      const { name } = file
      if (!this.fileType.includes(`.${name.split('.')[name.split.length - 1]}`)) {
        this.$message.warning('文件格式不正确，请检查文件')
        return false
      }
      const fileSize = file.size / 1024 / 1024
      if (fileSize > this.fileSize) {
        this.$message.warning('文件上传过大,请检查文件')
        return false
      }
      this.fileArray = [...this.fileArray, file]
      // this.uploadHandel()
      this.$emit('uploadHandel', this.fileArray)
    }
  }
}
</script>
