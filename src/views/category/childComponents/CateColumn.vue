<template>
  <div id="cate-column">
    <div v-for="(item,index) in goods" :key="index" class="cate-column-item">
      <a :href="item.link">
        <img :src="item.image" class="cate-column-img" alt />
      </a>
      <span>{{item.title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: null,
  },
};
</script>

<style scoped>
#cate-column {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
}
.cate-column-item {
  width: calc((100vw - 92px) / 3);
}
.cate-column-img {
  width: 85%;
}
</style>