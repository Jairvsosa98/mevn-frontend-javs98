import { defineStore } from 'pinia';
import { useUserStore } from './user-store';
import { api } from 'src/boot/axios';
import { ref } from 'vue';

export const useLinkStore = defineStore('link', () => {

    const userStore = useUserStore();

    const links = ref([]);

    const getLinks = async () => {
        try {

            const res = await api({
                url: '/links',
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + userStore.token
                }
            });
            const { data } = res.data;

            // links.value = data.map((item) => {
            //     return {
            //         longLink: item.longLink,
            //         nanoLink: item.nanoLink,
            //         uid: item.uid
            //     }
            // }); /*Primera forma*/

            // links.value = data.map((item) => item); /*Segunda forma*/
            links.value = [...data];

        } catch (error) {
            throw error.response?.data || error;
        }
    }

    const createLink = async (longLink) => {
        try {
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
            getLinks();

            return res.data;

        } catch (error) {
            throw error.response?.data || error;
        }
    }

    return {
        links,
        getLinks,
        createLink
    };
});

