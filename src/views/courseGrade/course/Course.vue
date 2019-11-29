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
        @on-ok="ok"
        @on-cancel="cancel">
        <Form :model="course" :label-width="80">
          <FormItem label="课程名">
            <Input v-model="course.courseName" placeholder="请输入新增课程名"></Input>
          </FormItem>
          <FormItem label="优先级">
            <Input v-model="course.orderCol" placeholder="请输入优先级"></Input>
          </FormItem>
        </Form>
      </Modal>

      <!-- <Table :loading="loading" stripe  :columns="columns1" :data="courses">
        <template slot-scope="{ row, index }" slot="courseName">
          <Input type="text" v-model="editCourseName" v-if="editIndex === index" />
          <span v-else>{{ row.courseName }}</span>
        </template>
        <template slot-scope="{ row, index }" slot="operation">
          <div v-if="editIndex === index">
            <Button @click="handleSave(index)">保存</Button>
            <Button @click="editIndex = -1">取消</Button>
          </div>
          <div v-else>
            <Button @click="handleEdit(row, index)">操作</Button>
          </div>
        </template>
      </Table> -->
      <Table :columns="columns" :data="data">
          <template slot-scope="{ row, index }" slot="name">
            <Input type="text" v-model="editName" v-if="editIndex === index" />
            <span v-else>{{ row.name }}</span>
          </template>

          <template slot-scope="{ row, index }" slot="age">
            <Input type="text" v-model="editAge" v-if="editIndex === index" />
            <span v-else>{{ row.age }}</span>
          </template>

          <template slot-scope="{ row, index }" slot="birthday">
            <Input type="text" v-model="editBirthday" v-if="editIndex === index" />
            <span v-else>{{ getBirthday(row.birthday) }}</span>
          </template>

          <template slot-scope="{ row, index }" slot="address">
            <Input type="text" v-model="editAddress" v-if="editIndex === index" />
            <span v-else>{{ row.address }}</span>
          </template>

          <template slot-scope="{ row, index }" slot="action">
            <div v-if="editIndex === index">
              <Button @click="handleSave(index)">保存</Button>
              <Button @click="editIndex = -1">取消</Button>
            </div>
            <div v-else>
              <Button @click="handleEdit(row, index)">操作</Button>
            </div>
          </template>
        </Table>
      <br>
      <!-- <Switch v-model="loading"></Switch> -->
    </div>
    <div>
      <p>显示12条记录，共200条数据</p>
    </div>
  </div>
</template>

<script>
  import Title from "components/content/title/Title.vue"
  // import Table from "components/content/table/Table.vue"
  import {request} from "network/request.js"

  export default {
    data() {
      return {
        loading: true,
        modal1: false,
        course: {
          courseName: '',
          orderCol: ''
        },
        // columns1: [
        //   {
        //     title: '序号',
        //     slot: 'courseId'
        //   },
        //   {
        //     title: '年级名',
        //     key: 'courseName'
        //   },
        //   {
        //     title: '优先级',
        //     key: 'orderCol'
        //   },
        //   {
        //     title: '操作',
        //     key: 'operation'
        //   }
        // ],
        // courses: [],
        // editIndex: -1,  // 当前聚焦的输入框的行数
        // editCourseName: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
        columns: [
                  {
                    title: '姓名',
                    slot: 'name'
                  },
                  {
                    title: '年龄',
                    slot: 'age'
                  },
                  {
                    title: '出生日期',
                    slot: 'birthday'
                  },
                  {
                    title: '地址',
                    slot: 'address'
                  },
                  {
                    title: '操作',
                    slot: 'action'
                  }
                ],
                data: [
                  {
                    name: '王小明',
                    age: 18,
                    birthday: '919526400000',
                    address: '北京市朝阳区芍药居'
                  },
                  {
                    name: '张小刚',
                    age: 25,
                    birthday: '696096000000',
                    address: '北京市海淀区西二旗'
                  },
                  {
                    name: '李小红',
                    age: 30,
                    birthday: '563472000000',
                    address: '上海市浦东新区世纪大道'
                  },
                  {
                    name: '周小伟',
                    age: 26,
                    birthday: '687024000000',
                    address: '深圳市南山区深南大道'
                  }
                ],
                editIndex: -1,  // 当前聚焦的输入框的行数
                editName: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
                editAge: '',  // 第二列输入框
                editBirthday: '',  // 第三列输入框
                editAddress: '',  // 第四列输入框
      }
    },
    methods: {
      ok () {
        this.$Message.info('提交成功');
        console.log(this.course.courseName)
        request({
          url: "/course",
          method: 'post',
          data: {
            courseName: this.course.courseName,
            orderCol: this.course.orderCol
          }
        }).then(res => {
          console.log(res)
        })
      },
      cancel () {
        this.$Message.info('已取消');
      },
      // handleEdit (row, index) {
      //   this.editCourseName = row.courseName;
      //   this.editIndex = index;
      // },
      // handleSave (index) {
      //   this.data[index].courseName = this.editCourseName;
      //   this.editIndex = -1;
      // }
      handleEdit (row, index) {
              this.editName = row.name;
              this.editAge = row.age;
              this.editAddress = row.address;
              this.editBirthday = row.birthday;
              this.editIndex = index;
            },
            handleSave (index) {
              this.data[index].name = this.editName;
              this.data[index].age = this.editAge;
              this.data[index].birthday = this.editBirthday;
              this.data[index].address = this.editAddress;
              this.editIndex = -1;
            },
            getBirthday (birthday) {
              const date = new Date(parseInt(birthday));
              const year = date.getFullYear();
              const month = date.getMonth() + 1;
              const day = date.getDate();
              return `${year}-${month}-${day}`;
            }
    },
    components: {
      Title
    },
    created() {
      request({
        url: "/course"
      }).then(res => {
        console.log(res.data)
        if(res) {
          this.loading = false
        }
        this.courses = res.data
      })
    }

  }
</script>

<style>
  .count {
    width: 1559.2px;
    margin-left: 20px;
    padding-left: 10px;
    padding-right: 20px;
    background-color: #FFFFFF;
    height: 692px;
  }

</style>
