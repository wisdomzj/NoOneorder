<template>
  <div class="app-container">
    <el-button v-if="checkPermission(['admin'])" type="primary" @click="dialogaddVisible = true">添加分类</el-button>
    <el-table
      border
      width="100%"
      :data="tableData"
      style="width: 100%;margin-top:30px;"
    >
      <el-table-column
        label="分类名称"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="关键字"
        align="center"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.keywords"
            type="textarea"
            :rows="2"
            placeholder="暂无关键字"
            :disabled="true"
          />
        </template>
      </el-table-column> -->
      <el-table-column
        label="添加时间"
        align="center"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.addtime | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="审核状态"
        align="center"
      >
        <template slot-scope="scope">
          <img
            v-if="scope.row.status === 1"
            src="../../assets/yes.gif"
            style="cursor: pointer;"
          >
          <img
            v-else
            src="../../assets/no.gif"
            style="cursor: pointer;"
          >
        </template>
      </el-table-column>
      <el-table-column v-if="checkPermission(['admin'])" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加分类" :visible.sync="dialogaddVisible">
      <el-form ref="form" :model="addcateInfo" label-width="120px">
        <el-form-item label="分类名">
          <el-input v-model="addcateInfo.title" placeholder="请输入分类名称 " clearable />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="addcateInfo.description" placeholder="请输入分类描述" clearable />
        </el-form-item>
        <el-form-item label="关键字">
          <el-input v-model="addcateInfo.keywords" placeholder="请输入分类关键字" clearable />
        </el-form-item>
        <el-form-item label="添加时间">
          <el-date-picker v-model="displayTime1" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择时间" />
        </el-form-item>
        <el-form-item label="审核状态">
          <el-radio-group v-model="addcateInfo.review">
            <el-radio label="审核" border />
            <el-radio label="未审核" border />
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogaddVisible = false">取 消</el-button>
        <el-button type="primary" @click="doAdd">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑分类" :visible.sync="dialogeditVisible">
      <el-form ref="form" :model="editcateInfo" label-width="120px">
        <el-form-item label="分类名">
          <el-input v-model="editcateInfo.title" placeholder="请输入分类名称 " clearable />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="editcateInfo.description" placeholder="请输入分类描述" clearable />
        </el-form-item>
        <el-form-item label="关键字">
          <el-input v-model="editcateInfo.keywords" placeholder="请输入分类关键字" clearable />
        </el-form-item>
        <el-form-item label="添加时间">
          <el-date-picker v-model="displayTime2" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择时间" />
        </el-form-item>
        <el-form-item label="审核状态">
          <el-radio-group v-model="editcateInfo.review">
            <el-radio label="审核" border />
            <el-radio label="未审核" border />
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogeditVisible = false">取 消</el-button>
        <el-button type="primary" @click="doEdit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogdelVisible" width="30%">
      <span>确定删除该分类吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogdelVisible = false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
export default {
  data() {
    return {
      tableData: [],
      cateId: '',
      dialogaddVisible: false,
      dialogdelVisible: false,
      dialogeditVisible: false,
      addcateInfo: {
        title: '',
        description: '',
        keywords: '',
        addtime: '',
        review: ''
      },
      editcateInfo: {
        _id: '',
        title: '',
        description: '',
        keywords: '',
        addtime: '',
        review: ''
      }
    }
  },
  computed: {
    displayTime1: {
      get() {
        return (+new Date(this.addcateInfo.addtime))
      },
      set(val) {
        this.addcateInfo.addtime = new Date(val)
      }
    },
    displayTime2: {
      get() {
        return (+new Date(this.editcateInfo.addtime))
      },
      set(val) {
        this.editcateInfo.addtime = new Date(val)
      }
    }
  },
  created() {
    this.getcateList()
  },
  methods: {
    checkPermission,
    getcateList() {
      this.loading = true
      this.$request.cateFindAll({}).then((res) => {
        const { list } = res.data
        this.tableData = list
        this.loading = false
      })
    },
    handleEdit(index, row) {
      this.$request.showcate({ id: row._id }).then((res) => {
        const { _id, title, status, description, keywords, addtime } = res.result
        this.editcateInfo.title = title
        this.editcateInfo._id = _id
        this.editcateInfo.review = (status === 1) ? '审核' : '未审核'
        this.editcateInfo.description = description
        this.editcateInfo.keywords = keywords
        this.editcateInfo.addtime = addtime
        this.dialogeditVisible = true
      })
    },
    handleDelete(index, row) {
      this.cateId = row._id
      this.dialogdelVisible = true
    },
    doDel() {
      this.$request.delcate({ id: this.cateId }).then((res) => {
        if (res.result.deletedCount > 0) {
          this.tableData = []
          this.getcateList()
          this.dialogdelVisible = false
          this.$notify({
            title: '成功',
            message: '删除分类成功',
            type: 'success'
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '删除分类失败'
          })
        }
      })
    },
    doAdd() {
      if (!this.addcateInfo.title || !this.addcateInfo.description || !this.addcateInfo.addtime || !this.addcateInfo.review) {
        this.$message.info('标题 | 描述 | 发布时间 | 审核状态 是必填项')
        return
      }
      this.$request.addcate({ ...this.addcateInfo }).then((res) => {
        if (res.result) {
          this.dialogaddVisible = false
          this.tableData = []
          this.getcateList()
          this.$notify({
            title: '成功',
            message: '添加分类成功',
            type: 'success'
          })
          this.addcateInfo.title = ''
          this.addcateInfo.description = ''
          this.addcateInfo.keywords = ''
          this.addcateInfo.addtime = ''
          this.addcateInfo.review = ''
        } else {
          this.$notify.error({
            title: '错误',
            message: '添加分类失败'
          })
        }
      })
    },
    doEdit() {
      this.$request.editcate({ ...this.editcateInfo }).then((res) => {
        if (res.result.nModified > 0) {
          this.tableData = []
          this.getcateList()
          this.dialogeditVisible = false
          this.$notify({
            title: '成功',
            message: '编辑分类成功',
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
            message: '编辑分类失败'
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
