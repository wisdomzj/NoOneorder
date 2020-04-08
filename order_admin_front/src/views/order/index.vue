<template>
  <div class="app-container">
    <el-table
      border
      width="100%"
      :data="tableData"
      style="width: 100%;margin-top:30px;"
    >
      <el-table-column
        label="桌号"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.desk_id }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="人数"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.number }}人</span>
        </template>
      </el-table-column>
      <el-table-column
        label="备注"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.mark }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="菜品总数量"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.total_num }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="总价格"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.total_price }}元</span>
        </template>
      </el-table-column>
      <el-table-column
        label="下单时间"
        align="center"
        width="200px"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.addtime | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="确认订单"
        align="center"
      >
        <template slot-scope="scope">
          <img
            v-if="scope.row.order_status === 1"
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
      <el-table-column
        label="是否支付"
        align="center"
      >
        <template slot-scope="scope">
          <img
            v-if="scope.row.pay_status === 1"
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
      <el-table-column v-if="checkPermission(['admin'])" label="操作" align="center" width="250px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            @click="handleShow(scope.$index, scope.row)"
          >查看详情</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="pagination.total>0"
      :total="pagination.total"
      :page.sync="pagination.page"
      :limit.sync="pagination.limit"
      @pagination="getorderList"
    />
    <el-dialog title="编辑订单" :visible.sync="dialogeditVisible">
      <el-form ref="form" :model="editorderInfo" label-width="120px">
        <el-form-item label="桌号">
          <el-input v-model="editorderInfo.desk_id" />
        </el-form-item>
        <el-form-item label="人数">
          <el-input v-model="editorderInfo.number" placeholder="请输入人数" clearable />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="editorderInfo.mark" placeholder="请输入备注" clearable />
        </el-form-item>
        <el-form-item label="下单时间">
          <el-date-picker v-model="displayTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择时间" />
        </el-form-item>
        <el-form-item label="审核状态">
          <el-radio-group v-model="editorderInfo.review">
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
import Pagination from '@/components/Pagination'
import checkPermission from '@/utils/permission'
export default {
  components: { Pagination },
  data() {
    return {
      tableData: [],
      orderId: '',
      dialogdelVisible: false,
      dialogeditVisible: false,
      editorderInfo: {
        _id: '',
        desk_id: '',
        number: '',
        note: '',
        addtime: '',
        review: ''
      },
      pagination: {
        total: 0,
        page: 1,
        limit: 5
      }
    }
  },
  computed: {
    displayTime: {
      get() {
        return (+new Date(this.editorderInfo.addtime))
      },
      set(val) {
        this.editorderInfo.addtime = new Date(val)
      }
    }
  },
  created() {
    this.getorderList()
  },
  methods: {
    checkPermission,
    getorderList() {
      this.loading = true
      this.$request.orderFindAll({
        page: this.pagination.page,
        size: this.pagination.limit
      }).then((res) => {
        console.log(res)
        const { list, total } = res.data
        this.tableData = list
        this.pagination.total = total
        this.loading = false
      })
    },
    handleEdit(index, row) {
      this.$request.showorder({ id: row._id }).then((res) => {
        const { _id, desk_id, number, note, addtime, status } = res.result
        this.editorderInfo.desk_id = desk_id
        this.editorderInfo._id = _id
        this.editorderInfo.review = (status === 1) ? '审核' : '未审核'
        this.editorderInfo.number = number
        this.editorderInfo.note = note
        this.editorderInfo.addtime = addtime
        this.dialogeditVisible = true
      })
    },
    handleShow(index, row) {
      console.log(row)
      // this.$request.showDetail({  }).then((res) => {
      //   console.log(res)
      // })
    },
    handleDelete(index, row) {
      this.orderId = row._id
      this.dialogdelVisible = true
    },
    doDel() {
      this.$request.delorder({ id: this.orderId }).then((res) => {
        if (res.result.deletedCount > 0) {
          this.tableData = []
          this.getorderList()
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
    doEdit() {
      this.$request.editorder({ ...this.editorderInfo }).then((res) => {
        if (res.result.nModified > 0) {
          this.tableData = []
          this.getorderList()
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
