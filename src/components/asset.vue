<template>
      <div>
        <div class="query" style="padding-top:30px;padding-bottom: 30px;text-align: center;">
          <el-input type="text" style="width:600px;box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;" v-bind:placeholder="searchPlaceholder" v-model="searchInput"  @keyup.enter.native="search" @change="initTable">
            <el-button style="height:40px; color: #fff;background-color: #409EFF;border-color: #409EFF;border-radius: 0 4px 4px 0; box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;"
                       slot="append" icon="el-icon-search"
                       type="primary"
                       @click="search">查询</el-button>
          </el-input>
        </div>
        <div class="table" style="padding-top: 30px;">
          <div align="left">
            <el-button-group style="width: 320px">
              <el-button type="primary" size="small" v-on:click="add" icon="el-icon-plus">添加</el-button>
              <el-button type="primary" size="small" v-on:click="importData" icon="el-icon-upload2">导入</el-button>
              <el-button type="primary" size="small" v-on:click="exportExcel" icon="el-icon-download">导出</el-button>
              <el-button type="danger" size="small" v-on:click="delInBatch" icon="el-icon-delete">批量删除</el-button>
            </el-button-group>
          </div>
          <el-table v-bind:data="assets" highlight-current-row stripe v-loading="loading" max-height="650px" style="overflow: auto ;width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="40"></el-table-column>
            <el-table-column prop="index" align="center" label="序号" type="index" width="60"></el-table-column>
            <el-table-column prop="id" label="ID" v-if=false></el-table-column>
            <el-table-column align="center" sortable prop="assetType" label="资产类别" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="assetCode" label="资产编号" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="companyNumber" label="单位编号" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="deviceName" label="设备名称" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="model" label="型号" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="country" label="国别" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="manufacturer" label="生产厂家" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="factoryNumber" label="出厂编号" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="department" label="使用部门" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="user" label="使用人" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="originalValue" label="资产原值" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="project" label="计划项目" show-overflow-tooltip></el-table-column>
            <el-table-column align="center" prop="number" label="数量" show-overflow-tooltip></el-table-column>
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
          <el-dialog title="导入" :visible.sync="dialogImportVisible" :modal-append-to-body="false" :close-on-click-modal="false" class="dialog-import">
              <el-upload class="uploadFile"
                         drag
                         action="/asset/importExcel"
                         ref="upload"
                         :on-remove="handleRemove"
                         :before-upload="beforeUpload"
                         :on-error="uploadFail"
                         :on-success="uploadSuccess"
                         :on-change="handleChange"
                         :file-list="fileList"
                         :auto-upload="false"
                         :limit="3"
                         :on-exceed="handleExceed"
                         align="center">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传excel文件</div>
              </el-upload>
              <div class="import-dialog-footer">
                <el-button size="small" type="primary" @click="submitUpload" icon="el-icon-circle-check-outline">确认导入</el-button>
                <el-button size="small" type="warning" @click="cancelUpload" icon="el-icon-circle-close-outline">取消</el-button>
              </div>
          </el-dialog>
        </div>
      </div>
</template>

