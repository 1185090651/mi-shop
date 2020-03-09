<template>
  <div class="index-container">
    <Header></Header>
    <Tabs></Tabs>
  </div>
</template>

<script>
import Header from '@/components/Index/Header.vue'
import Tabs from '@/components/Index/Tabs.vue'
export default {
  data() {
    return {
    }
  },
  components: {
    Header,Tabs
  }
};
</script>

<style lang="scss" scoped>
.index-container {
  
}
</style>