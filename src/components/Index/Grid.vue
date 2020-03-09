<template>
  <div class="grid-container">
    <img v-for="item in gridList" :key="item.id" :src="item.img_url" />
  </div>
</template>

<script>
export default {
  props: ["gridList"]
};
</script>

<style lang="scss" scoped>
    .grid-container {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        img {
            width: 75px;
            height: 79px;
        }
    }
</style>