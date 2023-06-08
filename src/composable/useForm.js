import { ref } from "vue";
import { useStoreData } from "@/store/data";
import { useRouter } from 'vue-router'

export default function useForm(username = '', password = '') {
    const form = ref(false);
    const loading = ref(false);
    const store = useStoreData();
    const router = useRouter();

    function loginAction() {
        console.log(username);
        console.log(password);
        if (!form.value) return;
        loading.value = true;
        store
            .getOneUser("users", "username", username)
            .then((res) => {
                // console.log(res);
                let user = {};
                if (res == null) {
                    alert("kredensial salah");
                    loading.value = false;
                } else {
                    Object.keys(res).forEach((item, key) => {
                        if (key == 0) {
                            user.username = res[item].username;
                            user.name = res[item].name;
                            if (res[item].password === password) {
                                store.setCurrentUser(user);
                                router.push({ name: "home" });
                                loading.value = false;
                            }
                        }
                    });
                }
            })
            .catch((e) => {
                alert("error");
                console.log(e);
            });
    }

    return {
        form,
        loading,
        loginAction
    }
}