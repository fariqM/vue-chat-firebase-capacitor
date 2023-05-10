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

<script>
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
			const database = getDatabase();
			const instance = ref(database, "users");
			set(push(instance), {
				username: this.username,
				password: this.password,
				name: this.name,
			});

			// this.$router.push({name:'home'})
			// if (!this.form) return;
			// this.loading = true;
			// setTimeout(() => (this.loading = false), 2000);
		},
		required(v) {
			return !!v || "Field is required";
		},
	},
};
</script>

<style></style>