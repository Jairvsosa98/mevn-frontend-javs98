<template>
    <q-page class="row justify-center">
        <div class="col-12 col-sm-6 col-md-5">
            <h3>Login</h3>
            <q-form @submit.prevent="handleSubmit" ref="loginForm">
                <q-input v-model="email" label="Email" type="text" autocomplete="username"
                    :rules="[(val) => (val && /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val)) || 'Formato Email Incorrecto']"
                    lazy-rules></q-input>
                <q-input v-model="password" label="Password" type="password" autocomplete="current-password"
                    :rules="[(val) => (val && val.length > 5) || 'Contraseña mínimo 6 caracteres']" lazy-rules></q-input>
                <div>
                    <q-btn label="login" type="submit"></q-btn>
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
const loginForm = ref(null);
const email = ref('');
const password = ref('');

const handleSubmit = async () => {
    try {
        await userStore.access(email.value, password.value);
        router.push('/');

    } catch (error) {
        alertDialogBack(error.message);
    } finally {
        loginForm.value.resetValidation();
        email.value = '';
        password.value = '';
    }
}

const alertDialogBack = (message = 'Error en el servidor') => {
    $q.dialog({
        title: '¡Ha Ocurrido un error!',
        message
    });
}

</script>