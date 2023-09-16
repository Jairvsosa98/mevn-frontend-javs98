import { useQuasar } from 'quasar';
export const useNotify = () => {

    const $q = useQuasar();

    const showNotify = (message = 'Error de Servidor', icon = 'done', type = 'positive') => {
        $q.notify({
            message,
            icon,
            type,
            position: 'bottom-left',
        })
    }

    return { showNotify }
}