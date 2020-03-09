<template>
  <div class="main">
    <router-view />
    <van-tabbar active-color="#ff6700" inactive-color="#999" route>
      <van-tabbar-item v-for="(item,index) in TabBarName" :key="index" replace :to="item.path" :name="item.name">
        <span>{{item.name}}</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? TabBarIcon[index].active : TabBarIcon[index].inactive"
        />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 导航栏的名称
      TabBarName: [
        { name: "首页", path: "/home/index/recommand" },
        { name: "分类", path: "/home/category" },
        { name: "购物车", path: "/home/cart" },
        { name: "我的", path: "/home/profile" }
      ],
      // 导航栏图标
      TabBarIcon: [
        {
          active: require("@/assets/TabBar/home-selected.png"),
          inactive: require("@/assets/TabBar/home.png")
        },
        {
          active: require("@/assets/TabBar/category-selected.png"),
          inactive: require("@/assets/TabBar/category.png")
        },
        {
          active: require("@/assets/TabBar/cart-selected.png"),
          inactive: require("@/assets/TabBar/cart.png")
        },
        {
          active: require("@/assets/TabBar/user-selected.png"),
          inactive: require("@/assets/TabBar/user.png")
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.van-tabbar-item__icon img {
  height: 20px;
}
</style>