<script>
export default {
  /* eslint-disable */
  name: '',
  data: function () {
    return {
      searchPlaceholder: '资产类别/资产编号/设备名称',
      searchInput: '',
      isSearch: false,
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
      loading: true,
      dialogImportVisible: false,
      uploadFlag: 0,
      fileList:[],
      errorResults: [],
      multipleSelection: []
    }
  },
  created: function () {
    this.initTable()
  },
  methods: {
    search: function () {
      this.initTable()
    },
    initTable: function () {
      let size = this.pageSize
      this.loading = false
      if (this.searchInput !== '') {
        this.pageIndex = 1
        let currentPage = 0
        let condition = encodeURIComponent(this.searchInput)
        this.$http.get('/asset/getByCondition?condition=' + condition + '&page=' + currentPage + '&size=' + size)
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
      } else {
        let currentPage = this.pageIndex -1
        this.$http.get('/asset/getAll?page=' + currentPage + '&size=' + size)
          .then((response) => {
            if (response.body.code === 0) {
              this.assets = response.body.data.content
              this.total = response.body.data.totalElements
            } else {
              this.$alert(response.body.message, '获取资产信息失败', {type: 'error'})
            }
          })
          .catch((response) => {
            this.$alert(response.message, '请求失败', {type: 'error'})
          })
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
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
        _this.$http.post('/asset/saveAsset',{
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
        _this.$http.put('/asset/updateAsset',
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
          this.$http.delete('/asset/deleteAsset/' + id)
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
    delInBatch: function () {
      let data = this.multipleSelection
      let jsonData = JSON.stringify(data)
      if (data.length === 0 ) {
        this.$message({
          message: '请选择要删除的项！',
          type: 'error'
        })
      } else {
        this.$confirm('是否删除？', '警告', { type: 'warning' })
          .then(() => {
            this.$http.delete('/asset/deleteAssets', {
              body: jsonData,
              headers: {
                'Content-type': 'application/json'
              }
            })
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
      }

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
    },
    importData() {
      this.importFlag = 1
      this.fileList = []
      this.dialogImportVisible = true
    },
    handleRemove(file, fileList) {
    },
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    beforeUpload(file) {
      //上传前配置
      let excelfileExtend = ".xls,.xlsx"//设置文件格式
      let fileExtend = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      if (excelfileExtend.indexOf(fileExtend) <= -1) {
        this.$message({
          message: '文件格式错误',
          type: 'error'
        })
        return false
      }
    },
    uploadFail(err, file, fileList) {
      this.$message({
        message: err,
        type: 'error'
      })
    },
    //上传成功
    uploadSuccess(response, file, fileList) {
      if (response.code !== 0) {
        this.dialogImportVisible = false
        this.$message.error(response.message)
      } else {
        this.dialogImportVisible = false
        this.initTable()
        this.$message({
          message: '导入成功!',
          type: 'success'
        })
      }
    },
    /* 确认导入 */
    submitUpload () {
      if (this.fileList.length > 0 ) {
        this.$refs.upload.submit()
      } else {
        this.$message({
          message: '请选择要导入的Excel文件',
          type: 'warning'
        })
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    // 取消上传
    cancelUpload () {
      this.dialogImportVisible = false
      this.fileList = []
    },
    getDataToExport() {
      let _this = this
      let request = new XMLHttpRequest()
      request.open('GET', '/asset/getAll', false) // 第三个参数 false 代表设置同步请求
      request.setRequestHeader('Accept', 'application/json');
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify({learningCompleted: this.learningCompleted, playbackTime: this.currentTime}))
      if (request.status === 200) {
        let response =JSON.parse(request.response)
        if(response.code === 0) {
          _this.exportData = response.data
        } else {
          _this.errorResults = response.message
        }
      } else {
        _this.exportData = []
      }
    },
    exportExcel() {
      let _this = this
      _this.getDataToExport()
      require.ensure([], () => {
        const {export_json_to_excel} = require('../../static/js/Export2Excel')
        const tHeader = ['资产类别', '资产编号', '单位编号', '设备名称', '型号', '国别', '生产厂家', '出厂编号', '使用部门', '使用人', '资产原值', '计划项目', '数量', '备注']
        const filterVal = ['assetType', 'assetCode', 'companyNumber', 'deviceName', 'model', 'country', 'manufacturer', 'factoryNumber', 'department', 'user', 'originalValue', 'project', 'number', 'comment']
        if (_this.exportData.length !== 0) {
          const data = _this.formatJson(filterVal, _this.exportData)
          var time = _this.formatDate(new Date(), "yyyyMMddHHmmss")
          export_json_to_excel(tHeader, data, '资产信息_' + time)
          _this.exportData = []
        } else {
          _this.$alert(_this.errorResults.toString() ? null || '' : '表格数据为空', '导出失败', {type: 'error'})
          _this.errorResults = []
        }
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    formatDate(date, fmt) {
      var o = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "H+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        "S": date.getMilliseconds() // 毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
      return fmt
    }
  }
}
</script>

<style scoped>
  .uploadFile{
    margin-bottom: 40px;
  }
  .import-dialog-footer{
    margin-bottom: 20px;
    text-align: center;
  }
</style>
