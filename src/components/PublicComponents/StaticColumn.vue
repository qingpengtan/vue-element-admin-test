<template>
  <div class="static-data">
    <div class="icon">
      <img :src="icon" alt />
    </div>
    <div class="des">
      <div class="des-title">
        {{title}}
        <span>占用户比50%</span>
      </div>
      <div class="des-num">{{data}}</div>
    </div>
  </div>
</template>
<script>
import CountTo from "vue-count-to";

export default {
  name: "StaticCard",
  props: {
    title: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    data: {
      type: Number,
      default: 0
    }
  },
  components: {
    CountTo
  },
  created() {}
};
</script>
<style lang="scss" scoped>
.static-data {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 36px;
  .des {
    margin-left: 16px;
    .des-title {
      font-size: 14px;
      color: #999;
      margin-bottom: 8px;
    }
    .des-num {
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>