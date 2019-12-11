<template>
  <div class="card">
    <div class="card-top">
      <div>
        <span>{{title}}</span>
        <br />
        <count-to :start-val="0" :end-val="today" :duration="3000" class="card-panel-num" :decimals="decimals" />
      </div>
      <div>
        <img :src="icon" alt />
      </div>
    </div>
    <div class="card-bottom">
      昨天
      <count-to :start-val="0" :end-val="yesterday" :duration="3000" class="card-panel-num" :decimals="decimals" />
    </div>
  </div>
</template>
<script>
import CountTo from "vue-count-to";

export default {
  name: "StaticCard",
  props:{
      title:{
        type:String,
        default:""
      },
      today:{
        type:Number,
        default:0
      },
      yesterday:{
        type:Number,
        default:0
      },
      icon:{
        type:String,
        default:""
      },
      decimals:{
        type:Number,
        default:0
      },
  },
  components: {
    CountTo
  },
  created(){
  }
};
</script>
<style lang="scss" scoped>
.card {
  width: calc(100% - 16px);
  min-width: 260px;
  height: 128px;
  background: #fff;
  box-shadow: 0 0 32px 0 rgba(136, 152, 170, 0.15);
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .card-top {
    display: flex;
    justify-content: space-between;
    line-height: 1.5;
    font-size: 12px;
    color: #999;
    .card-panel-num {
      font-size: 24px;
      color: #000000;
    }
  }
}
</style>