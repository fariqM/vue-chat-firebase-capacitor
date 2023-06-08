<template>
	<v-container>
		<v-row>
			<v-col cols="12" sm="2">
				<v-sheet class="bg-deep-grey pa-3" rounded>
					<v-card class="mx-auto px-6 py-8" max-width="344">
						<v-form v-model="form" @submit.prevent="onSubmit">
							<v-text-field
								v-model="username"
								:readonly="loading"
								:rules="[required]"
								class="mb-2"
								clearable
								label="Username"
							></v-text-field>

							<v-text-field
								v-model="name"
								:readonly="loading"
								:rules="[required]"
								clearable
								label="Name"
								placeholder="Enter your password"
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
								:disabled="!form"
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
import { ref, onMounted } from "vue";
import { useStoreData } from "@/store/data";
import { useRouter } from "vue-router";
import { getDatabase, ref as refDB, push, set } from "firebase/database";

const store = useStoreData();
const router = useRouter();

let form = ref(false);
let username = ref("");
let password = ref("");
let name = ref("");
let loading = ref(false);

function onSubmit() {
	if (!form.value) return;
	loading.value = true;
	const newUser = {
		username: username.value,
		password: password.value,
		name: name.value,
	};
	store
		.setData("users", newUser)
		.then(() => {
			loginAction();
		})
		.catch((e) => {
			alert("error");
			console.log(e);
		});
}

function loginAction() {
	store
		.getOneUser("users", "username", username.value)
		.then((res) => {
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


<!-- <script>
import { getDatabase, ref, push, set } from "firebase/database";

export default {
	data: () => ({
		form: false,
		username: null,
		password: null,
		name: null,
		loading: false,
	}),

	methods: {
		onSubmit() {
			this.loading = true;
			const database = getDatabase();
			const instance = ref(database, "users");
			set(push(instance), {
				username: this.username,
				password: this.password,
				name: this.name,
			});

			if (!this.form) return;
			// this.$router.push({ name: "home" });
			setTimeout(() => (this.loading = false), 2000);
		},
		required(v) {
			return !!v || "Field is required";
		},
	},
};
</script> -->

<style></style>