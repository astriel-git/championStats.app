<template>
  <q-page padding>
    <SuperheroList alignment="good" />
  </q-page>
</template>

<script>
import SuperheroList from "../components/SuperheroList.vue";

export default {
  name: "HeroesPage",
  components: {
    SuperheroList,
  },
};
</script>
