<template>
  <div class="app-container">
    <div class="static-condition">
      <div class="title-light">截止昨日用户情况</div>
      <el-row>
        <el-col :xs="24" :sm="12" :lg="8" :xl="6">
          <static-column
            :title="'今日个人相册新增用户数'"
            :data="0"
            :icon="require('../../../assets/image/album/icon/icon_newusers.png')"
          ></static-column>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="8" :xl="6">
          <static-column
            :title="'今日公开相册新增用户数'"
            :data="0"
            :icon="require('../../../assets/image/album/icon/icon_newopen.png')"
          ></static-column>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="8" :xl="6">
          <static-column
            :title="'今日加密相册新增用户数'"
            :data="0"
            :icon="require('../../../assets/image/album/icon/icon_newencryption.png')"
          ></static-column>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="8" :xl="6">
          <static-column
            :title="'个人相册累计用户数'"
            :data="0"
            :icon="require('../../../assets/image/album/icon/icon_user.png')"
          ></static-column>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="8" :xl="6">
          <static-column
            :title="'公开相册累计用户数'"
            :data="0"
            :icon="require('../../../assets/image/album/icon/icon_open.png')"
          ></static-column>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="8" :xl="6">
          <static-column
            :title="'加密相册累计用户数'"
            :data="0"
            :icon="require('../../../assets/image/album/icon/icon_password.png')"
          ></static-column>
        </el-col>
      </el-row>
    </div>

    <div class="table-data">
      <div class="title">相册用户列表</div>
      <ul class="tab">
        <li class="active">公开相册用户</li>
        <li>私密相册用户</li>
      </ul>
      <search-area :queryParams.sync="queryParams" @search="search()" :queryItem="queryItem"></search-area>
      <div class="table">
        <el-table :data="dataList" border fit highlight-current-row>
          <el-table-column label="时间" align="center" prop="create_time"></el-table-column>
          <el-table-column label="用户手机号" align="center" prop="request_id"></el-table-column>
          <el-table-column label="上传图片总数（张）" align="center" prop="username"></el-table-column>
          <el-table-column label="上传视频总数（个）" align="center" prop="phone"></el-table-column>
          <el-table-column label="已使用容量（G）" align="center" prop="amount"></el-table-column>
        </el-table>
      </div>

      <div class="pagination" v-show="total>0">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="10"
          :current-page="currentPage"
          layout="total,sizes,prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import StaticColumn from "@/components/PublicComponents/StaticColumn.vue";
import SearchArea from "@/components/PublicComponents/SearchArea.vue";
import cashOutApi from "@/api/change/cashout";
import StringUtils from "@/utils/StringUtils";

export default {
  name: "AlbumUser",
  data() {
    return {
      queryParams: {
        phone: ""
      },
      queryItem: [
        { type: "input", column: "phone", placeholder: "用户手机号" }
      ],
      dataList: [], //表格数据
      total: 0, //总条数,
      currentPage: 1, //当前页,
      size: 10 //一页几条记录
    };
  },
  components: {
    StaticColumn,
    SearchArea
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: "info",
        1: "success",
        2: "warning",
        3: "danger"
      };
      return statusMap[status];
    },
    statusText(status) {
      const statusMap = {
        0: "处理中",
        1: "成功",
        2: "取消",
        3: "失败"
      };
      return statusMap[status];
    }
  },
  mounted() {
    this.getDataList();
  },
  methods: {
    handleSizeChange(size) {
      this.size = size;
      this.currentPage = 1;
      this.getDataList();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getDataList();
    },
    search() {
      this.currentPage = 1;
      this.getDataList();
    },
    userDetail(row) {
      this.$router.push({
        name: "UserDetail",
        params: {
          userId: row.id
        }
      });
    },
    getDataList() {
      cashOutApi
        .cashOutList({
          page: this.currentPage,
          page_size: this.size,
          ...this.queryParams
        })
        .then(res => {
          console.log(res);
          this.dataList = res.data.withdraw_list;
          this.total = res.data.total_size;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
ul,
li {
  padding: 0;
  margin: 0;
}
.app-container {
  // background: #e6e8ea;
  height: calc(100vh - 84px);
  overflow-y: scroll;

  .static-condition {
    background: #fff;
    border-radius: 6px;
    padding: 24px;
    box-shadow: 0 0 32px 0 rgba(136, 152, 170, 0.15);
    margin-bottom: 16px;
    padding-bottom: 1px;
  }

  .tab {
    font-size: 14px;
    color: #999;
    list-style: none;
    padding: 0 0 14px 0;
    background: #fff;
    padding-left: 22px;
    border-right: 1px solid #e7e7e7;
    border-left: 1px solid #e7e7e7;
    &:after {
      content: ".";
      height: 0;
      visibility: hidden;
      display: block;
      clear: both;
    }
    li {
      float: left;
      padding-bottom: 8px;
      cursor: pointer;
      & + li {
        margin-left: 24px;
      }
      &.active {
        color: #338cff;
        border-bottom: 2px solid #338cff;
      }
    }
  }

  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 22px;
    background: #fff;
    border: 1px solid #dfe6ec;
    border-bottom: none;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
  }
  .title-light {
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 22px;
  }
  .table-data {
    /deep/ .filter-container {
      padding-top: 0;
      border-top-width: 0;
    }
  }
  .table {
    background: #fff;
  }
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    padding: 22px;
    border: 1px solid #dfe6ec;
    border-top: none;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
}
</style>

