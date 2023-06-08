<template>
	<v-app id="inspire">
		<v-app-bar
			color="teal-darken-4"
			image="https://picsum.photos/1920/1080?random"
		>
			<template v-slot:image>
				<v-img
					gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
				></v-img>
			</template>

			<v-app-bar-title>
				{{ store.getCurrentUser.name }}
			</v-app-bar-title>

			<v-spacer></v-spacer>

			<v-btn icon @click="dialog = true">
				<v-icon>mdi-magnify</v-icon>
			</v-btn>
		</v-app-bar>
		<v-main>
			<v-container class="py-4" fluid>
				<v-sheet>
					<v-row>
						<v-col>
							<v-card>
								<v-list lines="two" @click="$router.push({ name: 'msg.room' })">
									<v-list-subheader>Contact</v-list-subheader>
									<template v-for="(contact, i) in contacts.list" :key="i">
										<v-list-item>
											<template v-slot:prepend>
												<v-avatar color="grey-darken-1"></v-avatar>
											</template>

											<v-list-item-title>{{
												contact.username
											}}</v-list-item-title>

											<v-list-item-subtitle>
												{{ contact.lastMsg }}
											</v-list-item-subtitle>
											<template v-slot:append>
												<v-list-item-subtitle>{{ moment(contact.time).fromNow() }}</v-list-item-subtitle>
											</template>
										</v-list-item>

										<v-divider
											v-if="i !== 6"
											:key="`divider-${i}`"
											inset
										></v-divider>
									</template>
								</v-list>
							</v-card>
						</v-col>
					</v-row>
				</v-sheet>
			</v-container>
			<v-btn
				icon="mdi-plus"
				color="green"
				style="position: fixed; bottom: 12px; right: 12px; z-index: 2000"
				@click="dialogAdd = true"
			></v-btn>

			<v-dialog
				v-model="dialog"
				fullscreen
				:scrim="false"
				transition="dialog-bottom-transition"
			>
				<v-card>
					<v-toolbar
						floating
						color="teal-darken-3"
						class="px-3"
						image="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
					>
						<v-btn icon dark @click="dialog = false">
							<v-icon>mdi-close</v-icon>
						</v-btn>
						<v-text-field
							hide-details
							append-icon="mdi-magnify"
							single-line
							density="compact"
						></v-text-field>
					</v-toolbar>
					<v-container class="py-4" fluid>
						<v-sheet>
							<v-row>
								<v-col>
									<v-card>
										<v-list lines="two">
											<v-list-subheader>Contact</v-list-subheader>
											<template v-for="n in 8" :key="n">
												<v-list-item>
													<template v-slot:prepend>
														<v-avatar color="grey-darken-1"></v-avatar>
													</template>

													<v-list-item-title>Message {{ n }}</v-list-item-title>

													<v-list-item-subtitle>
														Lorem ipsum dolor sit amet, consectetur adipisicing
														elit. Nihil repellendus distinctio similique
													</v-list-item-subtitle>
												</v-list-item>

												<v-divider
													v-if="n !== 6"
													:key="`divider-${n}`"
													inset
												></v-divider>
											</template>
										</v-list>
									</v-card>
								</v-col>
							</v-row>
						</v-sheet>
					</v-container>
				</v-card>
			</v-dialog>

			<v-dialog v-model="dialogAdd">
				<v-card>
					<v-card-title> Add Contact </v-card-title>
					<v-card-item>
						<v-text-field
							clearable
							class="pt-2"
							label="Username"
							placeholder="Add contact..."
							density="compact"
							variant="outlined"
							v-model="usernameQuery"
							:error-messages="errorAddField"
						></v-text-field>
					</v-card-item>

					<v-card-actions>
						<v-btn
							color="primary"
							block
							@click="addContact(null)"
							:loading="loadingAddBtn"
							>Add</v-btn
						>
					</v-card-actions>
				</v-card>
			</v-dialog>

			<vue-basic-alert :duration="300" :closeIn="2000" ref="alert" />
		</v-main>
		<v-snackbar
			v-model="snackbar.show"
			location="top"
			color="white"
			:timeout="3000"
			transition="slide-x-transition"
			multi-line
		>
			<template v-slot:actions>
				<v-btn
					:color="snackbar.type"
					:icon="snackbar.type == 'success' ? 'mdi-check' : 'mdi-close'"
				></v-btn>
			</template>
			{{ snackbar.msg }}
		</v-snackbar>
	</v-app>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import moment from "moment";
import {
	getDatabase,
	ref as refDB,
	onValue,
	query,
	orderByChild,
	equalTo,
} from "firebase/database";

// state data
import { useStoreData } from "@/store/data";

const snackbar = reactive({
	msg: "",
	show: false,
	type: "",
});

const router = useRouter();
const store = useStoreData();
const links = ref([
	["mdi-inbox-arrow-down", "Inbox"],
	["mdi-send", "Send"],
	["mdi-delete", "Trash"],
	["mdi-alert-octagon", "Spam"],
	["mdi-alert-octagon", "Spam"],
	["mdi-alert-octagon", "Spam"],
]);
const usernameQuery = ref("");
const cards = ref(["Today"]);
const drawer = ref(null);
const dialog = ref(false);
const dialogAdd = ref(false);
const loadingAddBtn = ref(false);
const errorAddField = ref("");

let contacts = reactive({ list: [] });

onMounted(() => {
	const db = getDatabase();
	const dbRef = refDB(db, "/contact");
	const q = query(
		dbRef,
		...[orderByChild("owner"), equalTo(store.getCurrentUser.username)]
	);
	onValue(q, (snapshot) => {
		contacts.list = [];
		snapshot.forEach((childSnapshot) => {
			contacts.list.push(childSnapshot.val());
		});
	});
});

function showAlert(type, msg, show) {
	snackbar.msg = msg;
	snackbar.type = type;
	snackbar.show = show;
}

function setContact() {}

function checkUsername() {
	return new Promise((resolve, reject) => {
		errorAddField.value = "";
		loadingAddBtn.value = true;
		store
			.getOneUser("users", "username", usernameQuery.value)
			.then((res) => {
				loadingAddBtn.value = false;
				let user = {};
				if (res == null) {
					errorAddField.value = "Username not found!";
					reject(false);
				} else {
					Object.keys(res).forEach((item, key) => {
						if (res[item]?.username == usernameQuery.value) {
							usernameQuery.value = "";
							resolve(res[item]?.username);
							showAlert(
								"success",
								"Username has been added to your contact",
								true
							);
						}
					});
					resolve(null);
				}
			})
			.catch((e) => {
				loadingAddBtn.value = false;
				alert("error");
				console.log(e);
				reject(false);
			});
	});
}

function addContact(lastMsg = null) {
	checkUsername()
		.then((username) => {
			dialogAdd.value = false;
			const time = Date.now();
			const newContact = {
				owner: store.getCurrentUser.username,
				username: username,
				time: time,
				lastMsg: lastMsg == null ? "No Message" : lastMsg,
			};
			console.log(newContact);
			store
				.setData("contact", newContact)
				.then((r) => {
					console.log(r);
				})
				.catch((e) => {
					console.log(e);
				});
			// console.log("ok");
		})
		.catch((e) => {
			// dialogAdd.value = false;
			// usernameQuery.value = "";
			console.log(e);
		});
}

onMounted(() => {});
</script>