<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-black">
        <q-toolbar-title> Champion Stats </q-toolbar-title>

        <div><b>Powered by:</b> Chinese Labor</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Main Menu </q-item-label>

        <!-- Existing links -->
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />

        <!-- Toggles for filtering -->
        <q-item>
          <q-item-section>
            <q-toggle v-model="showOnlyHeroes" label="Only Heroes" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-toggle v-model="showOnlyVillains" label="Only Villains" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, provide } from "vue";
import EssentialLink from "components/EssentialLink.vue";

export default defineComponent({
  name: "MainLayout",
  components: { EssentialLink },
  setup() {
    const showOnlyVillains = ref(false);
    const showOnlyHeroes = ref(false);

    // Provide the toggle states to the entire app
    provide("showOnlyVillains", showOnlyVillains);
    provide("showOnlyHeroes", showOnlyHeroes);

    return {
      showOnlyVillains,
      showOnlyHeroes,
    };
  },
});
</script>
