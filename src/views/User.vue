<template>
  <div class="user-main">
    <van-nav-bar title="用户认证" left-arrow @click-left="goBack"></van-nav-bar>
    <div class="content">
      <van-tabs route v-model="active" animated color="#ff6700">
        <van-tab title="登录" replace to='/user/login' name="/user/login"></van-tab>
        <van-tab title="注册" replace to='/user/register' name="/user/register"></van-tab>
      </van-tabs>
      <div class="tab">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: this.$route.path
    }
  },
  methods: {
    goBack() {
      this.$router.back(); 
    }
  },
}
</script>

<style lang="scss" scoped>
  .user-main{
    .van-nav-bar {
    
        background-color: #f2f2f2;
        .van-icon {
            color: #666;
        }
        .van-nav-bar__title{
          color: #666;
          font-weight: 400;
        }
    }
    .content{
      padding: 0 20px;
      .tab{
        margin: 10px 20px
      }
    }
  }
</style>