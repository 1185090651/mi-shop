<template>
  <div>
    <header>
      <van-icon name="arrow-left" size="24px" color="#666" @click="goBack" />
      <keep-alive>
        <div class="head-center">
          <input type="text" placeholder="搜索商品名称" @change="goSearch" v-model="inpValue" class="inp"/>
        </div>
      </keep-alive>
      <div class="head-right">
        <van-icon name="search" size="24px" color="#666" />
      </div>
    </header>
    <van-dropdown-menu active-color="#ff6700" class="dropdowm">
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
      <div class="nav_bar">
        <div>价格</div>
        <div>筛选</div>
      </div>
    </van-dropdown-menu>
    <div ref="bscroll_search" class="bscroll_search">
      <main>
        <router-link
          class="item"
          v-for="(item,index) in goodsList"
          :key="index"
          :to="`/detail/${item.product_id}`"
        >
          <div class="left">
            <img :src="item.img_url" alt />
          </div>
          <div class="right">
            <div class="title">
              <span>{{item.detail_name}}</span>
            </div>
            <div class="van-multi-ellipsis--l2 detail" v-html="item.detail_con"></div>
            <div class="price">¥{{item.new_price}}</div>
            <div class="bottom">剩余{{item.commodity_stocks}}件</div>
          </div>
        </router-link>
      </main>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { request } from "@/network/request.js";
export default {
  data() {
    return {
      inpValue: "",
      value1: 0,
      value2: "a",
      option1: [
        { text: "综合排序", value: 0 },
        { text: "新款优先", value: 1 }
      ],
      option2: [
        { text: "销量排序", value: "a" },
        { text: "从多到少", value: "b" },
        { text: "从少到多", value: "c" }
      ],
      goodsList: []
    };
  },
  mounted() {
    new BScroll(this.$refs.bscroll_search, { click: true });
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    async goSearch() {
      const { data: res } = await request({
        url: "/index/search",
        method: "get",
        params: {
          inpValue: this.inpValue
        }
      });
      if (res.meta.code !== 200) return Toast("搜索失败");
      this.goodsList = res.data;
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  height: 44px;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  img {
    width: 24px;
  }
  .head-center {
    width: 240px;
    height: 30px;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 0 10px;
    color: #666;
  }
  .head-right {
    span {
      font-size: 20px;
    }
  }
}
.dropdowm {
  background-color: #f2f2f2;
}
.nav_bar {
  width: 46%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 15px;
}
.bscroll_search {
  height: 573px;
  overflow: hidden;
}
main {
  .item {
    height: 150px;
    border-bottom: 1px solid #d9d9d9;
    padding: 15px;
    display: flex;
    .left {
      img {
        width: 132px;
        height: 132px;
      }
    }
    .right {
      padding-left: 5px;
      .title {
        padding-top: 10px;
        font-size: 15px;
        color: #000;
      }
      .detail {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.54);
        padding-top: 10px;
      }
      .price {
        font-size: 20px;
        color: #ff6700;
        padding-top: 8px;
      }
      .bottom {
        color: rgba(0, 0, 0, 0.54);
        padding-top: 8px;
        display: flex;
        font-size: 12px;
        .right {
          padding-left: 20px;
        }
      }
    }
  }
}
.inp {
  width: 100%;
  height: 100%;
  border: none;
}
</style>