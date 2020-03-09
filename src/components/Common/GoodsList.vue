<template>
  <div class="goods_list">
    <router-link class="goods_item" v-for="(item,index) in goodsList" :key="index" :to="`/detail/${item.product_id}`">
      <div class="img_box">
        <img :src="item.img_url" alt />
      </div>
      <div class="item_box">
        <div class="title">
          <span>{{item.category_name}}</span>
        </div>
        <div class="price">
          <span>¥ {{item.new_price}} 元起</span>
        </div>
        <div class="btn">立即购买</div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { request } from "@/network/request.js";
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
  props: ["goodsList"]
};
</script>

<style lang="scss" scoped>
.goods_list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .goods_item {
    padding-left: 5px;
    width: 33%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    .img_box {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f2f2f2;
        padding: 20px 0;
        img {
            width: 70%;
        }
    } 
    .item_box {
        height: 115px;
        padding: 10px 0;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        .title {
        color: rgba(0,0,0,.87);
        font-size: 14px;
        }
        .price {
            font-size: 12px;
            color: #ea625b;
            padding: 5px 0;
        }
        .btn {
            margin: 5px 0;
            width: 60px;
            height: 30px;
            font-size: 12px;
            background-color: #ea625b;
            line-height: 30px;
            color: #fff;
            border-radius: 4px;
        }
    }
    
  }
}
</style>