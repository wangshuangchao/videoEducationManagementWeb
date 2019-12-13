<template>
  <div>
    <Title>
      <p>课程年级管理>年级管理</p>
    </Title>
    <div class="count">
      <Button type="primary" @click="addGrade">添加</Button>

      <Modal
        ok-text = "提交"
        draggable
        v-model="modal1"
        title="新增年级"
        @on-ok="okAdd"
        @on-cancel="cancelAdd">
        <Form :model="grade" :label-width="80">
          <FormItem label="年级名">
            <Input v-model="grade.gradeName" placeholder="请输入新增年级名"></Input>
          </FormItem>
          <FormItem label="优先级">
            <!-- <Input v-model="grade.orderCol" placeholder="请输入优先级"></Input  :placeholder="editOrderCol"> -->
            <Select v-model="grade.orderCol"  transfer    style="width:100px;margin-left:25px;">
              <Option v-for="item in priorities" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Form>
      </Modal>

      <Table height="670" :columns="columns" :data="grades">
        <template slot-scope="{ row, index }" slot="gradeId">
          <Input type="text" v-model="editgradeId" v-if="editIndex === index" />
          <span v-else>{{ row.gradeId }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="gradeName">
          <Input type="text" v-model="editGradeName" v-if="editIndex === index" />
          <span v-else>{{ row.gradeName }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="orderCol">
          <Select v-model="editOrderCol"  transfer  :placeholder="editOrderCol"  style="width:100px;margin-left:25px;" v-if="editIndex === index">
            <Option v-for="item in priorities" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <span v-else>
            {{ row.orderCol }}
          </span>
        </template>

        <template slot-scope="{ row, index }" slot="action">
          <div v-if="editIndex === index">
            <Button @click="handleSave(index)">保存</Button>
            <Button @click="editIndex = -1">取消</Button>
          </div>
          <div v-else>
            <Button @click="handleEdit(row, index)">修改</Button>
            <Button @click="handleDel(row, index)">删除</Button>
          </div>
        </template>
      </Table>

      <Modal
        v-model="modal2"
        title="删除年级"
        @on-ok="okDel"
        @on-cancel="cancelDel">
        <p>确定要删除"{{delGradeName}}"年级吗？</p>
      </Modal>

    </div>
    <div>
      <p>显示12条记录，共200条数据</p>
    </div>
  </div>
</template>

<script>
  import Title from "components/content/title/Title.vue"
  import {request} from "network/request.js"

  export default {
    data() {
      return {
        grades: [],
        loading: true,
        modal1: false,
        modal2: false,
        grade: {
          gradeName: '',
          orderCol: ''
        },
        delGradeName: '',
        delGrade: {
          gradeId: '',
          gradeName: '',
          orderCol: ''
        },
        delIndex: '',
        priorities: [],
        selModel: '',
        columns: [
          {
            // title: '序号',
            type: 'index'
          },
          {
            title: 'id号',
            key: 'gradeId'
          },
          {
            title: '年级名',
            slot: 'gradeName'
          },
          {
            title: '优先级',
            slot: 'orderCol'
          },
          {
            title: '操作',
            slot: 'action'
          }
        ],
        editIndex: -1,  // 当前聚焦的输入框的行数
        editGradeId: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
        editGradeName: '',  // 第二列输入框
        editOrderCol: '',  // 第三列输入框
      }
    },
    methods: {
      addGrade () {
        this.modal1 = true
        request({
          url: "/grades"
        }).then(res => {
          if(res) {
            this.loading = false
          }
          this.grades = res
          this.grades = res.data
          this.priorities = []
          for(var value of this.grades){
            this.priorities.push({value:value.orderCol,label:value.orderCol})
          }
          this.priorities.push({value:this.priorities[this.priorities.length - 1].value + 1,
                                label:this.priorities[this.priorities.length - 1].label + 1})

        })
      },
      okAdd () {
        console.log(this.grade.gradeName)
        if(this.grade.gradeName == '' || this.grade.orderCol == '') {
          this.$Message.info('内容不能为空');
          return
        }
        request({
          url: "/grade",
          method: 'post',
          data: {
            gradeName: this.grade.gradeName,
            orderCol: this.grade.orderCol,
            lastOrderCol: this.grade.lastOrderCol
          }
        }).then(res => {
          if(res.data.code == 1001 || res.data.code == 1002){
            this.$Message.info(res.data.msg);
            return
          }
          if(res.data.code == 1000){
            request({
              url: "/grades"
            }).then(res => {
              if(res) {
                this.loading = false
              }
              this.grades = res
              this.grades = res.data
            })
          }
        })
      },
      cancelAdd () {
        this.$Message.info('已取消');
      },

      handleEdit (row, index) {
        request({
          url: "/grades"
        }).then(res => {
          if(res) {
            this.loading = false
          }
          this.grades = res
          this.grades = res.data
          this.priorities = []
          for(var value of this.grades){
            this.priorities.push({value:value.orderCol + '',label:value.orderCol + ''})
          }

        })
        this.editGradeName = row.gradeName;
        this.editOrderCol = row.orderCol + '';
        this.editIndex = index;
      },
      handleSave (index) {
        if(this.grades[index].gradeName == this.editGradeName &&
            this.grades[index].orderCol == this.editOrderCol){
            this.$Message.info('未做修改');
            return
        }
        if(this.grades[index].orderCol == this.editOrderCol){
          request({
            url: "/grade",
            method: 'put',
            data: {
              gradeId: this.grades[index].gradeId,
              gradeName: this.editGradeName,
              orderCol: this.editOrderCol
            }
          }).then(res => {
            if(res.data.code == 2000){
              this.$Message.info(res.data.msg);
            }
            if(res.data.code == 2001){
              this.grades[index].gradeName = this.editGradeName;
              this.grades[index].orderCol = this.editOrderCol;
              this.editIndex = -1;
              this.$Message.info(res.data.msg);
            }
          })
        }

        if(this.grades[index].orderCol != this.editOrderCol){
          request({
            url: "/grade",
            method: 'put',
            data: {
              gradeId: this.grades[index].gradeId,
              gradeName: this.editgradeName,
              orderCol: this.editOrderCol
            }
          }).then(res => {
            if(res.data.code == 2000){
              this.$Message.info(res.data.msg);
            }
            if(res.data.code == 2001){
              this.grades[index].gradeName = this.editgradeName;
              this.grades[index].orderCol = this.editOrderCol;
              this.editIndex = -1;
              this.$Message.info(res.data.msg);
              request({
                url: "/grades"
              }).then(res => {
                if(res) {
                  this.loading = false
                }
                this.grades = res
                this.grades = res.data
              })
            }
          })
        }

      },
      handleDel (row, index) {
        this.modal2 = true
        this.delGradeName = row.gradeName
        this.delgrade = row
        this.delIndex =  index
      },
      okDel() {
        request({
          url: "/grade/" + this.delgrade.gradeId,
          method: 'delete',
        }).then(res => {
          if(res.data.code == 3000){
            this.$Message.info(res.data.msg);
          }
          if(res.data.code == 3001){
            this.$Message.info(res.data.msg);
            this.grades.splice(this.delIndex,1)
            this.delgrade = {}
            this.delIndex = ''
            request({
              url: "/grades"
            }).then(res => {
              if(res) {
                this.loading = false
              }
              this.grades = res
              this.grades = res.data
            })
          }
        })
      },
      cancelDel() {
        this.$Message.info('已取消');
      }
    },
    components: {
      Title
    },
    created() {
      request({
        url: "/grades"
      }).then(res => {
        if(res) {
          this.loading = false
        }
        this.grades = res
        this.grades = res.data
      })
    }

  }
</script>

<style>
  .count {
    margin-left: 20px;
    padding: 10px;
    background-color: #FFFFFF;
    height: 700px;
  }

</style>
