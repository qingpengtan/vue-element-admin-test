<template>
  <div class="filter-container">
    <span v-for="item in querySearch" :key="item.column" class="in-search">
      <el-input
        v-if="item.type=='input'"
        v-model="queryParams[item.column]"
        :placeholder="item.placeholder"
        style="width: 200px;"
        class="filter-item"
      />
      <el-select
        v-else-if="item.type=='select'"
        v-model="queryParams[item.column]"
        :placeholder="item.placeholder"
        clearable
        style="width: 200px;"
        class="filter-item"
      >
        <el-option v-for="val in item.option" :key="val.key" :value="val.key" :label="val.value" />
      </el-select>
    </span>
    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
    <el-button
      class="filter-item"
      style="margin-left: 10px;"
      type="primary"
      icon="el-icon-edit"
      v-if="isAdd"
      @click="add()"
    >新增</el-button>
  </div>
</template>

<script>
export default {
  name: "SearchArea",
  props: {
    queryItem: {
      type: Array,
      default: []
    },
    isAdd: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      querySearch: [],
      queryParams: {}
    };
  },
  watch: {
    queryItem: {
      handler: function(val, oldval) {
        if (val) {
          for (let item in val) {
            if (item.column) {
              this.queryParams[item.column] = "";
            }
          }
          this.querySearch = this.queryItem;
        }
      },
      immediate: true, //关键
      deep: true
    }
  },
  methods: {
    search() {
      this.$emit("update:queryParams", this.queryParams);
      this.$emit("search", this.queryParams);
    },
    add() {
      this.$emit("add");
    }
  }
};
</script>

<style lang="scss" scoped>
.filter-container {
  background: #fff;
  padding: 16px;
  padding-bottom: 8px;
  border: 1px solid #dfe6ec;
  border-bottom-width: 0;
  // border-radius: 6px;
  // box-shadow: 0 0 32px 0 rgba(136, 152, 170, 0.15);
}
.in-search {
  display: inline-block;
  padding-right: 10px;
}
</style>