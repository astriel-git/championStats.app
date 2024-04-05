<template>
  <div class="card" @click="flipCard">
    <!-- Front of the card -->
    <div v-if="!flipped" class="card-inner">
      <q-card class="q-ma-md front">
        <img :src="hero.images.md" class="full-width" />
      </q-card>
    </div>
    <!-- Back of the card -->
    <div v-else class="card-inner">
      <q-card class="q-ma-md back">
        <div v-if="isLoadingDetails"></div>
        <div v-else>
          <div>
            <b>{{ heroDetails.name }}</b>
          </div>
          <div v-if="heroDetails.biography.alignment === `good`">
            Alignment: <q-icon name="thumb_up" color="blue" />
          </div>
          <div v-else>
            Alignment: <q-icon name="thumb_down" color="negative" />
          </div>
          <ls>
            <li :class="{ highlight: highestStat === 'intelligence' }">
              Intelligence: {{ heroDetails.powerstats.intelligence }}
            </li>
            <li :class="{ highlight: highestStat === 'speed' }">
              Speed: {{ heroDetails.powerstats.speed }}
            </li>
            <li :class="{ highlight: highestStat === 'strength' }">
              Strength: {{ heroDetails.powerstats.strength }}
            </li>
            <li :class="{ highlight: highestStat === 'durability' }">
              Durability: {{ heroDetails.powerstats.durability }}
            </li>
            <li :class="{ highlight: highestStat === 'power' }">
              Power: {{ heroDetails.powerstats.power }}
            </li>
            <li :class="{ highlight: highestStat === 'combat' }">
              Combat: {{ heroDetails.powerstats.combat }}
            </li>
          </ls>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import { fetchHeroDetails } from "../utilities/heroApi"; // Ensure path is correct

export default {
  props: {
    hero: Object,
  },
  data() {
    return {
      flipped: false,
      heroDetails: null,
      isLoadingDetails: false, // New loading state
    };
  },

  methods: {
    async flipCard() {
      this.flipped = !this.flipped;

      if (this.flipped && !this.heroDetails && !this.isLoadingDetails) {
        this.isLoadingDetails = true; // Indicate loading begins
        try {
          this.heroDetails = await fetchHeroDetails(this.hero.id);
        } catch (error) {
          console.error("Error fetching hero details:", error);
        } finally {
          this.isLoadingDetails = false; // Indicate loading is complete
        }
      }
    },
  },

  computed: {
    highestStat() {
      if (!this.heroDetails || !this.heroDetails.powerstats) return "";

      const stats = this.heroDetails.powerstats;
      const maxStat = Object.keys(stats).reduce(
        (max, key) => (stats[max] > stats[key] ? max : key),
        "intelligence"
      );

      return maxStat;
    },
  },
};
</script>

<style scoped>
.highlight {
  font-weight: bold;
  color: rgb(89, 0, 255); /* Customize the color based on your design */
}
.card {
  perspective: 1000px;
  cursor: pointer;
  width: 200px; /* Adjust based on your design */
  height: 300px; /* Adjust based on your design */
}

.front,
.back {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.front {
  /* The front does not need to be rotated initially */
  z-index: 2; /* Ensures the front is above the back initially */
}

.full-width {
  width: 100%;
  height: auto; /* Maintain aspect ratio */
}
</style>

<style>
.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; /* This spreads the cards evenly */
}

.card {
  margin: 0.5rem;
  flex: 0 0 auto; /* Prevent cards from growing or shrinking */
  cursor: pointer;
}
</style>
