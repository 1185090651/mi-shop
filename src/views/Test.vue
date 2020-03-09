<template>
  <div>
    <van-collapse v-model="activeNames">
  <van-collapse-item name="1">
    <!-- <div slot="right-icon"></div> -->
  
  </van-collapse-item>
</van-collapse>
  </div>
</template>

<script>
    import { Toast } from 'vant';

export default {
  data() {
    return {
      activeNames: ['1']
    };
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
</style>