<template>
  <q-page padding>
    <div v-if="hero" class="hero-card">
      <div class="col-4 col-md-4 col-lg-4">
        <q-card>
          <q-card-section>
            <div class="text-h6">{{ hero.name }}</div>
          </q-card-section>

          <q-card-section class="q-pa-none">
            <img
              :src="hero.images.sm"
              :alt="hero.name"
              class="responsive-image"
            />
          </q-card-section>

          <q-separator dark />

          <q-card-actions>
            <q-btn flat>Action 1</q-btn>
            <q-btn flat>Action 2</q-btn>
          </q-card-actions>

          <!-- Additional card sections or actions can be added here -->
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { fetchHeroDetails } from "src/utilities/heroApi";

export default {
  name: "HeroDetail",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      hero: null,
    };
  },
  async mounted() {
    try {
      this.hero = await fetchHeroDetails(this.id);
    } catch (error) {
      console.error("Error fetching hero details:", error);
    }
  },
};
</script>

<style>
.responsive-image {
  border-radius: 5%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
  margin: 10px;
  width: auto;
  height: auto;
  max-height: 300px; /* Adjust as needed */
}

.hero-card {
  display: flex;
  justify-content: left;
  align-items: center;
}
</style>
