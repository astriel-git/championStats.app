<template>
  <q-page class="flex flex-center q-pa-md">
    <div class="cards-container">
      <div v-for="hero in paginatedHeroes" :key="hero.id" class="card">
        <hero-card :hero="hero" />
      </div>
      <q-pagination
        v-model="currentPage"
        :max="maxPages"
        :max-pages="8"
        class="q-mt-md"
        color="primary"
        boundary-numbers
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed, watch, inject } from "vue";
import HeroCard from "../components/HeroCard.vue";
import { fetchHeroes } from "../utilities/heroApi";

export default defineComponent({
  components: {
    HeroCard,
  },
  setup() {
    const heroes = ref([]);
    const currentPage = ref(1);
    const pageSize = ref(12);
    const showOnlyVillains = inject("showOnlyVillains");
    const showOnlyHeroes = inject("showOnlyHeroes");

    // Load heroes initially and whenever the filters change
    const loadHeroes = async () => {
      const fetchedHeroes = await fetchHeroes();
      heroes.value = fetchedHeroes;
    };

    // Reset currentPage when toggles change and potentially reload heroes
    watch([showOnlyHeroes, showOnlyVillains], () => {
      currentPage.value = 1;
      // If you need to reload heroes based on toggles, uncomment below:
      // loadHeroes();
    });

    const filteredHeroes = computed(() => {
      let filtered = heroes.value;
      if (showOnlyHeroes.value) {
        filtered = filtered.filter(
          (hero) => hero.biography.alignment === "good"
        );
      } else if (showOnlyVillains.value) {
        filtered = filtered.filter(
          (hero) => hero.biography.alignment === "bad"
        );
      }
      return filtered;
    });

    const paginatedHeroes = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value;
      return filteredHeroes.value.slice(start, start + pageSize.value);
    });

    const maxPages = computed(() =>
      Math.ceil(filteredHeroes.value.length / pageSize.value)
    );

    onMounted(loadHeroes);

    return {
      currentPage,
      pageSize,
      paginatedHeroes,
      maxPages,
    };
  },
});
</script>
