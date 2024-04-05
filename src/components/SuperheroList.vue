<template>
  <div>
    <q-list
      v-if="filteredHeroes.length > 0"
      bordered
      separator
      class="rounded-borders"
    >
      <q-item
        v-for="hero in filteredHeroes"
        :key="hero.id"
        clickable
        @click="goToHeroDetail(hero.id)"
      >
        <q-item-section avatar>
          <q-avatar>
            <img :src="hero.images.sm" :alt="hero.name" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ hero.name }}</q-item-label>
          <q-item-label caption>{{ hero.biography.fullName }}</q-item-label>
          <q-item-label caption>Sex: {{ hero.appearance.gender }}</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-btn
            flat
            :label="hero.biography.alignment"
            :color="getAlignmentColor(hero.biography.alignment)"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <div v-else class="text-center text-grey">Loading superheroes...</div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router"; // Import useRouter

export default {
  name: "SuperheroList",
  props: {
    alignment: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const heroes = ref([]);
    const router = useRouter(); // Use useRouter to access the router instance

    const fetchHeroes = async () => {
      try {
        const response = await axios.get(
          "https://akabab.github.io/superhero-api/api/all.json"
        );
        heroes.value = response.data;
      } catch (error) {
        console.error("Error fetching superheroes:", error);
      }
    };

    const filteredHeroes = computed(() => {
      return heroes.value.filter(
        (hero) => hero.biography.alignment === props.alignment
      );
    });

    const getAlignmentColor = (alignment) => {
      return alignment === "good" ? "green" : "red";
    };

    const goToHeroDetail = (heroId) => {
      router.push({ name: "hero-detail", params: { id: heroId } });
    };

    onMounted(fetchHeroes);

    return { filteredHeroes, getAlignmentColor, goToHeroDetail };
  },
};
</script>
