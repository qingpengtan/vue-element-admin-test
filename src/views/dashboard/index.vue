<template>
  <div class="app-container">
    <el-row>
      <el-col :xs="24" :sm="12" :lg="6" :xl="4">
        <static-card
          :title="'新增注册人数'"
          :today="resultData.today.new_user"
          :yesterday="resultData.yesterday.new_user"
          :icon="require('../../assets/image/datacenter/icon/icon_newusers.png')"
          :decimals="0"
        ></static-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" :xl="4">
        <static-card
          :title="'零钱充值金额'"
          :today="resultData.today.recharge"
          :yesterday="resultData.yesterday.recharge"
          :icon="require('../../assets/image/datacenter/icon/icon_chong.png')"
          :decimals="2"
        ></static-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" :xl="4">
        <static-card
          :title="'零钱提现金额'"
          :today="resultData.today.sucess_withdraw"
          :yesterday="resultData.yesterday.sucess_withdraw"
          :icon="require('../../assets/image/datacenter/icon/icon_tixian.png')"
          :decimals="2"
        ></static-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" :xl="4">
        <static-card
          :title="'零钱提现失败金额'"
          :today="resultData.today.fail_withdraw"
          :yesterday="resultData.yesterday.fail_withdraw"
          :icon="require('../../assets/image/datacenter/icon/icon_tixianshibai.png')"
          :decimals="2"
        ></static-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" :xl="4">
        <static-card
          :title="'零钱资金池'"
          :today="resultData.today.pond"
          :yesterday="resultData.yesterday.pond"
          :icon="require('../../assets/image/datacenter/icon/icon_pool.png')"
          :decimals="2"
        ></static-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6" :xl="4">
        <static-card
          :title="'零钱收益'"
          :today="resultData.today.earnings"
          :yesterday="resultData.yesterday.earnings"
          :icon="require('../../assets/image/datacenter/icon/icon_profit.png')"
          :decimals="2"
        ></static-card>
      </el-col>
    </el-row>
    <regist-chart class="chart-com" :yAxis="[]"></regist-chart>
    <money-chart class="chart-com" :recharge="resultData.recharge" :withdraw="resultData.withdraw"></money-chart>
    <red-paper-chart class="chart-com" :yAxis="resultData.packet"></red-paper-chart>
  </div>
</template>

<script>
import StaticCard from "@/views/dashboard/components/StaticCard.vue";
import RegistChart from "@/views/dashboard/components/RegistChart.vue";
import MoneyChart from "@/views/dashboard/components/MoneyChart.vue";
import RedPaperChart from "@/views/dashboard/components/RedPaperChart.vue";
import staticApi from "@/api/real-time-static";

export default {
  name: "Dashboard",
  data() {
    return {
      resultData: {
        today: {
          recharge: 0,
          earnings: 0,
          fail_withdraw: 0,
          pond: 0,
          sucess_withdraw: 0
        },
        yesterday: {
          recharge: 0,
          earnings: 0,
          fail_withdraw: 0,
          pond: 0,
          sucess_withdraw: 0
        }
      }
    };
  },
  components: {
    StaticCard,
    RegistChart,
    MoneyChart,
    RedPaperChart
  },
  mounted() {
    staticApi.realTimeStatic().then(res => {
      for (let item in res.data.today) {
        res.data.today[item] = parseFloat(res.data.today[item]);
      }
      for (let item in res.data.yesterday) {
        res.data.yesterday[item] = parseFloat(res.data.yesterday[item]);
      }
      this.resultData = res.data;
    });
  }
};
</script>
<style lang="scss" scoped>
.app-container {
  // background: #e6e8ea;
  height: calc(100vh - 84px);
  overflow-y: scroll;
  .chart-com {
    margin-bottom: 16px;
  }
  // /deep/ .el-row .el-col{
  //   margin-right: 16px;
  // }
}
</style>

