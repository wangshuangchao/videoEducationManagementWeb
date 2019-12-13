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
        <Table :columns="columns" :data="grades">
          <template slot-scope="{ row, index }" slot="action">
            <Button @click="handleDel(row, index)">删除</Button>
          </template>
        </Table>
      </div>
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
        course: {},
        courses: [],
        grade: {
          gradeId: '1'
        },
        grades: [],
        allGrades: [],
        columns: [
          {
            type: 'index'
          },
          {
            title: 'id号',
            key: 'gradeId'
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
          for(var item of this.grades){
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
        console.log(this.grade.gradeId)
        console.log(this.course.courseId)
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
              // request({
              //   url: "/courseGrades/" + course.courseId
              // }).then(res => {
              //   this.grades = []
              //   if(res) {
              //     this.loading = false
              //   }
              //   this.grades = res.data
              // })
            }
          })
      },
      cancelRelation(){

      },
      showGrades(course, index) {
        this.course = course
        this.selected = index
        request({
          url: "/courseGrades/" + course.courseId
        }).then(res => {
          this.grades = []
          if(res) {
            this.loading = false
          }
          this.grades = res.data
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
          this.grades = []
          this.selected = 0
          this.course = this.courses[0]
          if(res) {
            this.loading = false
          }
          this.grades = res.data
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
