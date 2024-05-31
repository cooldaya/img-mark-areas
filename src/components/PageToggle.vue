<template>
  <div class="page-toggle" v-scale-sync>
    <button @click.stop="togglePageHandle">Toggle Page</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const togglePageHandle = () => {
  const path = router.currentRoute.value.path;
  router.push(path === "/Page2" ? "/Page1" : "/Page2");
};
</script>

<style lang="less" scoped>
.page-toggle {
  position: fixed;

  bottom: 20px;
  right: 20px;
}
</style>
