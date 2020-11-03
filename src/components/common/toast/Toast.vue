!<template>
  <div class="toast">{{message}}</div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 17px;
  height: 40px;
  width: 270px;
  text-align: center;
  line-height: 40px;
  color: pink;
  background-color: rgba(0, 0, 0, 0.7);
  font-size: 22px;
}
</style>