<template>
  <div ref="bscroll" class="bscroll">
    <div>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
        <Swiper :images="images"></Swiper>
        <Grid :gridList="gridList"></Grid>
        <van-image src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/e32eea5c3c27062019f9ac6434b351df.jpg?thumb=1&w=720&h=440" type="contain"  />
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
import Grid from "@/components/Index/Grid.vue";
import GoodsList from "@/components/Common/GoodsList.vue";
export default {
  data() {
    return {
      images: [
        "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/feb9b9dcc3965a3bf261e403f09273af.jpg?thumb=1&w=720&h=360",
        "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e3dfdd756960da0413de7517e14f748b.jpg?thumb=1&w=720&h=360",
        "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/8ab01cce3c45907bebb8df28086ac3ca.jpg?thumb=1&w=720&h=360"
      ],
      gridList: [],
      goodsList: [],
      isLoading: false
    };
  },
  created() {
    this.getGridList();
    this.getRecommand();
  },
  mounted() {
    new BScroll(this.$refs.bscroll, { click: true });
  },
  methods: {
    async getGridList() {
      const { data: res } = await request({
        url: "/index/getgrid",
        method: "get"
      });
      if (res.meta.code !== 200) return Toast("获取宫格失败");
      this.gridList = res.data;
    },
    async getRecommand() {
      const { data: res } = await request({
        url: "/index/recommand",
        method: "get"
      });
      if (res.meta.code !== 200) return Toast("获取商品列表失败");
      this.goodsList = res.data;
    },
    onRefresh() {
      setTimeout(() => {
        this.getRecommand();
        Toast('刷新成功');
        this.isLoading = false;
      },1500)
    }
  },
  components: {
    Swiper,
    Grid,
    GoodsList
  }
};
</script>

<style lang="scss" scoped>
.bscroll {
  height: 543px;
  overflow: hidden;
}
</style>