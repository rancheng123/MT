<template>
 <div class="upload-outer">
    <div class="upload-wapper">
        <div class="upload-file" v-show="files.length" ref="uploadFile">
           <div class="upload-file-item" v-for="(item, index) in files" :key="index">
             <img class="file-item-image" :src="item" @click="onTouch(item)">
             <div class="ile-item-close" v-if="display !== 'show'" :index="index" @click="onFileRemove(index)">X</div>
           </div>
        </div>
        <div class="upload-btn" v-if="display !== 'show'">
            <div class="upload-btn-ctn">+添加</div>
            <input  ref="uploadBtn" type="file" @change="onChange" :multiple="multiple" :accept="accept"/>
        </div>
    </div>
    <div class="upload-desc">
      <slot></slot>
    </div>
     <transition name="fade">
        <div class="upload-preview" v-show="uploadView" @click="onViewTouch">
            <img class="upload-preview-img" ref="uploadViewImage" @click="onViewTouch"/>
        </div>
     </transition>
 </div>
</template>

<script>
import upload from './ajax.js'

const displayEnum = {
  ADD: 'add',
  EDIT: 'edit',
  SHOW: 'show'
}

export default {
  name: 'upload',
  props: {
    action: String,
    onBeforeUpload: Function,
    onSuccess: Function,
    onProgress: Function,
    onRemove: Function,
    onError: Function,
    /**
     * 图片默认能上传五张
     */
    limit: {
      type: Number,
      default: () => {
        return 5
      }
    },
    multiple: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    accept: String,
    display: {
      type: String,
      default: () => {
        return displayEnum.ADD
      }
    },
    fileList: {
      type: Array,
      default: () => {
        return []
      }
    },
    fileTypes: {
      type: Array,
      default: () => {
        return ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
      }
    }
  },
  data () {
    return {
      files: [],
      filename: 'file',
      uploadView: false
    }
  },
  methods: {
    onViewTouch () {
      this.uploadView = false
    },
    onTouch (file) {
      this.uploadView = true
      let img = new window.Image()
      let self = this

      img.src = file
      img.onload = r => {
        let width = img.width
        let height = img.height
        /**
         * 预览图片等比例缩放为1/5
         */
        let $uploadViewImage = self.$refs.uploadViewImage
        $uploadViewImage.width = (width / 4)
        $uploadViewImage.height = (height / 4)
        $uploadViewImage.setAttribute('src', file)
      }
    },
    /**
     * 图片上传之前
     */
    beforeUpload (file, uploadFileLength) {
      let fileType = file.type
      let fileSize = file.size
      let errorMsg = ''

      if (this.display) {
        let key = this.display.toUpperCase()
        if (!displayEnum[key]) {
          errorMsg = `上传组件图片显示类型错误，display=${this.display}`
        }
      }

      if (this.fileTypes.indexOf(fileType) === -1) {
        errorMsg = '不支持该类型文件的上传'
      } else if (fileSize > (1024 * 1024)) {
        errorMsg = '上传的文件超过10M,请重新上传'
      } else if (this.limit && this.files.length + uploadFileLength > this.limit) {
        errorMsg = `最多只能上传${this.limit}张图片`
      }

      if (errorMsg) {
        if (typeof this.onBeforeUpload === 'function') {
          this.onBeforeUpload(errorMsg)
        } else {
          console.error(errorMsg)
        }
        return false
      }

      return true
    },
    /**
     * 图片删除回调
     */
    onFileRemove (index) {
      let fileLength = this.files.length
      if (index > -1 && index < fileLength) {
        let removeFile = this.files[index]
        this.files.splice(index, 1)
        this.onRemove && this.onRemove(removeFile, this.files)
      }
    },
    /**
     * 选择并上传图片
     */
    onChange (e) {
      let target = e.target || e.srcElement
      let self = this

      if (target && target.files) {
        let file = target.files[0]
        if (this.beforeUpload(file, target.files.length)) {
          let reader = new window.FileReader()

          reader.readAsDataURL(file)
          reader.onload = function (e) {
            self.files.push(this.result)
            upload({
              file: file,
              filename: self.filename,
              action: self.action,
              withCredentials: true,
              onProgress: result => {
                self.onProgress && self.onProgress(result)
              },
              onSuccess: result => {
                self.onSuccess && self.onSuccess(result)
              },
              onError: (action, option, xhr) => {
                /**
                 * 上传失败，删除最后一项
                 */
                self.files.pop()
                self.onError && self.onError(action, option, xhr)
              }
            })
          }
        }
      }

      this.$refs.uploadBtn.value = null
    }
  },
  mounted () {
    if (this.fileList.length) {
      this.files = Array.prototype.concat(this.files, this.fileList)
    }
  }
}
</script>

<style scoped lang="less">
  @eleMargin: 5px 5px 0 0;
  @wrapperWidth: 1.4rem;
  @wrapperHeigth: 1.448rem;
  .upload-outer {
     padding: 0 10px;
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to{
      opacity: 0;
    }
    .upload-preview {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      .upload-preview-img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%)
      }
    }
    .upload-wapper {
      position: relative;
      overflow: hidden;
      & > div {
        float: left;
      }
      .upload-file-item {
        width: @wrapperWidth;
        height: @wrapperHeigth;
        margin: @eleMargin;
        float: left;
        position: relative;
        background: #ffff;
        .file-item-image {
          width: 100%;
          height: 100%;
        }
        .ile-item-close {
          position: absolute;
          top: -5px;
          right: -5px;
          width: .32rem;
          height: .32rem;
          font-size: .1rem;
          background: rgba(0,0,0,0.50);
          border-radius: .32rem;
          color: #fff;
        }
      }
      .upload-btn {
        width: @wrapperWidth;
        height: @wrapperHeigth;
        border: 1px #efefef solid;
        margin: @eleMargin;
        position: relative;
        background: #FAFAFA;
        border: 1px solid #EEEEEE;
        border-radius: 5px;
        .upload-btn-ctn {
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          border: 0;
          font-family: PingFangSC-Regular;
          font-size: .28rem;
          color: #3DC6B6;
          text-align: center;
          line-height: @wrapperHeigth
        }
        & > input {
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          border: 0;
          opacity: 0;
        }
      }
    }
  }
</style>