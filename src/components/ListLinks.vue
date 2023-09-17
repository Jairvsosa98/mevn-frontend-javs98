<template>
    <q-card class="my-card q-mb-sm">
        <q-card-section>
            <div class="text-overline">{{ link.nanoLink }}</div>
            {{ link }}
        </q-card-section>

        <q-separator />

        <q-card-actions>
            <q-btn flat round icon="mdi-trash-can-outline" color="red" @click.prevent="deleteLink(link._id)"
                :loading="linkLoading.delete.value">
                <q-tooltip class="bg-red" :offset="[10, 10]">
                    Eliminar
                </q-tooltip>
            </q-btn>
            <q-btn flat round icon="mdi-pencil-outline" color="green" @click.prevent="updateLink(link)"
                :loading="linkLoading.update.value">
                <q-tooltip class="bg-green" :offset="[10, 10]">
                    Editar
                </q-tooltip>
            </q-btn>
            <q-btn flat color="primary" @click="copyLink(link.nanoLink)">copy</q-btn>
        </q-card-actions>

    </q-card>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar'

import { useNotify } from 'src/composables/notifyHook';
import { useLinkStore } from '../stores/link.store'

defineProps({
    link: Object
});

const $q = useQuasar();
const { showNotify } = useNotify();
const useLink = useLinkStore();
const linkLoading = {
    delete: ref(false),
    update: ref(false)
};

const copyLink = async (nanoLink) => {
    try {
        const path = `${process.env.FRONT_URI}/${nanoLink}`;

        await navigator.clipboard.writeText(path);
        showNotify('Link Copiado Correctamente');
    } catch (error) {
        console.log(error);
        showNotify(error, 'error', 'negative');
    }
}

const deleteLink = async (_id) => {
    $q.dialog({
        title: '¡Atención!',
        message: '¿Quieres eliminar ese link?',
        cancel: true,
        persistent: true
    }).onOk(async () => {
        try {
            linkLoading.delete.value = true;
            const res = await useLink.removeLink(_id);
            showNotify(res.message)
        } catch (error) {
            if (error.errors) {
                return error.errors.forEach(item => { showNotify(item.msg, 'error', 'negative') });
            }
            showNotify(error);
        } finally {
            linkLoading.delete.value = false;
        }
    });
}

const updateLink = (link) => {
    $q.dialog({
        title: 'Actualizar Link',
        message: 'Actualiza aquí, tu enlace',
        prompt: {
            model: link.longLink,
            type: 'text' // optional
        },
        cancel: true,
        persistent: true
    }).onOk(async (data) => {
        try {
            linkLoading.update.value = true;
            const newLink = { ...link, longLink: data }
            const res = await useLink.modifyLink(newLink);
            showNotify(res.message);
        } catch (error) {
            if (error.errors) {
                return error.errors.forEach(item => { showNotify(item.msg, 'error', 'negative') });
            }
            showNotify(error);
        } finally {
            linkLoading.update.value = false;
        }
    })

}

</script>