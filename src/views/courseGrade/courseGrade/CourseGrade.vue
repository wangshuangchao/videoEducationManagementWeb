<template>
  <div>
    <Title>
      <p>课程年级管理>关联管理</p>
    </Title>
    <div class="count">
      <div id="courseList">
        <span :class="{'sele': index === selected}" v-for="(course, index) in courses" @click="showGrades(course, index)">{{course.courseName}} --- {{index}}</span>
      </div>

      <Modal
        ok-text = "提交"
        draggable
        v-model="modal1"
        title="添加关联年级"
        @on-ok="okRelation"
        @on-cancel="cancelRelation">
        <Form :model="course" :label-width="80">
          <h2 align="center">给"{{course.courseName}}"课程关联年级</h2>
          <FormItem label="年级名">
            <Select v-model="grade.gradeId"  transfer  style="width:100px;margin-left:25px;">
              <Option v-for="item in allGrades" :value="item.gradeId" :key="item.gradeName">{{ item.gradeName }}</Option>
            </Select>
          </FormItem>
        </Form>
      </Modal>

      <div id="gradeList">
        <Button type="primary" @click="relation">添加关联年级</Button>
        <Table border :columns="columns" :data="courseGrades">
          <template slot-scope="{ row, index }" slot="action">
            <Button @click="delRelation(row, index)">删除</Button>
          </template>
        </Table>
      </div>

      <Modal
        v-model="modal2"
        title="删除关联关系"
        @on-ok="okDel"
        @on-cancel="cancelDel">
        <p>确定要删除"{{course.courseName}}"和"{{delCourseGrade.gradeName}}"关联吗？</p>
      </Modal>
    </div>
  </div>
</template>

<script>
  import Title from "components/content/title/Title.vue"
  import {request} from "network/request.js"

  export default {
    data () {
      return {
        selected: -1,
        modal1: false,
        modal2: false,
        course: {},
        courses: [],
        delCourseGrade: {},
        grade: {
          gradeId: '1'
        },
        courseGrades: [],
        allGrades: [],
        columns: [
          {
            type: 'index'
          },
          {
            title: '优先级',
            key: 'orderCol',
            sortable: true
          },
          {
            title: '年级名',
            key: 'gradeName'
          },
          {
            title: '操作',
            slot: 'action'
          }
        ],
      }
    },
    components: {
      Title
    },
    methods: {
      relation() {
        request({
          url: "/grades"
        }).then(res => {
          this.allGrades = res.data
          for(var item of this.courseGrades){
            for(var item2 of this.allGrades){
              if(item.gradeId == item2.gradeId){
                this.allGrades.splice(this.allGrades.indexOf(item2),1)
              }
            }
          }
          this.modal1 = true
        })
      },
      okRelation() {
        request({
            url: "/courseGrade",
            method: 'post',
            data: {
              gradeId: this.grade.gradeId,
              courseId: this.course.courseId
            }
          }).then(res => {
            if(res.data.code == 3001){
              this.$Message.info(res.data.msg);
              return
            }
            if(res.data.code == 3000){
              this.$Message.info(res.data.msg);
              // this.grades.push(res.data.data)
              request({
                url: "/courseGrades/" + this.course.courseId
              }).then(res => {
                this.courseGrades = []
                if(res) {
                  this.loading = false
                }
                this.courseGrades = res.data
              })
            }
          })
      },
      cancelRelation(){
        this.$Message.info('已取消');
      },
      delRelation(row, index) {
        this.modal2 = true
        this.delCourseGrade = row
      },
      okDel(){
        request({
            url: "/courseGrade/" + this.delCourseGrade.courseGradeId,
            method: 'delete',
          }).then(res => {
            if(res.data.code == 4001){
              this.$Message.info(res.data.msg);
              return
            }
            if(res.data.code == 4000){
              this.$Message.info(res.data.msg);
              // this.grades.push(res.data.data)
              request({
                url: "/courseGrades/" + this.course.courseId
              }).then(res => {
                this.courseGrades = []
                if(res) {
                  this.loading = false
                }
                this.courseGrades = res.data
              })
            }
          })
      },
      cancelDel() {
        this.$Message.info('已取消');
      },
      showGrades(course, index) {
        this.course = course
        this.selected = index
        request({
          url: "/courseGrades/" + course.courseId
        }).then(res => {
          this.courseGrades = []
          if(res) {
            this.loading = false
          }
          this.courseGrades = res.data
        })
      }

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
        request({
          url: "/courseGrades/" + this.courses[0].courseId
        }).then(res => {
          this.courseGrades = []
          this.selected = 0
          this.course = this.courses[0]
          if(res) {
            this.loading = false
          }
          this.courseGrades = res.data
        })
      })
    }
  }
</script>

<style>
  #courseList{
    background-color: #A0A8B3;
  }

  #courseList span {
    font-size: 30px;
    margin-left: 30px;
    color: #4D84FF;
  }

  .sele {
    background-color: violet;
  }
</style>
