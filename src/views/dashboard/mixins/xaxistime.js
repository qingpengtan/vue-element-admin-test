
export default {
  data() {
    return {
      xAxis: []
    }
  },
  mounted() {
    let hours = new Date().getHours();
    for (let i = 0; i <= hours; i++) {
        this.xAxis.push(i+'时');
    }

  },
  beforeDestroy() {
  },
  methods: {
  }
}
