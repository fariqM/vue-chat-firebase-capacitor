<template>
	<v-container>
		<v-row>
			<v-col cols="12" sm="2">
				<v-sheet class="bg-deep-grey pa-3" rounded>
					<v-card class="mx-auto px-6 py-8" max-width="344">
						<v-form v-model="form" @submit.prevent="loginAction()">
							<v-text-field
								v-model="username"
								:readonly="loading"
								:rules="[required]"
								class="mb-2"
								clearable
								label="Username"
							></v-text-field>

							<v-text-field
								v-model="password"
								:readonly="loading"
								:rules="[required]"
								clearable
								label="Password"
								type="password"
								placeholder="Enter your password"
							></v-text-field>
							<br />

							<v-btn
								:loading="loading"
								block
								color="success"
								size="large"
								type="submit"
								variant="elevated"
							>
								Sign In
							</v-btn>
						</v-form>
					</v-card>
				</v-sheet>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup>
import {
	getDatabase,
	ref as DbRef,
	query,
	orderByKey,
	orderByChild,
	equalTo,
	child,
	get,
} from "firebase/database";
import { ref, onMounted } from "vue";
import { useStoreData } from "@/store/data";
import { useRouter } from 'vue-router'

const store = useStoreData();
const router = useRouter()
let form = ref(false);
let username = ref(null);
let password = ref(null);
let loading = ref(false);

function loginAction() {
	if (!this.form) return;
	loading.value = true;
	store
		.getOneUser("users", "username", username.value)
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
						if (res[item].password === password.value) {
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

function required(v) {
	return !!v || "Field is required";
}
</script>