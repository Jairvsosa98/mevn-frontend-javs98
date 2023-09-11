<template>
  <q-page padding>
    <q-btn @click="access">Ingresar</q-btn>
    <q-btn @click="createLink">Crear Link</q-btn>
    {{ token }} - {{ expiresIn }}
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios';
import { ref } from 'vue';

const token = ref('');
const expiresIn = ref('');

const access = async () => {
  try {
    const res = await api.post('/auth/login', {
      email: "jair@gmail.com",
      password: "123456"
    });

    token.value = res.data.token;
    expiresIn.value = res.data.expiresIn;
    setTime();
  } catch (error) {
    console.log(error);
  }
}
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

const setTime = () => {
  setTimeout(() => {
    refreshToken();
  }, expiresIn.value * 1000 - 6000);
}

const refreshToken = async () => {
  try {
    const res = await api.get('/auth/refresh');

    token.value = res.data.token;
    expiresIn.value = res.data.expiresIn;
    setTime();

  } catch (error) {
    console.log(error);
  }
}


refreshToken();

//USANDO THEN
// const access = () => {
//   console.log('Funciona!!!');
//   axios.post('http://localhost:9090/api/v1/auth/login', {
//     email: "jair@gmail.com",
//     password: "123456"
//   })
//     .then(res => {
//       console.log(res.data);
//     })
//     .catch(e => console.log(e));
// }

</script>
