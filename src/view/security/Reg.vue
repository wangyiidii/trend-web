<template>
  <el-row>
    <el-col :span="8"
            :offset="8">
      <el-card class="box-card">
        <span style="font-size:30px">注册</span>
        <div style="margin-top:40px"></div>
        <el-form :label-position="labelPosition"
                 label-width="84px"
                 :rules="regRule">
          <el-form-item label="用户名"
                        prop="username">
            <el-input v-model="useraname"></el-input>
          </el-form-item>
          <el-form-item label="密码"
                        prop="password">
            <el-input v-model="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码"
                        prop="passwordConfirm">
            <el-input v-model="passwordConfirm"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="doClick">注册</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data () {
    return {
      labelPosition: 'right',
      useraname: '',
      password: '',
      passwordConfirm: '',
      regRule: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
        passwordConfirm: [{ required: true, message: '确认密码不能为空', trigger: 'blur' }]
      },
    };
  },

  methods: {
    doClick: function () {
      alert(this.useraname);
    }
  }
}
</script>
<style>
</style>