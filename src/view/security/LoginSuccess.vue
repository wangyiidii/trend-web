<template>
  <el-container>
    <el-header>告警</el-header>
    <el-col :span="4"
            :offset="10">
      <el-button type="primary"
                 size="medium"
                 @click="getEvent">查询告警</el-button>
    </el-col>

    <el-main>
      <el-table style="width: 100%">
        <el-table-column prop="level"
                         label="级别">
        </el-table-column>
        <el-table-column prop="eventDesc"
                         label="描述">
        </el-table-column>
        <el-table-column prop="eventSource"
                         label="告警源">
        </el-table-column>
        <el-table-column prop="times"
                         label="次数">
        </el-table-column>
        <el-table-column prop="updateTime"
                         label="最新时间">
        </el-table-column>
        <el-table-column prop="lastTime"
                         label="告警历时">
        </el-table-column>
        <el-table-column prop="ip"
                         label="IP">
        </el-table-column>
        <el-table-column prop="label"
                         label="标签">
        </el-table-column>
        <el-table-column prop="ackUser"
                         label="确认人">
        </el-table-column>
      </el-table>
    </el-main>
    <el-footer>
      <el-link type="primary"
               href="https://yiidii.cn">YiiDii</el-link> <span style="color:#909399">©2020</span>
    </el-footer>
  </el-container>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    getEvent: function () {

      this.axios.post('http://192.168.2.219/apiservices/events?keyword=&isTreated=false&includeSyslog=true&start=0&pageSize=30&labelIds=')
        .then(resp => {
          var data = resp.data;
          if (data.success) {
            this.$message.success(data.msg)
            this.$router.push('LoginSuccess');
            console.log(JSON.stringify(data))
          } else {
            this.$message.error(data.msg)
          }
        }).catch(err => {
          // console.log(err);
        })
    }
  }
}
</script>
<style>
</style>
