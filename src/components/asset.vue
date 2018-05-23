<template>
      <div>
        <div class="timeQuery">
          开始日期：
          <el-date-picker v-model="start" type="date" placeholder="选择日期"></el-date-picker>
          结束日期：
          <el-date-picker v-model="end" type="date" placeholder="选择日期"></el-date-picker>
          <el-button type="primary" size="small" v-on:click="fetchData" icon="search">查  询</el-button>
          <el-button type="primary" size="small" v-on:click="add" icon="plus">添  加</el-button>
        </div>
        <div class="table">
          <div align="right" style="line-height: 50px">
            <el-button type="primary" size="small" v-on:click="fetchData" icon="el-icon-upload2">导入</el-button>
            <el-button type="primary" size="small" v-on:click="fetchData" icon="el-icon-download">导出</el-button>
          </div>
          <el-table v-bind:data="assets" highlight-current-row stripe border height="500" style="width: 100%" @selection-change="handleSelectionChange">>
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column align="center" label="序号" type="index" width="60"></el-table-column>
            <el-table-column prop="id" label="ID" v-if=false></el-table-column>
            <el-table-column align="center" sortable prop="assetType" label="资产类别"></el-table-column>
            <el-table-column align="center" prop="assetCode" label="资产编号"></el-table-column>
            <el-table-column align="center" prop="companyNumber" label="单位编号"></el-table-column>
            <el-table-column align="center" prop="deviceName" label="设备名称" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="model" label="型号"></el-table-column>
            <el-table-column align="center" prop="country" label="国别"></el-table-column>
            <el-table-column align="center" prop="manufacturer" label="生产厂家"></el-table-column>
            <el-table-column align="center" prop="factoryNumber" label="出厂编号"></el-table-column>
            <el-table-column align="center" prop="department" label="使用部门"></el-table-column>
            <el-table-column align="center" prop="user" label="使用人"></el-table-column>
            <el-table-column align="center" prop="originalValue" label="资产原值"></el-table-column>
            <el-table-column align="center" prop="project" label="计划项目" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="number" label="数量"></el-table-column>
            <el-table-column align="center" prop="comment" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" label="操作" width="200">
              <template slot-scope="scope">
                <el-button class="button_edit" type="text" size="small" v-on:click="edit(scope.row.id)" icon="el-icon-edit">编辑</el-button>
                <el-button class="button_delete" type="text" size="small" v-on:click="del(scope.row.id)" icon="el-icon-delete">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pager">
          <el-pagination v-bind:current-page="pageIndex"
                         :page-size="pageSize"
                         :total="total"
                         background
                         layout="total,sizes,prev,pager,next,jumper"
                         v-bind:page-sizes="pageSizes"
                         v-on:size-change="sizeChange"
                         v-on:current-change="pageIndexChange">

          </el-pagination>
        </div>
        <div>
          <el-dialog v-bind:title="title" :visible.sync="showOperateManifest" v-on:close="dialogClosed" width="40%">
            <el-form v-bind:model="asset" v-bind:rules="rules" ref="assetForm" label-position="left" label-width="80px">
              <el-form-item label="资产类别" prop="assetsType">
                <el-input v-model="asset.assetType"></el-input>
              </el-form-item>
              <el-form-item label="资产编号" prop="assetsCode">
                <el-input v-model="asset.assetCode"></el-input>
              </el-form-item>
              <el-form-item label="单位编号" prop="companyNumber">
                <el-input v-model="asset.companyNumber"></el-input>
              </el-form-item>
              <el-form-item label="设备名称" prop="deviceName">
                <el-input v-model="asset.deviceName"></el-input>
              </el-form-item>
              <el-form-item label="型号" prop="model">
                <el-input v-model="asset.model"></el-input>
              </el-form-item>
              <el-form-item label="国别" prop="country">
                <el-input v-model="asset.country"></el-input>
              </el-form-item>
              <el-form-item label="生产厂家" prop="manufacturer">
                <el-input v-model="asset.manufacturer"></el-input>
              </el-form-item>
              <el-form-item label="出厂编号" prop="factoryNumber">
                <el-input v-model="asset.factoryNumber"></el-input>
              </el-form-item>
              <el-form-item label="使用部门" prop="department">
                <el-input v-model="asset.department"></el-input>
              </el-form-item>
              <el-form-item label="使用人" prop="user">
                <el-input v-model="asset.user"></el-input>
              </el-form-item>
              <el-form-item label="资产原值" prop="originalValue">
                <el-input v-model="asset.originalValue"></el-input>
              </el-form-item>
              <el-form-item label="计划项目" prop="project">
                <el-input v-model="asset.project"></el-input>
              </el-form-item>
              <el-form-item label="数量" prop="number">
                <el-input v-model="asset.number"></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="comment">
                <el-input v-model="asset.comment"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" v-on:click="save" icon="el-icon-circle-check-outline" size="small">确定</el-button>
                <el-button type="primary" v-on:click="cancel" icon="el-icon-circle-close-outline" size="small">取消</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
        </div>
      </div>
</template>

