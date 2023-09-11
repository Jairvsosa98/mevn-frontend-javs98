<template>
  <q-page padding>
    <q-btn @click="userStore.access">Ingresar</q-btn>
    <q-btn @click="createLink">Crear Link</q-btn>
    <q-btn @click="userStore.logout">Cerrar Sesión</q-btn>
    {{ userStore.token }} - {{ userStore.expiresIn }}
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios';
import { userUserStore } from '../stores/user-store';

const userStore = userUserStore();

// userStore.refreshToken();

const createLink = async () => {
  try {
    const res = await api({
      method: 'POST',
      url: '/links',
      headers: {
        Authorization: 'Bearer ' + token.value
      },
      data: {
        longLink: 'https://bluuweb.github.io/desarrollo-web-bluuweb/21-04-mevn/#api-rest'
      }
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}

</script>
