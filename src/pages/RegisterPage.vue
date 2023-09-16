<template>
    <q-page class="row justify-center">
        <div class="col-12 col-sm-6 col-md-5">
            <h3>Register</h3>
            <q-form @submit.prevent="handleSubmit">
                <q-input v-model="name" label="Nombres" type="text"></q-input>
                <q-input v-model="surname" label="Apellidos" type="text"></q-input>
                <q-input v-model="email" label="Email" type="text"
                    :rules="[(val) => (val && /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val)) || 'Formato Email Incorrecto']"></q-input>
                <q-input v-model="password" label="Password" type="password"
                    :rules="[(val) => (val && val.length > 5) || 'Contraseña mínimo 6 caracteres']"></q-input>
                <q-input v-model="repassword" label="Repita contraseña" type="password"
                    :rules="[(val) => (val && val === password) || 'Las contraseñas no coinciden']"></q-input>
                <div>
                    <q-btn label="Registrar" type="submit"></q-btn>
                </div>
            </q-form>
        </div>

    </q-page>
</template>

<script setup>
import { ref } from 'vue';

import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router';

import { useUserStore } from '../stores/user-store';

const $q = useQuasar()
const router = useRouter();

const userStore = useUserStore();

const name = ref('Santiago Damián');
const surname = ref('Villazón Rojas')
const email = ref('santi@gmail.com');
const password = ref('123456');
const repassword = ref('123456');

const handleSubmit = async () => {
    try {
        await userStore.register(name.value, surname.value, email.value, password.value, repassword.value);
        router.push('/');
        cleanForm();
    } catch (error) {
        console.log(error);
        alertDialogBack(error.message);
    }
}

const cleanForm = () => {
    name.value = '';
    surname.value = '';
    email.value = '';
    password.value = '';
    password.value = '';
}

const alertDialogBack = (message = 'Error en el servidor') => {
    $q.dialog({
        title: '¡Ha Ocurrido un error!',
        message
    });
}

</script>