<script>
export default {
  /* eslint-disable */
  name: '',
  data: function () {
    let currentDate = new Date()
    let costValidator = (rule, value, callback) => {
      if (!/^[0-9]+(.[0-9]{2})?$/.test(value)) {
        callback(new Error('请输入合法金额'))
      } else {
        callback()
      }
    }
    return {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, 1),
      end: new Date(),
      assets: [],
      title: '',
      asset: {},
      showOperateManifest: false,
      isAdd: false,
      rules: {
      },
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      pageSizes: [10, 20, 50, 100],
      multipleSelection: []
    }
  },
  created: function () {
    this.initTable()
  },
  methods: {
    initTable: function () {
      let currentPage = this.pageIndex -1
      let size = this.pageSize
      this.$http.get('http://localhost:8888/asset/getAll?page=' + currentPage + '&size=' + size)
        .then((response) => {
          if(response.body.code === 0) {
            this.assets = response.body.data.content
            this.total = response.body.data.totalElements
          } else {
            this.$alert(response.body.message, '获取资产信息失败', { type: 'error'})
          }
        })
        .catch((response) => {
          this.$alert(response.message, '请求失败', {type : 'error'})
        })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    fetchData: function () {
    },
    add: function () {
      this.title = '添加资产信息'
      this.asset = {}
      this.isAdd = true
      this.showOperateManifest = true
    },
    save: function () {
      // 获取DOM元素，需document.querySelector（".input1"）获取这个dom节点，然后在获取input1的值。vue中就可以使用将ref绑定到元素上去。
      // 如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素; 如果用在子组件上，引用就指向组件实例:
      const _this = this
      if (_this.isAdd) {
        let asset = _this.asset
        _this.$http.post('http://localhost:8888/asset/saveAsset',{
          'assetType': asset.assetType,
          'assetCode': asset.assetCode,
          'companyNumber': asset.companyNumber,
          'deviceName': asset.deviceName,
          'model': asset.model,
          'country': asset.country,
          'manufacturer': asset.manufacturer,
          'factoryNumber': asset.factoryNumber,
          'department': asset.department,
          'user': asset.user,
          'originalValue': asset.originalValue,
          'project': asset.project,
          'number': asset.number,
          'comment': asset.comment
        })
          .then((response) => {
            if (response.body.code === 0) {
              _this.showOperateManifest = false
              _this.$refs.assetForm.resetFields()
              _this.initTable()
              this.$message({
                message: '保存成功!',
                type: 'success'
              })
            } else {
              this.$alert(response.body.message, '保存失败', { type: 'error'})
            }
          })
          .catch((response) => {
            this.$alert(response.message, '请求失败!', { type: 'error'})
          })
        // bus.$emit("manifestChanged");
      } else {
        let asset = this.asset
        _this.$http.put('http://localhost:8888/asset/updateAsset',
          {
            'id': asset.id,
            'assetType': asset.assetType,
            'assetCode': asset.assetCode,
            'companyNumber': asset.companyNumber,
            'deviceName': asset.deviceName,
            'model': asset.model,
            'country': asset.country,
            'manufacturer': asset.manufacturer,
            'factoryNumber': asset.factoryNumber,
            'department': asset.department,
            'user': asset.user,
            'originalValue': asset.originalValue,
            'project': asset.project,
            'number': asset.number,
            'comment': asset.comment
          })
          .then((response) => {
            if (response.body.code === 0) {
              _this.showOperateManifest = false
              _this.$refs.assetForm.resetFields()
              _this.initTable()
              this.$message({
                message: '更新成功!',
                type: 'success'
              })
            } else {
              this.$alert(response.body.message, '更新失败!', { type: 'error'})
            }
          })
          .catch((response) => {
            this.$alert(response.message, '请求失败', { type: 'error'})
          })

      }
    },
    cancel: function () {
      this.asset = {}
      this.showOperateManifest = false
    },
    edit: function (id) {
      let currentManifest = this.assets.find(x => x.id === id)
      this.asset = JSON.parse(JSON.stringify(currentManifest))
      this.title = '编辑资产信息'
      this.isAdd = false
      this.showOperateManifest = true
    },
    del: function (id) {
      this.$confirm('是否删除？', '警告', { type: 'warning' })
        .then(() => {
          this.$http.delete('http://localhost:8888/asset/deleteAsset/' + id)
            .then(response => {
              if (response.body.code === 0) {
                this.initTable()
                this.$message({
                  message: '删除成功!',
                  type: 'success'
                })
              } else {
                this.$alert(response.body.message, '删除失败', { type: 'error' })
              }
            })
            .catch((response) => {
              this.$alert(response.message, '请求失败', { type: 'error' })
            })
        })
    },
    dialogClosed: function () {
      this.$refs.assetForm.resetFields()
    },
    sizeChange: function (pageSize) {
      this.pageSize = pageSize
      this.initTable()
    },
    pageIndexChange: function (pageIndex) {
      this.pageIndex = pageIndex
      this.initTable()
    }
  }
}
</script>

<style scoped>
   .timeQuery{
     margin-bottom:20px;
   }

</style>
