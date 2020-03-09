<template>
  <div ref="bscroll_book" class="bscroll_book">
    <div>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
        <GoodsList :goodsList="goodsList"></GoodsList>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { request } from "@/network/request.js";
import { Toast } from "vant";
import GoodsList from "@/components/Common/GoodsList.vue";
export default {
  data() {
    return {
      goodsList: [],
      isLoading: false
    };
  },
  created() {
    this.getPhone();
  },
  mounted() {
    new BScroll(this.$refs.bscroll_book, { click: true });
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
        Toast('刷新成功');
        this.isLoading = false;
      },1500)
    }
  },
  components: {
    GoodsList
  }
};
</script>

<style lang="scss" scoped>
.bscroll_book {
  height: 543px;
  overflow: hidden;
}
</style>