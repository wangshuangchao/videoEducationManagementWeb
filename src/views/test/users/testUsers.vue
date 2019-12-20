<template>
  <div>
    <Title>
      <p>测试数据管理>测试用户管理</p>
    </Title>
    <div class="count">
      <div class="butt">
        <Button type="primary" @click="addTestUser">添加</Button>
        <Button type="primary">批量添加</Button>
        <Button type="primary">批量删除</Button>
      </div>
      <Table height="700" border :columns="columns" :data="users">
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
    </div>

  </div>
</template>

<script>
  import Title from "components/content/title/Title.vue"
  import {request} from "network/request.js"

  export default {
    data() {
      return {
        columns: [
          {
            // title: '序号',
            type: 'index',
            width: 70,
            fixed: 'left',
            align: 'center'
          },
          {
            title: '头像',
            key: 'headPortrait',
            width: 90,
            render: (h, params) => {
              return h('Avatar', {
                props: {
                  icon: 'ios-person',
                  size: "large",
                  src: params.row.headPortrait
                }
              })
            },
            align: 'center'
          },
          {
            title: '用户名',
            key: 'userName',
            width: 100,
            align: 'center'
          },
          {
            title: '密码',
            key: 'password',
            width: 150,
            align: 'center'
          },
          {
            title: '昵称',
            key: 'nick',
            width: 150,
            align: 'center'
          },
          {
            title: '手机号',
            key: 'cellPhone',
            width: 150,
            align: 'center'
          },
          {
            title: '年龄',
            key: 'age',
            width: 70,
            align: 'center'
          },
          {
            title: '生日',
            key: 'birthday',
            width: 150,
            align: 'center'
          },
          {
            title: '性别',
            key: 'gender',
            width: 100,
            align: 'center'
          },
          {
            title: '职业',
            key: 'occupation',
            width: 100,
            align: 'center'
          },
          {
            title: '地址',
            key: 'address',
            width: 100,
            align: 'center'
          },
          {
            title: '个人签名',
            key: 'personalSignature',
            width: 200,
            align: 'center'
          },
          {
            title: '身份证名',
            key: 'idCardName',
            width: 100,
            align: 'center'
          },
          {
            title: '身份证号',
            key: 'idCardNumber',
            width: 100,
            align: 'center'
          },
          {
            title: '是否主播',
            key: 'isAnchor',
            width: 100,
            align: 'center'
          },
          {
            title: '是否教师',
            key: 'isTeacher',
            width: 100,
            align: 'center'
          },
          {
            title: '是否VIP',
            key: 'isVip',
            width: 100,
            align: 'center'
          },
          {
            title: '微信',
            key: 'openId',
            width: 100,
            align: 'center'
          },
          {
            title: '操作',
            slot: 'action',
            width: 160,
            fixed: 'right',
            align: 'center'
          }
        ],
        users: [],
        editIndex: -1

      }
    },
    components: {
      Title
    },
    methods: {
      addTestUser(){
        this.$router.replace('/testuser/add')
      }
    },
    created() {
      request({
        url: "/users"
      }).then(res => {
        if(res) {
          this.loading = false
        }
        // this.courses = res
        this.users = res.data
      })
    }
  }
</script>

<style>
  .butt{
    margin-bottom: 10px;
  }
  .butt button{
    margin-left: 10px;
  }
</style>
