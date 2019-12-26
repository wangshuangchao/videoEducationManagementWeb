<template>
  <div>
    <Title>
      <p>测试数据管理>测试用户管理>添加用户</p>
    </Title>

    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="用户名" prop="userName">
        <Input v-model="formValidate.userName" placeholder="请输入用户名"></Input>
      </FormItem>

      <FormItem label="密码" prop="passwd">
        <Input type="password" v-model="formValidate.passwd" placeholder="请输入密码"></Input>
      </FormItem>
      <FormItem label="确认密码" prop="passwdCheck">
        <Input type="password" v-model="formValidate.passwdCheck" placeholder="再次输入密码"></Input>
      </FormItem>

      <FormItem label="昵称" prop="nick">
        <Input v-model="formValidate.nick" placeholder="请输入昵称"></Input>
      </FormItem>

      <FormItem label="手机号" prop="cellPhone">
        <Input v-model="formValidate.cellPhone" placeholder="请输入手机号"></Input>
      </FormItem>

      <FormItem label="年龄" prop="age">
        <Input type="text" v-model="formValidate.age" number></Input>
      </FormItem>

      <FormItem label="生日">
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
          if (this.formValidate.passwdCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.formValidate.validateField('passwdCheck');
          }
          callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('Please enter your password again'));
        } else if (value !== this.formValidate.passwd) {
          callback(new Error('The two input passwords do not match!'));
        } else {
          callback();
        }
      };
      const validateAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('Age cannot be empty'));
        }
        // 模拟异步验证效果
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('Please enter a numeric value'));
          } else {
            if (value < 18) {
              callback(new Error('Must be over 18 years of age'));
            } else {
              callback();
            }
          }
        }, 1000);
      };

      return {
        formValidate: {
          userName: '',
          passwd: '',
          passwdCheck: '',
          nick: '',
          cellPhone: '',
          age: '',
          mail: '',
          city: '',
          gender: '',
          interest: [],
          date: '',
          time: '',
          desc: ''

        },

        ruleValidate: {
          userName: [{
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }],

          passwd: [{
              required: true,
              message: '密码不能为空',
              trigger: 'blur'
            },
            {
              validator: validatePass,
              trigger: 'blur'
            }
          ],
          passwdCheck: [{
              required: true,
              message: '请确认密码',
              trigger: 'blur'
            },
            {
              validator: validatePassCheck,
              trigger: 'blur'
            }
          ],

          nick: [{
            required: true,
            message: '昵称不能为空',
            trigger: 'blur'
          }],

          cellPhone: [{
            required: true,
            message: '手机号不能为空',
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
          ],

          age: [{
            validator: validateAge,
            trigger: 'blur'
          }]
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
      }
    },
    components: {
      Title
    },
    created() {
    }
  }
</script>

<style>
</style>
