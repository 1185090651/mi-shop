<template>
  <van-swipe :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(image, index) in images" :key="index">
      <!-- <img v-lazy="image" /> -->
      <van-image :src="image">
</van-image>
    </van-swipe-item>
    
  </van-swipe>
</template>


<script>
export default {
  data() {
    return {
       
      }
  },
  props: ["images"]
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
}
</style>



