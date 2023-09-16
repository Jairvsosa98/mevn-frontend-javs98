<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          ShortCutURL by Javs98
        </q-toolbar-title>

        <q-btn-group push v-show="!userStore.token">
          <q-btn push color="positive" icon="login" @click="login"><q-tooltip>Log In</q-tooltip></q-btn>
          <q-btn push color="secondary" icon="person_add" @click="register"><q-tooltip>Register</q-tooltip></q-btn>
        </q-btn-group>

        <div class="q-pa-md q-gutter-sm" v-show="userStore.token">
          <q-btn push color="amber" icon="home" to="/">Inicio</q-btn>
          <q-btn push color="purple" to="/protected">Protected</q-btn>
          <q-btn push color="deep-orange" icon-right="logout" @click="logout">Log Out</q-btn>
        </div>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Essential Links
        </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useUserStore } from '../stores/user-store';
import { useRouter } from 'vue-router';
const userStore = useUserStore();
const leftDrawerOpen = ref(false);
const router = useRouter();

const login = async () => {
  router.push('/login');
}
const register = async () => {
  router.push('/register');
}

const logout = async () => {
  await userStore.logout();
  router.push('/login');
}


const essentialLinks = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];


function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
