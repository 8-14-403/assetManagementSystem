<template lang="html">
  <div>
    <v-table
      is-horizontal-resize
      style="width:100%"
      :is-loading="isLoading"
      :columns='columns'
      :table-data='tableData'
      row-hover-color="#eee"
      row-click-color="#edf7ff"
      :select-all="selectAll"
      :select-change="selectChange"
      :select-group-change="selectGroupChange"
      :cell-edit-done="cellEditDone"
      :column-cell-class-name="columnCellClass"
      @on-custom-comp="customCompFunc"
    >
    </v-table>
  </div>
</template>

<script>

import Vue from 'vue'
// 引入样式
import 'vue-easytable/libs/themes-base/index.css'
// 导入 table 和 分页组件
import {VTable, VPagination} from 'vue-easytable'

// 注册到全局
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)

export default {
  data () {
    return {
      isLoading: true,
      tableData: [],
      columns: [
        /* eslint-disable */
        {field: 'id', title: 'ID', width:30, titleCellClassName: 'assetId'},
        {field: 'checkbox', width: 30, titleAlign: 'center', columnAlign:'center', type: 'selection', isFrozen:true},
        {
          field: 'sort', title: '序号', width: 30, titleAlign: 'center', columnAlign: 'center', isFrozen: true, isResize: true,
          formatter: function (rowData, index) {
            return index < 3 ? '<span style="color:red;font-weight: bold;">' + (index + 1) + '</span>' : index + 1
          }
        },
        {field: 'assetType', title: '资产类别', width: 60, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
        {field: 'assetCode', title: '资产编号', width: 60, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
        {field: 'companyNumber', title: '单位编号', width: 60, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
        {field: 'deviceName', title: '设备名称', width: 60, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
        {field: 'model', title: '型号', width: 30, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
        {field: 'country', title: '国别', width: 30, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
        {field: 'manufacturer', title: '生产厂家', width: 60, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
        {field: 'factoryNumber', title: '出场编号', width: 60, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
        {field: 'department', title: '使用部门', width: 60, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
        {field: 'user', title: '使用人', width: 40, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
        {field: 'originalValue', title: '资产原值', width: 60, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
        {field: 'project', title: '计划项目', width: 60, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
        {field: 'number', title: '数量', width: 30, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
        {field: 'comment', title: '备注', width: 100, titleAlign: 'center', columnAlign: 'left', isResize: true, isEdit: true},
        {field: 'operation', title: '操作',width: 100, titleAlign: 'center',columnAlign:'center',componentName:'table-operation',isResize:true}
      ]
    }
  },
  methods:{
    initTable(){
      /* eslint-disable */
      this.isLoading = true;
      this.$http.get('http://localhost:8888/asset/getAll')
        .then((response) => {
          if(response.body.code === 0) {
            this.isLoading = false;
            var data = response.body.data;
            for (var i=0; i<data.length; i++) {
              this.tableData.push(data[i])
            }
          }
        })
        .catch( function (response) {
          this.isLoading = false;
          alert('请求数据失败')
        })

      // this.tableData = [
      //   { 'assetType': '自己的',
      //     'assetCode': '123',
      //     'companyNumber': '123',
      //     'deviceName': '电脑',
      //     'model': '联想E480',
      //     'country': '中国',
      //     'manufacture': '航天江南',
      //     'factoryNumber': '123',
      //     'department': '研发',
      //     'user': 'caojy',
      //     'originalValue': '0',
      //     'project': '国产虚拟化',
      //     'number': '2',
      //     'comment': '使用中sssssssssssssssssssssssssssssssssssssssssssss~~'
      //   }
      // ];

    },
    // 单元格编辑回调
    cellEditDone(newValue,oldValue,rowIndex,rowData,field){

      this.tableData[rowIndex][field] = newValue;

      // 接下来处理你的业务逻辑，数据持久化等...
    },
    columnCellClass(rowIndex, columnName, rowData){

      // 给三行column为‘hobby’的列设置className
      if (columnName === 'id'){

        return 'assetId';
      }
    },
    selectAll(selection){

      console.log('select-all', selection);
    },

    selectChange(selection,rowData){
      console.log('select-change', selection, rowData);
    },

    selectGroupChange(selection){
      console.log('select-group-change', selection);
    },
    customCompFunc(params){

      console.log(params);

      if (params.type === 'delete'){ // do delete operation

        this.$delete(this.tableData,params.index);

      }else if (params.type === 'edit'){ // do edit operation

        alert(`行号：${params.index} 姓名：${params.rowData['assetType']} ID：${params.rowData['id']}`)
      }

    }

  },
  created(){
    this.initTable();
  }
}
Vue.component('table-operation', {
  template:`<span>
    <a href="" @click.stop.prevent="update(rowData,index)">编辑</a>&nbsp;
    <a href="" @click.stop.prevent="deleteRow(rowData,index)">删除</a>
    </span>`,
  props:{
    rowData:{
      type:Object
    },
    field:{
      type:String
    },
    index:{
      type:Number
    }
  },
  methods:{
    update(){

      // 参数根据业务场景随意构造
      let params = {type:'edit',index:this.index,rowData:this.rowData};
      this.$emit('on-custom-comp',params);
    },

    deleteRow(){

      // 参数根据业务场景随意构造
      let params = {type:'delete',index:this.index};
      this.$emit('on-custom-comp',params);

    }
  }
})
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>
  a {
    color: #42b983;
  }
  .assetId {
    display: none;
  }
</style>
