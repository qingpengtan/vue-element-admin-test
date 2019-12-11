<template>
  <div>
    <div
      v-for="item of svgIcons"
      :key="item"
      @click="handleClipboard(generateIconCode(item),item,$event)"
    >
      <el-tooltip placement="top">
        <div slot="content">{{ generateIconCode(item) }}</div>
        <div class="icon-item">
          <svg-icon :icon-class="item" class-name="disabled" />
          <span>{{ item }}</span>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import clipboard from "@/utils/clipboard";
import svgIcons from "./svg-icons";

export default {
  name: "Icon",
  props: ["type"],
  data() {
    return {
      svgIcons,
    };
  },
  methods: {
    generateIconCode(symbol) {
      return `<svg-icon icon-class="${symbol}" />`;
    },
    handleClipboard(text, name, event) {
      if (this.type) {
        this.$emit("update:iconName", name);
        this.$emit("update:visible", false);
      } else {
        clipboard(text, event);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.icon-item {
  margin: 20px;
  height: 85px;
  text-align: center;
  width: 60px;
  float: left;
  font-size: 30px;
  color: #24292e;
  cursor: pointer;
}

span {
  display: block;
  font-size: 16px;
  margin-top: 10px;
}

.disabled {
  pointer-events: none;
}
</style>
