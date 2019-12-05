<template>
  <div>
    <Title>
      <p>课程年级管理>课程管理</p>
    </Title>
    <div class="count">
      <Button type="primary" @click="modal1 = true">添加</Button>

      <Modal
        v-model="modal1"
        title="新增课程"
        @on-ok="okAdd"
        @on-cancel="cancelAdd">
        <Form :model="course" :label-width="80">
          <FormItem label="课程名">
            <Input v-model="course.courseName" placeholder="请输入新增课程名"></Input>
          </FormItem>
          <FormItem label="优先级">
            <Input v-model="course.orderCol" placeholder="请输入优先级"></Input>
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
          <Input type="text" v-model="editOrderCol" v-if="editIndex === index" />
          <span v-else>
            {{ row.orderCol }}
          </span>
          <Select v-model="editOrderCol" style="width:200px" v-if="editIndex === index">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
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
        loading: true,
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
        cityList: [
          {
              value: 'New York',
              label: 'New York'
          },
          {
              value: 'London',
              label: 'London'
          },
          {
              value: 'Sydney',
              label: 'Sydney'
          },
          {
              value: 'Ottawa',
              label: 'Ottawa'
          },
          {
              value: 'Paris',
              label: 'Paris'
          },
          {
              value: 'Canberra',
              label: 'Canberra'
          }
        ],
        selModel: '',
        columns: [
          {
            // title: '序号',
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
      okAdd () {
        // this.$Message.info('提交成功');
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
            orderCol: this.course.orderCol
          }
        }).then(res => {
          console.log(123)
          console.log(res.data)
          if(res.data.code == 1000){
            this.$Message.info(res.data.msg);
          }
          if(res.data.code == 1001){
            this.$Message.info(res.data.msg);
            this.course.courseName = ''
            this.course.orderCol = ''
            this.courses.push(res.data.data)
          }
          // this.$Message.info('提交成功');
        })
      },
      cancelAdd () {
        this.$Message.info('已取消');
      },

      handleEdit (row, index) {
        // this.editCourseId = row.courseId;
        this.editCourseName = row.courseName;
        this.editOrderCol = row.orderCol;
        this.editIndex = index;
      },
      handleSave (index) {
        // this.courses[index].courseId = this.editCourseId;
        if(this.courses[index].courseName == this.editCourseName &&
            this.courses[index].orderCol == this.editOrderCol){
            // this.editIndex = -1;
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
            console.log(123)
            console.log(res.data)
            if(res.data.code == 2000){
              this.$Message.info(res.data.msg);
            }
            if(res.data.code == 2001){
              this.courses[index].courseName = this.editCourseName;
              this.courses[index].orderCol = this.editOrderCol;
              this.editIndex = -1;
              this.$Message.info(res.data.msg);
            }
            // this.$Message.info('提交成功');
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
            console.log(123)
            console.log(res.data)
            if(res.data.code == 2000){
              this.$Message.info(res.data.msg);
            }
            if(res.data.code == 2001){
              this.courses[index].courseName = this.editCourseName;
              this.courses[index].orderCol = this.editOrderCol;
              this.editIndex = -1;
              this.$Message.info(res.data.msg);
              request({
                url: "/course"
              }).then(res => {
                if(res) {
                  this.loading = false
                }
                this.courses = res
                this.courses = res.data
              })
            }
            // this.$Message.info('提交成功');
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
          url: "/course",
          method: 'delete',
          data: {
            courseId: this.delCourse.courseId,
            courseName: this.delCourse.courseName,
            orderCol: this.delCourse.orderCol
          }
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
              url: "/course"
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
        url: "/course"
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
