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

			<v-app-bar-title>NAMA SAYA</v-app-bar-title>

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

			<v-dialog
				v-model="dialog"
				fullscreen
				:scrim="false"
				transition="dialog-bottom-transition"
			>
				<template v-slot:activator="{ props }">
					<v-btn color="primary" dark v-bind="props"> Open Dialog </v-btn>
				</template>
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
		</v-main>
	</v-app>
</template>

<script >
export default {
	data: () => ({
		cards: ["Today"],
		drawer: null,
		links: [
			["mdi-inbox-arrow-down", "Inbox"],
			["mdi-send", "Send"],
			["mdi-delete", "Trash"],
			["mdi-alert-octagon", "Spam"],
			["mdi-alert-octagon", "Spam"],
			["mdi-alert-octagon", "Spam"],
		],
		dialog: false,
	}),
};
</script>