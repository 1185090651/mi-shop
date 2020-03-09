<template>
  <div ref="bscroll_phone" class="bscroll_phone">
    <div>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
        <Swiper :images="images"></Swiper>
        <GoodsList :goodsList="goodsList"></GoodsList>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { request } from "@/network/request.js";
import { Toast } from "vant";
import Swiper from "@/components/Index/Swiper.vue";
import GoodsList from "@/components/Common/GoodsList.vue";
export default {
  data() {
    return {
      images: [
        "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/4b223e8d31a49b32e28bfc891df909f0.jpg?thumb=1&w=720&h=360",
        "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/af6a1aaf908b750bbeacd7e0d1945086.jpg?thumb=1&w=720&h=360",
        "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/68caca6f6cda76280dabe48ca92f23a7.jpg?thumb=1&w=720&h=360"
      ],
      goodsList: [],
      isLoading: false
    };
  },
  created() {
    this.getPhone();
  },
  mounted() {
    new BScroll(this.$refs.bscroll_phone, { click: true });
  },
  methods: {
    async getPhone() {
      const { data: res } = await request({
        url: "/index/recommand",
        method: "get"
      });
      if (res.meta.code !== 200) return Toast("获取商品列表失败");
      this.goodsList = res.data;
    },
    onRefresh() {
      setTimeout(() => {
        this.getPhone();
        Toast("刷新成功");
        this.isLoading = false;
      }, 1500);
    }
  },
  components: {
    Swiper,
    GoodsList
  }
};
</script>

<style lang="scss" scoped>
.bscroll_phone {
  height: 543px;
  overflow: hidden;
}
</style>