<template>
  <div id="RedPaperChart" class="chart"></div>
</template>

<script>
import echarts from "echarts";
import resize from "@/components/Charts/mixins/resize";
import xaxistime from "@/views/dashboard/mixins/xaxistime";

export default {
  name: "RedPaperChart",
  mixins: [resize,xaxistime],
  props: {
    yAxis: {
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      chart: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById("RedPaperChart"));
      this.chart.setOption({
        title: {
          text: "今日零钱红包总金额实时统计"
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "5%",
          containLabel: false
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.xAxis
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "零钱红包总金额",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210],
            smooth: true
          }
        ]
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 484px;
  background: #fff;
  padding: 16px;
  box-shadow: 0 0 32px 0 rgba(136, 152, 170, 0.15);
  border-radius: 6px;
}
</style>