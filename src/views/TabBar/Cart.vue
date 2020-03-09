<template>
    <div class="cart-container">
        <van-nav-bar title="购物车" left-arrow @click-left="goBack">
  <template slot="right">
      <span class="iconfont icon-sousuo"/>
  </template>
</van-nav-bar>
    </div>
</template>

<script>
    export default {
        methods: {
            goBack() {
                this.$router.back()
            }
        },
    }
</script>

<style lang="scss" scoped>
.cart-container {
    .van-nav-bar {
        background-color: #f2f2f2;
        .van-icon {
            color: #666;
        }
    }
}
</style>