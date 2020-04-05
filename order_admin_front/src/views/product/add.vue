<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px">
      <el-tabs type="border-card" style="margin-top:15px;">
        <el-tab-pane label="基本设置">
          <el-form-item label="菜品名称">
            <el-input v-model="form.title" placeholder="请输入菜品名称" clearable />
          </el-form-item>
          <el-form-item label="所属分类">
            <el-select v-model="form.c_id" placeholder="请选择菜品分类">
              <el-option
                v-for="(item,index) in catesData"
                :key="index"
                :label="item.title"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="菜品价格">
            <el-input-number v-model="form.price" :precision="2" controls-position="right" :min="0" :max="100" :step="0.5" />
          </el-form-item>
          <el-form-item label="添加时间">
            <el-date-picker
              v-model="displayTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择时间"
            />
          </el-form-item>
          <el-form-item label="封面图">
            <el-upload
              class="upload-demo"
              action="upload"
              :before-upload="beforeCoverImgUpload"
              :http-request="uploadCoverImg"
              :show-file-list="false"
              accept=".jpg,.jpeg,.png"
            >
              <el-button size="small" type="primary">
                点击上传
                <i class="el-icon-upload el-icon--right" />
              </el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="加入推荐">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="精品" border size="medium" name="type" />
              <el-checkbox label="热品" border size="medium" name="type" />
              <el-checkbox label="新品" border size="medium" name="type" />
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="审核状态">
            <el-radio-group v-model="form.review">
              <el-radio label="审核" border size="medium" />
              <el-radio label="未审核" border size="medium" />
            </el-radio-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="内容设置">
          <el-upload
            class="avatar-uploader"
            action="upload"
            multiple
            :before-upload="beforeCoverImgUpload"
            :http-request="uploadEditorImg"
            :show-file-list="false"
            accept=".jpg,.jpeg,.png"
          />
          <quill-editor
            ref="myQuillEditor"
            v-model="form.content"
            :options="editorOption"
          />
        </el-tab-pane>
        <el-tab-pane label="其他设置">
          <el-form-item label="商品编码">
            <el-input v-model="form.product_bar_code" placeholder="请输入菜品编码" clearable />
          </el-form-item>
          <el-form-item label="菜品描述" prop="desc">
            <el-input
              v-model="form.description"
              type="textarea"
              :autosize="{ minRows: 10, maxRows: 30}"
              placeholder="请输入菜品描述"
            />
          </el-form-item>
        </el-tab-pane>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-tabs>
    </el-form>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
export default {
  data() {
    return {
      catesData: [],
      form: {
        c_id: '',
        title: '',
        price: '',
        product_bar_code: '',
        type: [],
        review: '',
        description: '',
        content: '',
        addtime: undefined,
        img_url: ''
      },
      editorOption: {
        theme: 'snow',
        placeholder: '请输入',
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
              ['blockquote', 'code-block'], // 引用  代码块
              [{ 'size': ['small', false, 'large', 'huge'] }], // 文字大小
              [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
              [{ script: 'sub' }, { script: 'super' }], // 上标/下标
              [{ indent: '-1' }, { indent: '+1' }], // 缩进
              [{ 'direction': 'rtl' }], // 文本方向
              [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
              [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
              [{ font: [] }], // 字体种类
              [{ align: [] }], // 对齐方式
              ['clean'], // 清除文本格式
              ['image'] // 图片
            ],
            // container: "#toolbar",
            handlers: {
              image(value) {
                if (value) {
                  // 调用element图片上传
                  document.querySelector('.avatar-uploader input').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      },
      dialoguploadVisible: false
    }
  },
  computed: {
    displayTime: {
      get() {
        return +new Date(this.form.addtime)
      },
      set(val) {
        this.form.addtime = new Date(val)
      }
    }
  },
  created() {
    this.getCatesInfo()
  },
  methods: {
    getCatesInfo() {
      this.$request.cateFindAll({}).then(res => {
        const { list } = res.data
        this.catesData = list
      })
    },
    change(val) {
      this.form.content = val
    },
    beforeCoverImgUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    uploadCoverImg(params) {
      const that = this
      that.$request
        .uploadFile({ file: params.file }, true, {
          headers: {
            'Content-Type': 'multipart/form-data;charset=UTF-8'
          }
        })
        .then(res => {
          if (res.msg === 'success') {
            that.form.img_url = res.file.imgUrl
            that.$notify({
              title: '成功',
              message: '上传封面图成功',
              type: 'success'
            })
          } else {
            that.$notify.error({
              title: '错误',
              message: '上传封面图失败'
            })
          }
        })
    },
    uploadEditorImg(params) {
      const that = this
      that.$request
        .uploadFile({ file: params.file }, true, {
          headers: {
            'Content-Type': 'multipart/form-data;charset=UTF-8'
          }
        })
        .then(res => {
          // 获取富文本组件实例
          const quill = that.$refs.myQuillEditor.quill
          if (res.msg === 'success') {
            // 获取光标所在位置
            const length = quill.getSelection().index
            // 插入图片，res为服务器返回的图片链接地址
            quill.insertEmbed(length, 'image', res.file.imgUrl)
            that.$notify({
              title: '成功',
              message: '插入图片成功',
              type: 'success'
            })
          } else {
            that.$notify.error({
              title: '错误',
              message: '插入图片失败'
            })
          }
        })
    },
    onSubmit() {
      if (!this.form.c_id || !this.form.title || !this.form.addtime || !this.form.price) {
        this.$message.info('名称 | 分类 | 价格 | 添加时间 是必填项')
        return
      }
      if (!this.form.img_url) {
        this.$message.info('上传一张封面图吧')
        return
      }
      this.$request.addProduct({ ...this.form }).then(res => {
        if (res.result) {
          MessageBox.confirm(
            '您以添加成功，可以取消停留在此页面上，或者前往菜品列表查看',
            '添加成功',
            {
              confirmButtonText: '前往列表页',
              cancelButtonText: '取消',
              type: 'success'
            }
          ).then(() => {
            this.$router.push({ path: '/product/list' })
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '添加菜品失败'
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
.app-container {
  background: #ffffff;
}
.quill-editor {
line-height: normal !important;
margin-bottom: 20px;
}
.quill-editor .ql-container {
  height: 350px;
}
.ql-snow .ql-tooltip[data-mode=link]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: '保存';
    padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode=video]::before {
    content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: '14px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
  content: '10px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
  content: '18px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
  content: '32px';
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: '文本';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: '标题1';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: '标题2';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: '标题3';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: '标题4';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: '标题5';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: '标题6';
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: '标准字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
  content: '衬线字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
  content: '等宽字体';
}
</style>
