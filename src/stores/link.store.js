import { defineStore } from 'pinia';
import { useUserStore } from './user-store';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useQuasar } from 'quasar'

export const useLinkStore = defineStore('link', () => {

    const userStore = useUserStore();

    const links = ref([]);

    const $q = useQuasar();

    const getLinks = async () => {
        try {
            $q.loading.show();
            const res = await api({
                url: '/links',
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + userStore.token
                }
            });
            const { data } = res.data;

            /*Primera forma*/
            // links.value = data.map((item) => {
            //     return {
            //         longLink: item.longLink,
            //         nanoLink: item.nanoLink,
            //         uid: item.uid
            //     }
            // }); 

            /*Segunda forma*/
            // links.value = data.map((item) => item);
            links.value = [...data];

        } catch (error) {
            throw error.response?.data || error;
        } finally {
            $q.loading.hide();
        }
    }

    const createLink = async (longLink) => {
        try {
            $q.loading.show();
            const res = await api({
                url: "/links",
                method: "POST",
                headers: {
                    Authorization: "Bearer " + userStore.token
                },
                data: {
                    longLink
                },
            });

            links.value.push(res.data.data);

            return res.data;

        } catch (error) {
            throw error.response?.data || error;
        }finally{
            $q.loading.hide();
        }
    }

    const modifyLink = async (newLink) => {
        try {
            // $q.loading.show();
            const res = await api({
                url: `/links/${newLink._id}`,
                method: 'PATCH',
                headers: {
                    Authorization: "Bearer " + userStore.token
                },
                data: {
                    longLink: newLink.longLink
                }
            });

            links.value = links.value.map((item) => item._id === newLink._id ? newLink : item);
            return res.data;

        } catch (error) {
            throw error.response?.data || error;
        } finally {
            // $q.loading.hide();
        }
    }

    const removeLink = async (_id) => {
        try {
            // $q.loading.show();
            const res = await api({
                url: `/links/${_id}`,
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + userStore.token
                },
            })
            // getLinks();
            links.value = links.value.filter((item) => item._id !== _id);
            return res.data;
        } catch (error) {
            throw error.response?.data || error;
        }finally{
            // $q.loading.hide();
        }
    }

    return {
        links,
        getLinks,
        createLink,
        modifyLink,
        removeLink,
    };
});

