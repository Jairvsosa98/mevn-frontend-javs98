<template>
    <q-page class="row justify-center">
        <div class="col-12 col-sm-6 col-md-5">
            <h3>Register</h3>
            <q-form @submit.prevent="handleSubmit" ref="registerForm">
                <q-input v-model="name" autocomplete="name" label="Nombres" type="text"
                    :rules="[(val) => val && val.trim() !== '' || 'Ingrese nombres completos']" lazy-rules></q-input>
                <q-input v-model="surname" autocomplete="surname" label="Apellidos" type="text"
                    :rules="[(val) => (val && val.trim() !== '') || 'Ingrese apellidos completos']" lazy-rules></q-input>
                <q-input v-model="email" autocomplete="email" label="Email" type="text"
                    :rules="[(val) => (val && /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val)) || 'Formato Email Incorrecto']"
                    lazy-rules></q-input>
                <q-input v-model="password" autocomplete="new-password" label="Password" type="password"
                    :rules="[(val) => (val && val.length > 5) || 'Contraseña mínimo 6 caracteres']" lazy-rules></q-input>
                <q-input v-model="repassword" autocomplete="new-password" label="Repita contraseña" type="password"
                    :rules="[(val) => (val && val === password) || 'Las contraseñas no coinciden']" lazy-rules></q-input>
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

const registerForm = ref(null);
const name = ref('');
const surname = ref('')
const email = ref('');
const password = ref('');
const repassword = ref('');

const handleSubmit = async () => {
    try {
        await userStore.register(name.value, surname.value, email.value, password.value, repassword.value);
        router.push('/');
    } catch (error) {
        alertDialogBack(error.message);
    } finally {
        registerForm.value.resetValidation();
        cleanForm();
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