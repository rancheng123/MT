<template>
<div>
  <el-upload
    class="upload-demo"
    :action="action"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="list"
    :disabled="noEdit"
    :on-success="handleSuccess"
    :before-upload="handleBeforeUpload"
    list-type="picture">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg/gif文件，且不超过10M</div>
  </el-upload>
  <div class="image-preview"></div>
</div>
</template>
<script>
export default {
  props: ['action', 'type', 'list', 'photoLimit', 'noEdit'],
  data () {
    return {
      fileList: this.list
    }
  },
  methods: {
    handlePreview () {},
    handleRemove (file) {
      let self = this
      if (file) {
        this.$emit('onPhotosRemove', {
          type: self.type,
          url: file.url,
          status: file.status,
          uid: file.uid
        })
      } else {
        this.$notify.error({
          title: '错误',
          message: '删除图片失败～'
        })
      }
    },
    handleBeforeUpload (file) {
      if (this.list && this.list.length >= +this.photoLimit) {
        this.$notify.error({
          title: '错误',
          message: `只能上传${this.photoLimit}张图片，上传前先删除已有图片`
        })
        return false
      }

      if (file) {
        let fileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
        let fileType = file.type
        let fileSize = file.size
        let errorMsg = ''

        if (fileTypes.indexOf(fileType) === -1) {
          errorMsg = '不支持该类型文件的上传'
        }

        if (fileSize > (1024 * 10 * 10 * 10)) {
          errorMsg = '上传的文件超过10M,请重新上传'
        }

        if (errorMsg) {
          this.$notify.error({
            title: '错误',
            message: errorMsg
          })

          return false
        }
      } else {
        this.$notify.error({
          title: '错误',
          message: '请选择需要上传的图片'
        })
      }
    },
    handleSuccess (res, file) {
      let self = this
      if (res && res.status === 200) {
        this.$emit('onUploadSuccess', {
          type: self.type,
          serverPath: res.data,
          sourceUrl: file.url
        })
      } else {
        this.$notify.error({
          title: '错误',
          message: '图片上传失败～'
        })
        return false
      }
    }
  },
  watch: {
    list () {
      if (this.list && Array.isArray(this.list) && this.list.length > 0) {
        this.$nextTick(() => {
          let imgElements = document.querySelectorAll('.el-upload-list img')
          imgElements.forEach(item => {
            item.addEventListener('mousedown', (e) => {
              let imgSrc = item.getAttribute('src')
              window.open(imgSrc)
            })
          })
        })
      }
    }
  },
  mounted () {
  }
}
</script>

<style>
.el-upload-list img {
  cursor: pointer;
}
</style>

