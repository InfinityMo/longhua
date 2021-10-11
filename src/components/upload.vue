<template>
  <div>
    <el-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
               class="custom-upload"
               accept=".jpg,.png,.jpeg"
               :before-upload="beforeUpload"
               :on-success="uploadSuccess"
               :on-error="uploadError"
               :limit="5"
               :file-list="fileList"
               list-type="picture-card">
      <div class="upload-icon-wrap"
           v-if="fileList.length<5">
        <i class="upload-icon"></i>
        <p>点击上传</p>
      </div>
      <div slot="file"
           slot-scope="{file}">
        <img class="el-upload-list__item-thumbnail"
             :src="file.url"
             alt="">
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview"
                @click="picPreview(file)">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span class="el-upload-list__item-delete"
                @click="remove(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%"
           :src="dialogImageUrl"
           alt="">
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    fileArr: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data () {
    return {
      firleType: ['jpg', 'jpeg', 'png'],
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
    }
  },
  watch: {
    fileList () {

    }
  },
  methods: {
    beforeUpload (file) {
      const { type } = file
      if (!this.firleType.includes(type.split('/')[1])) {
        this.$message.warning('文件格式不正确')
        return false
      }
      const fileSize = file.size / 1024 / 1024
      if (fileSize > 20) {
        this.$message.warning('文件上传过大')
        return false
      }
    },
    uploadError (errorRes, file, fileList) {
      this.$message.error('文件上传失败')
    },
    uploadSuccess (response, file, fileList) {
      this.fileList.push({
        name: file.name,
        url: response.url,
        size: file.size,
        uid: file.uid
      })
      this.$emit('uploadAdd', this.fileList)
    },
    remove (file) {
      const removeIndex = this.fileList.findIndex((item, index) => {
        return item.uid === file.uid
      })
      this.fileList.splice(removeIndex, 1)
      this.$emit('uploadRemove', this.fileList)
    },
    picPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="less" scoped>
.custom-upload {
  display: flex;
  align-content: center;
  height: 67px;
}
/deep/.el-upload-list__item {
  width: 100px;
  height: 69px;
  border-radius: 2px;
  border-color: #b3b3b3;
  div {
    width: 100%;
    height: 100%;
  }
}
/deep/.el-upload-list__item:focus {
  border-color: #b3b3b3;
}
/deep/.el-upload--picture-card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 69px;
}
.upload-icon-wrap {
  text-align: center;
  .upload-icon {
    display: block;
    margin: 0 auto;
    width: 25px;
    height: 25px;
    background: url("../assets/img/icons/upload.png") center center no-repeat;
  }
  p {
    margin-top: 6px;
    color: #333;
    line-height: 1;
    font-size: 12px;
  }
}
/deep/.el-upload--picture-card {
  border-radius: 2px;
}
</style>
