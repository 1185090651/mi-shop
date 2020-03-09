<template>
  <div class="signin">
    <van-form validate-first ref="regForm">
      <!-- 用户名 -->
      <van-field
        v-model="regObj.username"
        clearable
        label="用户名"
        maxlength="10"
        placeholder="3-10个字符"
        required
        :rules="[{ required: true,message: '用户名不能为空' }, { validator: verifyUsername ,message: '用户名长度应为3-10个字符' }]"
      />
      <!-- 手机号 -->
      <van-field
        v-model="regObj.mobile"
        clearable
        label="手机号"
        maxlength="11"
        placeholder="手机号"
        required
        :rules="[{ required: true,message: '手机号不能为空' }, { validator:verifyMobile,message:'手机号格式不正确' }]"
      />
      <van-field
        v-model="regObj.email"
        clearable
        label="邮箱"
        placeholder="邮箱"
        required
        :rules="[{required: true,message: '邮箱不能为空'}, {validater:verifyEmail,message: 'email格式不正确'}]"
      />
      <!-- 密码 -->
      <van-field
        v-model="regObj.password"
        type="password"
        label="密码"
        placeholder="密码"
        required
        :rules="[{required: true,message: '密码不能为空'}, {validator: verifyPassword ,message: '密码长度应为6-15个字符'}]"
      />
      <!-- 确认密码 -->
      <van-field
        v-model="passwordSure"
        type="password"
        label="确认密码"
        placeholder="两次密码保持一致"
        required
        :rules="[{ validator:passwordSame, message: '两次密码不一致' }]"
      />
      <van-button
        type="default"
        style="background-color:#ff6700;color:#fff"
        block
        @click="register"
      >注册</van-button>
    </van-form>
  </div>
</template>

<script>
import { request } from "@/network/request.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      regObj: {
        username: "",
        mobile: "",
        email: "",
        password: ""
      },
      passwordSure: ""
    };
  },
  methods: {
    // 验证用户名
    verifyUsername(val) {
      if (val.length > 2 && val.length < 11) {
        return true;
      }
      return false;
    },
    // 验证手机号
    verifyMobile(val) {
      return /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(
        val
      );
    },
    // 验证邮箱
    verifyEmail(val) {
      console.log(111);
      return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
        val
      );
    },
    // 验证密码
    verifyPassword(val) {
      if (val.length > 5 && val.length < 16) {
        return true;
      }
      return false;
    },
    // 验证密码是否一致
    passwordSame(val) {
      if (val !== this.regObj.password) {
        return false;
      }
      return true;
    },
    register() {
      this.$refs.regForm
        .validate()
        .then(async () => {
          const { data: res } = await request({
            url: "/user/register",
            method: "post",
            data: this.regObj
          });
          if (res.meta.code !== 200){
            return Toast({
              message: "该用户已存在",
              duration: 800
            });
          }
          Toast({
              message: "注册成功",
              duration: 800
            });
            localStorage.setItem('token', res.data.user_token);
            this.$store.commit('saveProfile', res.data)
            // 通过编程式导航调转到主页，路由地址是home
            this.$router.push('/home/profile')
        })
        .catch(() => {
          return;
        });
    }
  }
};
</script>

<style>
</style>