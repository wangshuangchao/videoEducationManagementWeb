<template>
  <div>
    <Title>
      <p>课程年级管理>课程管理</p>
    </Title>
    <div class="count">
      <Button type="primary" @click="addCourse">添加</Button>

      <Modal
        ok-text = "提交"
        draggable
        v-model="modal1"
        title="新增课程"
        @on-ok="okAdd"
        @on-cancel="cancelAdd">
        <Form :model="course" :label-width="80">
          <FormItem label="课程名">
            <Input v-model="course.courseName" placeholder="请输入新增课程名"></Input>
          </FormItem>
          <FormItem label="优先级">
            <!-- <Input v-model="course.orderCol" placeholder="请输入优先级"></Input  :placeholder="editOrderCol"> -->
            <Select v-model="course.orderCol"  transfer    style="width:100px;margin-left:25px;">
              <Option v-for="item in priorities" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Form>
      </Modal>

      <Table height="670" :columns="columns" :data="courses">
        <template slot-scope="{ row, index }" slot="courseId">
          <Input type="text" v-model="editCourseId" v-if="editIndex === index" />
          <span v-else>{{ row.courseId }}</span>
        </template>

        <template slot-scope="{ row, index }" slot="courseName">
          <Input type="text" v-model="editCourseName" v-if="editIndex === index" />
          <span v-else>{{ row.courseName }}</span>
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
        title="删除课程"
        @on-ok="okDel"
        @on-cancel="cancelDel">
        <p>确定要删除"{{delCourseName}}"课程吗？</p>
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
        courses: [],
        modal1: false,
        modal2: false,
        course: {
          courseName: '',
          orderCol: ''
        },
        delCourseName: '',
        delCourse: {
          courseId: '',
          courseName: '',
          orderCol: ''
        },
        delIndex: '',
        priorities: [],
        selModel: '',
        columns: [
          {
            type: 'index'
          },
          {
            title: 'id号',
            key: 'courseId'
          },
          {
            title: '课程名',
            slot: 'courseName'
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
        editCourseId: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
        editCourseName: '',  // 第二列输入框
        editOrderCol: '',  // 第三列输入框
      }
    },
    methods: {
      addCourse () {
        // 显示添加对话框
        this.modal1 = true
        // 添加对话框中的优先级
        request({
          url: "/courses"
        }).then(res => {
          this.courses = res.data
          this.priorities = []
          for(var value of this.courses){
            this.priorities.push({value:value.orderCol,label:value.orderCol})
          }
          this.priorities.push({value:this.priorities[this.priorities.length - 1].value + 1,
                                label:this.priorities[this.priorities.length - 1].label + 1})

        })
      },
      okAdd () {
        console.log(this.course.courseName)
        if(this.course.courseName == '' || this.course.orderCol == '') {
          this.$Message.info('内容不能为空');
          return
        }
        request({
          url: "/course",
          method: 'post',
          data: {
            courseName: this.course.courseName,
            orderCol: this.course.orderCol,
            lastOrderCol: this.course.lastOrderCol
          }
        }).then(res => {
          if(res.data.code == 1001 || res.data.code == 1002){
            this.$Message.info(res.data.msg);
            return
          }
          if(res.data.code == 1000){
            request({
              url: "/courses"
            }).then(res => {
              if(res) {
                this.loading = false
              }
              this.courses = res
              this.courses = res.data
            })
          }
        })
      },
      cancelAdd () {
        this.$Message.info('已取消');
      },

      handleEdit (row, index) {
        request({
          url: "/courses"
        }).then(res => {
          if(res) {
            this.loading = false
          }
          this.courses = res
          this.courses = res.data
          this.priorities = []
          for(var value of this.courses){
            this.priorities.push({value:value.orderCol + '',label:value.orderCol + ''})
          }

        })
        this.editCourseName = row.courseName;
        this.editOrderCol = row.orderCol + '';
        this.editIndex = index;
      },
      handleSave (index) {
        if(this.courses[index].courseName == this.editCourseName &&
            this.courses[index].orderCol == this.editOrderCol){
            this.$Message.info('未做修改');
            return
        }
        if(this.courses[index].orderCol == this.editOrderCol){
          request({
            url: "/course",
            method: 'put',
            data: {
              courseId: this.courses[index].courseId,
              courseName: this.editCourseName,
              orderCol: this.editOrderCol
            }
          }).then(res => {
            if(res.data.code == 2000){
              this.$Message.info(res.data.msg);
            }
            if(res.data.code == 2001){
              this.courses[index].courseName = this.editCourseName;
              this.courses[index].orderCol = this.editOrderCol;
              this.editIndex = -1;
              this.$Message.info(res.data.msg);
            }
          })
        }

        if(this.courses[index].orderCol != this.editOrderCol){
          request({
            url: "/course",
            method: 'put',
            data: {
              courseId: this.courses[index].courseId,
              courseName: this.editCourseName,
              orderCol: this.editOrderCol
            }
          }).then(res => {
            if(res.data.code == 2000){
              this.$Message.info(res.data.msg);
            }
            if(res.data.code == 2001){
              this.courses[index].courseName = this.editCourseName;
              this.courses[index].orderCol = this.editOrderCol;
              this.editIndex = -1;
              this.$Message.info(res.data.msg);
              request({
                url: "/courses"
              }).then(res => {
                if(res) {
                  this.loading = false
                }
                this.courses = res
                this.courses = res.data
              })
            }
          })
        }

      },
      handleDel (row, index) {
        this.modal2 = true
        this.delCourseName = row.courseName
        this.delCourse = row
        this.delIndex =  index
      },
      okDel() {
        request({
          url: "/course/" + this.delCourse.courseId,
          method: 'delete',
        }).then(res => {
          if(res.data.code == 3000){
            this.$Message.info(res.data.msg);
          }
          if(res.data.code == 3001){
            this.$Message.info(res.data.msg);
            this.courses.splice(this.delIndex,1)
            this.delCourse = {}
            this.delIndex = ''
            request({
              url: "/courses"
            }).then(res => {
              if(res) {
                this.loading = false
              }
              this.courses = res
              this.courses = res.data
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
        url: "/courses"
      }).then(res => {
        if(res) {
          this.loading = false
        }
        this.courses = res
        this.courses = res.data
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
