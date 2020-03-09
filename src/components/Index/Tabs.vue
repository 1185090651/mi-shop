<template>
  <div class="tab-container">
    <van-tabs
      v-model="active"
      swipeable
      color="#ff6700"
      title-active-color="#ff6700"
      background="#f2f2f2"
      line-height="2px"
    >
      <van-tab v-for="(item, index) in navList" :key="item.id" :title="item.nav_name" replace :to="item.nav_path" :name="index">
          <div class="van-hairline--top"></div>
            <router-view></router-view>
      </van-tab>
    </van-tabs>

    <div class="pointer" @click="changePointer">
      <div class="down" v-show="pointer"></div>
      <div class="up" v-show="!pointer"></div>
    </div>
    <div class="downmenu" v-show="!pointer">
        <div class="all">
            全部
        </div>
       <div class="category">
           <div v-for="(item,index) in navList" :key="item.id" @click="tabClick(index)" :class="index === active ? 'active': ''"><span>{{ item.nav_name }}</span></div>
       </div>
    </div>
  </div>
</template>

<script>
import { request } from '@/network/request.js'
import { Toast } from 'vant'
export default {
  data() {
    return {
      active: 0,
      activeNames: ["2"],
      pointer: true,
      navList: [],
    };
  },
  created() {
      this.getNavList()
  },
  mounted() {
  },
  methods: {
    // 请求导航列表
    async getNavList() {
        const { data: res } = await request({
            url: '/index/getlist',
            method: 'get'
        })
        if (res.meta.code !== 200) return Toast("获取列表失败")
        this.navList = res.data
    },
    // 下拉菜单的显示与隐藏
    changePointer() {
      this.pointer = !this.pointer;
    },
    // tab切换
    tabClick(index) {
        this.active = index
        this.$router.push(this.navList[index].nav_path)
    }
  }
};
</script>

<style lang="scss">
.tab-container {
  position: relative;
  .van-tabs__wrap--scrollable {
    height: 30px;

  }
  .van-tabs__line {
      z-index: 0;
  }
  .van-tab__text {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 400;
  }
  .van-cell {
    width: 30px;
    height: 30px;
    padding: 0;
    display: flex;
    align-items: center;
    background-color: #f2f2f2;
  }
  .pointer {
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    height: 30px;
    background-color: #f2f2f2;
    box-shadow: -15px 0 15px 0 #f2f2f2;
    z-index: 99;
  }
  .down,
  .up {
    display: block;
    width: 10px;
    height: 10px;
    border-right: 1px solid #888;
    border-top: 1px solid #888;
    // transform: rotate(135deg);
    transform: translateY(-50%);
  }
  .down {
    margin: 8px;
    transform: rotate(135deg);
  }
  .up {
    margin: 8px;
    transform: rotate(-45deg);
  }
  .downmenu {
      width: 100%;
      position: absolute;
      right: 0;
      top: 0;
        padding-left: 14px;
          background-color: #f2f2f2;
          color: rgba(0, 0, 0, .54);
            font-size: 14px;
      .all {
          height: 30px;
          line-height: 30px;
          padding-left: 10px;
      }
      .category {
      background-color: #f2f2f2;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      div {
          width: 80px;
          height: 30px;
          background-color: #fff;
          margin-right: 10px;
          margin-top: 6px;
          margin-bottom: 10px;
          line-height: 30px;
          border-radius: 4px;
          text-align: center;
      }
      .active {
          border: #ff6700 1px solid;
          color: #ff6700;
          background-color: #fde0d5;
      }
  }
  }
  
}
</style>