<template>
  <q-page padding>
    <add-link class="q-mb-xl" />
    <template v-for="link in useLink.links" :key="link._id">
      <ListLinks :link="link" />
    </template>
  </q-page>
</template>

<script setup>

//components
import AddLink from 'src/components/AddLink.vue';
import ListLinks from 'src/components/ListLinks.vue';


import { useLinkStore } from '../stores/link.store';

const useLink = useLinkStore();

useLink.getLinks();
</script>
