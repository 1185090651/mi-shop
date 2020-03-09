<template>
  <div>
    <div ref="bscroll_detail" class="bscroll_detail">
      <div>
        <div class="header">
          <div class="left" @click="goBack">
            <van-icon name="arrow-left" size="20px" />
          </div>
          <div class="right" @click="goProfile">
            <van-icon name="manager-o" size="20px" />
          </div>
        </div>
        <Swiper :images="detail.img_url"></Swiper>
        <div class="box">
          <div class="title">
            <span>{{ detail.detail_name }}</span>
          </div>
          <div class="detail">
            <span v-html="detail.detail_con"></span>
          </div>
          <div class="price">
            <div class="new">¥{{ detail.new_price }}</div>
            <div class="old">¥{{ detail.old_price }}</div>
          </div>
        </div>
        <Comments :comments="comments"></Comments>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" info="5" />
      <van-goods-action-icon icon="star-o" text="收藏"/>
      <van-goods-action-button type="warning" text="加入购物车" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import Comments from '@/components/Common/Comments.vue'
import BScroll from "better-scroll";
import Swiper from "@/components/Special/Swiper.vue";
import { request } from "@/network/request.js";
export default {
  data() {
    return {
      product_id: null,
      detail: {},
      comments: []
    };
  },
  created() {
    this.product_id = this.$route.params.id;
    this.getDetail();
    this.getComments()
  },
  mounted() {
    new BScroll(this.$refs.bscroll_detail, { click: true });
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    async getDetail() {
      const { data: res } = await request({
        url: "/index/detail",
        method: "get",
        params: { id: this.product_id }
      });
      if (res.meta.code !== 200) return Toast("获取详情失败");
      this.detail = res.data;
    },
    goProfile() {
      this.$router.push("/home/profile");
    },
    async getComments() {
      const { data: res } = await request({
        url: "/index/comments",
        method: "get",
      });
      console.log(res);
      if (res.meta.code !== 200) return Toast("获取评论失败");
      this.comments = res.data;
    },
  },
  components: {
    Swiper,Comments
  }
};
</script>

<style lang="scss" scoped>
.bscroll_detail {
  height: 627px;
  overflow: hidden;
}
.header {
  width: 100%;
  height: 44px;
  position: absolute;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  padding: 10px 10px;
  .left,
  .right {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.6);
    color: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.box {
  padding: 16px;
  padding-bottom: 0;
  .title {
    font-size: 24px;
    color: #3c3c3c;
  }
  .detail {
    line-height: 16px;
    padding-top: 6px;
    font-size: 13px;
    color: rgba(0, 0, 0, 0.54);
  }
  .price {
    display: flex;
    height: 40px;
    line-height: 40px;
    .new {
      font-size: 22px;
      color: #ff6700;
      letter-spacing: 1px;
    }
    .old {
      padding-left: 10px;
      font-size: 12px;
      text-decoration: line-through;
      color: rgba(0, 0, 0, 0.54);
    }
  }
}
</style>