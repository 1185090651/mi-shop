<template>
  <div class="category-container">
    <van-sticky>
      <van-nav-bar title="分类" left-arrow @click-left="goBack">
        <template slot="right">
          <span class="iconfont icon-sousuo" />
        </template>
      </van-nav-bar>
    </van-sticky>
    <div class="main">
      <div ref="main" class="xmain">
          <van-sidebar v-model="activeKey" @change="change">
        <van-sidebar-item v-for="item in cateFirstList" :key="item.id" :title="item.category_name" />
      </van-sidebar>
      </div>
      <div class="right" ref="right">
        <div>
            <div class="content" v-for="item in cateSecondList" :key="item.id">
          <div class="item">
            <span>{{item.category_name}}</span>
          </div>
          <van-grid :column-num="3" :border="false">
            <van-grid-item v-for="i in item.children" :key="i.id" :text="i.category_name" replace :to="`/detail/${i.product_id}`">
                <img :src="i.img_url" slot="icon"/>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
        </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { request } from "@/network/request.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      activeKey: 0,
      cateFirstList: [],
      cateSecondList: [],
      scroll: null
    };
  },
  created() {
    this.getFirstCate();
    this.getSecondCate();
  },
  mounted() {
    new BScroll(this.$refs.main, {click:true})
    new BScroll(this.$refs.right, {click:true})
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    change() {
      this.getSecondCate();
    },
    async getFirstCate() {
      const { data: res } = await request({
        url: "/nocate/getfirst",
        method: "get"
      });
      if (res.meta.code !== 200) {
        return Toast("获取一级分类列表失败");
      }
      this.cateFirstList = res.data;
    },
    async getSecondCate() {
      const { data: res } = await request({
        url: `/nocate/getsecond/${this.activeKey}`,
        method: "get"
      });
      if (res.meta.code !== 200) {
        return Toast("获取一级分类列表失败");
      }
      this.cateSecondList = res.data;
    }
  }
};
</script>

<style lang="scss" scoped>
.category-container {
  .van-nav-bar {
    background-color: #f2f2f2;
    .van-icon {
      color: #666;
    }
  }
  
  .van-sidebar-item {
    height: 52px;
    text-align: center;
    font-weight: 400;
    color: rgba(0, 0, 0, .54);
  }
  .van-sidebar-item--select {
    border: none;
    color: #ff6700;
    font-size: 16px;
  }
  .main {
    display: flex;
    height: 571px;
    .xmain{
        overflow: hidden;
    }
    .right {
    height: 571px;
    overflow: hidden;
      flex: 1;
      .content {
        display: flex;
        flex-direction: column;
        padding-bottom: 50px;
        .item {
          text-align: center;
          width: 100%;
          height: 80px;
          line-height: 80px;
          font-weight: 400;
          font-size: 15px;
          span {
            position: relative;
          }
          span:before {
            content: "";
            position: absolute;
            top: 50%;
            left: 0;
            width: 22px;
            border-top: 1px solid #e0e0e0;
            transform: translate3d(-150%, -50%, 0);
            -webkit-transform: translate3d(-150%, -50%, 0);
          }
          span:after {
            content: "";
            position: absolute;
            top: 50%;
            border-top: 1px solid #e0e0e0;
            right: 0;
            width: 22px;
            transform: translate3d(150%, -50%, 0);
            -webkit-transform: translate3d(150%, -50%, 0);
          }
        }
        .van-grid-item__content--center {
            text-align: center;
            img {
                width: 52px;
                height: 52px;
            }
        }
      }
    }
  }
}
</style>