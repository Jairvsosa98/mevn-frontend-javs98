<template>
    <q-form @submit.prevent="addLink" ref="formAdd">
        <q-input v-model="link" label="Ingrese Link Aquí"
            :rules="[(val) => val && val.trim() !== '' || 'Ingrese un link por favor']"
            lazy-rules
            >
        </q-input>
        <q-btn class="q-mt-sm full-width" label="Agregar" color="primary" type="submit" :loading="loading"></q-btn>
    </q-form>
</template>

<script setup>
import { ref } from 'vue';
import { useNotify } from '../composables/notifyHook';

import { useLinkStore } from '../stores/link.store';

const { showNotify } = useNotify();
const useLink = useLinkStore();

const formAdd = ref(null);
const link = ref('');
const loading = ref(false);

const addLink = async () => {
    try {
        loading.value = true;
        const res = await useLink.createLink(link.value);
        showNotify(res.message);
    } catch (error) {
        if (error.errors) {
            return error.errors.forEach(item => { showNotify(item.msg, 'error', 'negative') });
        }
        showNotify(error);
    } finally {
        loading.value = false;
        link.value = '';
        formAdd.value.resetValidation();
    }
}
</script>
