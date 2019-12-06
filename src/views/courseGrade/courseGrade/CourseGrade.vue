<template>
  <div>
    科目年级管理
        <Select clearable placeholder="选择优先级" v-model="model1" style="width:200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
  </div>
</template>

<script>
    export default {
        data () {
            return {
                cityList: [
                    {
                        value: '1',
                        label: '2'
                    },
                    {
                        value: '2',
                        label: '1'
                    }
                ],
                model1: '1'
            }
        }
    }
</script>

<style>
</style>
