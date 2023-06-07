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
									<template v-for="n in 8" :key="n">
										<v-list-item>
											<template v-slot:prepend>
												<v-avatar color="grey-darken-1"></v-avatar>
											</template>

											<v-list-item-title>User {{ n }}</v-list-item-title>

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
						></v-text-field>
					</v-card-item>

					<v-card-actions>
						<v-btn color="primary" block @click="showAlert('success', 'tes', 'okok')">Add</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>

			<vue-basic-alert :duration="300" :closeIn="2000" ref="alert" />
		</v-main>
	</v-app>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from 'vue-router'

// state data
import { useStoreData } from "@/store/data";

const router = useRouter()
const store = useStoreData();
const links = ref([
	["mdi-inbox-arrow-down", "Inbox"],
	["mdi-send", "Send"],
	["mdi-delete", "Trash"],
	["mdi-alert-octagon", "Spam"],
	["mdi-alert-octagon", "Spam"],
	["mdi-alert-octagon", "Spam"],
]);
const cards = ref(["Today"]);
const drawer = ref(null);
const dialog = ref(false);
const dialogAdd = ref(false);
const alert = ref(null);

function showAlert(type, title, msg) {
	alert.value.showAlert(type, msg, title, {
		iconSize: 30,
		iconType: "solid",
		position: "top right",
	});
}

function getContact(){

}

onMounted(() => {
	
})

</script>