<template>
  <div class="profile-container">
    <van-cell-group>
      <van-cell style="background-color: #f37d0f;color:#FFF;"
                label-class="labelClass"
                center>
        <template slot="title">
            <!-- 插槽 -->
          <!-- 已登录状态 -->
          <div class="personMsg"
          v-if="userinfo_token">
            <img class="iconImage"
              :src="user_image.login_icon" alt="">
            <div class="personInfo"
                 v-if="userinfo_token">
              <span>{{ $store.getters.showProfile.user.username }}</span>
              <span>手机号：{{ $store.getters.showProfile.user.mobile.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2") }}</span>
            </div>
          </div>
          <!-- 未登录状态 -->
          <div class="personMsg"
          v-if="!userinfo_token">
            <img class="iconImage"
              :src="user_image.noLogin_icon" alt="">
            <div class="personInfo"
              @click="login">
              <div>立即登录</div>
            </div>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 订单相关-->
    <van-cell-group>
      <van-cell title="我的订单"
                icon="label"
                value="查看全部订单"
                is-link
                >
      </van-cell>
      <van-grid :border=false>
        <van-grid-item v-for="(order,index) in orderData"
                       :key="index"
                       :icon="order.icon"
                       :text="order.title"
                        />
        <!-- <van-grid-item  /> -->
      </van-grid>
    </van-cell-group>
    <van-cell-group style="margin-top:6.4px">
      <van-cell title="我的优惠券"
                icon="gold-coin"
                is-link />
      <van-cell title="我的收货地址"
                icon="todo-list"
                is-link
                 />
    </van-cell-group>

    <van-cell-group style="margin-top:6.4px">
      <van-cell is-link
                icon="vip-card"
                >
        <template slot="title">
          <span class="custom-title">小米之家</span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group style="margin-top:6.4px">
      <van-cell title="联系客服"
                icon="phone"
                value="客服时间 07:00-22:00"
                is-link />
      <van-cell title="意见反馈"
                icon="comment-circle"
                is-link
                 />
    </van-cell-group>
     <van-cell-group style="margin-top:6.4px">
      <van-cell is-link
                icon="setting"
                >
        <template slot="title">
          <span class="custom-title">设置</span>
        </template>
      </van-cell>
    </van-cell-group>
    <div class="version">当前版本1.0.0</div>
    <!--路由的出口-->
    <transition name="router-slider"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 头像
      user_image: {
        login_icon: require('../../assets/login.jpeg'),
        noLogin_icon: require('../../assets/no_login.png'),
      },
      // 订单状态
      orderData: [
        { icon: 'cart-circle-o', title: '待支付' },
        { icon: 'gift-o', title: '待收货' },
        { icon: 'smile-comment-o', title: '待评价' },
        { icon: 'cash-back-record', title: '售后/退款' }
      ],
      userinfo_token:'',
      username: '',
      mobile: ''
    }
  },
  created() {
    this.userinfo_token = localStorage.getItem('token')
  },
  methods: {
    //跳转到登录页面
    login(){
      this.$router.push('/user')
    }
  },
}
</script>

<style lang="scss" scoped>
  .profile-container{
    width: 100%;
    background-color: #f5f5f5;
    margin-bottom: 48px;
  }
  img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
  .personMsg{
    display: flex;
    align-items: center;
    .iconImage {
        width: 50px;
        height: 50px;
    }
  }
  .personInfo {
      display: flex;
      flex-direction: column;
      margin-left: 12.8px;
    }
    .version {
    margin: 0 auto;
    text-align: center;
    font-size: 12.8px;
    background-color: #ffffff;
    height: 32px;
    color: grey;
    line-height: 32px;
  }
  .van-cell--center {
      height: 80px;
  }
  .van-cell__left-icon {
    color: #f37d0f;
    font-size: 24px;
  }
  .van-grid-item {
    width: 93px;
  }
  .van-cell__title {
    padding-left: 12px;
  }
</style>