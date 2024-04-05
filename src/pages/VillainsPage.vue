<template>
  <q-page padding>
    <SuperheroList alignment="bad" />
  </q-page>
</template>

<script>
import SuperheroList from "../components/SuperheroList.vue";

export default {
  name: "VillainsPage",
  components: {
    SuperheroList,
  },
};
</script>
