<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style lang="scss">
.el-table th.gutter {
  display: table-cell !important;
}
.el-dialog__wrapper {
  height: 100vh;
  overflow:hidden!important;
}
.el-dialog{
  position: absolute;
  left: 50%;
  margin-top: 0!important;
  top: 50% !important;
  transform: translate(-50%,-50%)
}

@media only screen and (max-width: 1200px) {
  .el-dialog {
    width: 80% !important;
  }
}
@media only screen and (max-width: 481px) {
  .el-dialog {
    margin: 0 !important;
    width: 100% !important;
  }
}
</style>