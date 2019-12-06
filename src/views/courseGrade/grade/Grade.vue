<template>
  <div>
    <div>年级管理</div>
    <Table :columns="columns" :data="data">
        <template slot-scope="{ row, index }" slot="name">
          <Input type="text" v-model="editName" v-if="editIndex === index" />
          <span v-else>{{ row.name }}</span>
          <Select v-model="editName"  style="width:200px" v-if="editIndex === index">
            <Option v-for="item in cityList" :value="item.value" :key="item.value" width="150px">{{ item.label }}</Option>
          </Select>
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
  </div>

</template>

<script>
  export default {
      data () {
        return {
          columns: [
            {
              title: '姓名',
              slot: 'name'
            },
            {
              title: '操作',
              slot: 'action'
            }
          ],
          data: [
            {
              name: '王小明',
            },
            {
              name: '张小刚',
            }
          ],
          editIndex: -1,  // 当前聚焦的输入框的行数
          editName: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁

        }
      },
      methods: {
        handleEdit (row, index) {
          this.editName = row.name;
          this.editIndex = index;
        },
        handleSave (index) {
          this.data[index].name = this.editName;
          this.editIndex = -1;
        }
      }
    }
</script>

<style>
</style>
