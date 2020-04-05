<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="网站名称">
          <el-input v-model="form.websiteName" placeholder="请输入网站名称" />
        </el-form-item>
        <el-form-item label="关键字">
          <el-input v-model="form.keywords" />
        </el-form-item>
        <el-form-item label="备案号">
          <el-input v-model="form.recordNumber" />
        </el-form-item>
        <el-form-item label="客服qq">
          <el-input v-model="form.customer_qq" />
        </el-form-item>
        <el-form-item label="客服号码">
          <el-input v-model="form.customer_telephone" />
        </el-form-item>
        <el-form-item label="网站logo">
          <el-upload
            class="upload-demo"
            action="upload"
            :before-upload="beforeCoverImgUpload"
            :http-request="uploadCoverImg"
            :show-file-list="false"
            accept=".jpg,.jpeg,.png"
          >
            <el-button size="small" type="primary">点击上传<i class="el-icon-upload el-icon--right" /></el-button>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-search"
              @click.stop="dialogshowVisible = true"
            >查看logo</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="修改时间">
          <el-date-picker v-model="displayTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择时间" />
        </el-form-item>
        <el-form-item label="网站描述">
          <el-input v-model="form.description" type="textarea" :autosize="{ minRows: 10, maxRows: 30}" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确 认</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog width="40%" title="查看logo" :visible.sync="dialogshowVisible" append-to-body>
      <img :src="form.oldlogo" width="100%">
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      dialogshowVisible: false
    }
  },
  computed: {
    displayTime: {
      get() {
        return (+new Date(this.form.setTime))
      },
      set(val) {
        this.form.setTime = new Date(val)
      }
    }
  },
  created() {
    this.getsettingInfo()
  },
  methods: {
    getsettingInfo() {
      this.$request.settingInfo({}).then((res) => {
        this.form = res.data
        this.form.oldlogo = res.data.logo
      })
    },
    beforeCoverImgUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传网站logo大小不能超过 2MB!')
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
            that.form.logo = res.file.imgUrl
            that.$notify({
              title: '成功',
              message: '上传网站logo成功',
              type: 'success'
            })
          } else {
            that.$notify.error({
              title: '错误',
              message: '上传网站logo失败'
            })
          }
        })
    },
    onSubmit() {
      this.$request.editSetting({ ...this.form }, true, {
        headers: {
          'Content-Type': 'multipart/form-data;charset=UTF-8'
        }
      }).then((res) => {
        if (res.result.nModified > 0) {
          this.getsettingInfo()
          this.$notify({
            title: '成功',
            message: '编辑网站设置成功',
            type: 'success'
          })
        } else if (res.result.nModified === 0) {
          this.$notify({
            title: '警告',
            message: '你好像没进行修改数据的操作,淘气~',
            type: 'warning'
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '编辑网站设置失败'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .app-container{
    background: #ffffff;
  }
</style>
