<template>
  <div>
    <Title>
      <p>测试数据管理>测试用户管理>添加用户</p>
    </Title>
    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom"
     :label-width="80">
     <!-- ref="formValidate" :model="formValidate" :rules="ruleValidate" -->
      <FormItem label="头像">
        <Upload action="http://localhost:8081/headPortrait">
          <Button icon="ios-cloud-upload-outline">上传</Button>
        </Upload>
      </FormItem>
      <FormItem label="用户名" prop="name">
        <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
      </FormItem>
      <FormItem label="Password" prop="passwd">
        <Input type="password" v-model="formCustom.passwd"></Input>
      </FormItem>
      <FormItem label="Confirm" prop="passwdCheck">
        <Input type="password" v-model="formCustom.passwdCheck"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formCustom')">Submit</Button>
        <Button @click="handleReset('formCustom')" style="margin-left: 8px">Reset</Button>
      </FormItem>
      <FormItem label="E-mail" prop="mail">
        <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
      </FormItem>
      <FormItem label="City" prop="city">
        <Select v-model="formValidate.city" placeholder="Select your city">
          <Option value="beijing">New York</Option>
          <Option value="shanghai">London</Option>
          <Option value="shenzhen">Sydney</Option>
        </Select>
      </FormItem>
      <FormItem label="Date">
        <Row>
          <Col span="11">
          <FormItem prop="date">
            <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
          </FormItem>
          </Col>
          <Col span="2" style="text-align: center">-</Col>
          <Col span="11">
          <FormItem prop="time">
            <TimePicker type="time" placeholder="Select time" v-model="formValidate.time"></TimePicker>
          </FormItem>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="Gender" prop="gender">
        <RadioGroup v-model="formValidate.gender">
          <Radio label="male">Male</Radio>
          <Radio label="female">Female</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="Hobby" prop="interest">
        <CheckboxGroup v-model="formValidate.interest">
          <Checkbox label="Eat"></Checkbox>
          <Checkbox label="Sleep"></Checkbox>
          <Checkbox label="Run"></Checkbox>
          <Checkbox label="Movie"></Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem label="Desc" prop="desc">
        <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import Title from "components/content/title/Title.vue"

  export default {
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter your password'));
        } else {
          if (this.formCustom.passwdCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.formCustom.validateField('passwdCheck');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter your password again'));
        } else if (value !== this.formCustom.passwd) {
          callback(new Error('The two input passwords do not match!'));
        } else {
          callback();
        }
      };
      return {
        formCustom: {
          passwd: '',
          passwdCheck: '',
        },
        ruleCustom: {
          passwd: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          passwdCheck: [{
            validator: validatePassCheck,
            trigger: 'blur'
          }]
        },
        formValidate: {
          name: '',
          mail: '',
          city: '',
          gender: '',
          interest: [],
          date: '',
          time: '',
          desc: ''
        },
        ruleValidate: {
          name: [{
            required: true,
            message: 'The name cannot be empty',
            trigger: 'blur'
          }],
          mail: [{
              required: true,
              message: 'Mailbox cannot be empty',
              trigger: 'blur'
            },
            {
              type: 'email',
              message: 'Incorrect email format',
              trigger: 'blur'
            }
          ],
          city: [{
            required: true,
            message: 'Please select the city',
            trigger: 'change'
          }],
          gender: [{
            required: true,
            message: 'Please select gender',
            trigger: 'change'
          }],
          interest: [{
              required: true,
              type: 'array',
              min: 1,
              message: 'Choose at least one hobby',
              trigger: 'change'
            },
            {
              type: 'array',
              max: 2,
              message: 'Choose two hobbies at best',
              trigger: 'change'
            }
          ],
          date: [{
            required: true,
            type: 'date',
            message: 'Please select the date',
            trigger: 'change'
          }],
          time: [{
            required: true,
            type: 'string',
            message: 'Please select time',
            trigger: 'change'
          }],
          desc: [{
              required: true,
              message: 'Please enter a personal introduction',
              trigger: 'blur'
            },
            {
              type: 'string',
              min: 20,
              message: 'Introduce no less than 20 words',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    },
    components: {
      Title
    }
  }
</script>

<style>
</style>
