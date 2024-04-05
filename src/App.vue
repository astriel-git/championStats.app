<template>
  <router-view :key="$route.fullPath"></router-view>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>
