<template>
  <el-row>
    <el-col :span="8"
            :offset="8">
      <el-card class="box-card">
        <span style="font-size:30px">登陆</span>
        <div style="margin-top:40px"></div>
        <el-form :label-position="labelPosition"
                 label-width="84px"
                 :rules="loginRule"
                 :model="loginForm">
          <el-form-item label="用户名"
                        prop="username">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码"
                        prop="password">
            <el-input v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-button type="primary"
                     @click="_login">登陆</el-button>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>

import { login } from '@/api/auth/auth.js'

export default {
  data () {
    return {
      labelPosition: 'right',
      loginForm: {
        username: '',
        password: ''
      },
      loginRule: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
      },
    };
  },

  methods: {
    _login: function () {
      const params = { 'username': this.loginForm.username, 'password': this.loginForm.password }

      login(params).then(
        resp => {

        }
      ).catch(
        err => console.log(err)
      )
    },
  }
}
</script>
<style>
</style>