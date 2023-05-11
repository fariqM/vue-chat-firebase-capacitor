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
			<v-btn icon class="ma-0" @click="$router.replace({name:'home'})">
				<v-icon>mdi-chevron-left</v-icon>
			</v-btn>
			<v-app-bar-title>Nama Kontak</v-app-bar-title>
			<v-spacer></v-spacer>
		</v-app-bar>

		<v-main>
			<v-sheet min-height="100%" id="sheetMsg">
				<v-container>
					<div class="d-flex justify-end mb-4">
						<div
							style="border: 2px solid #ff6550; max-width: 250px"
							class="pa-1 d-flex flex-column rounded-lg"
						>
							<span style="font-size: 1rem">
								text messagetext messagetext messagetext messagetext messagetext
								messagetext messagetext messagetext message
							</span>
							<span style="font-size: 0.7rem; text-align: end" class="mt-1"
								>4:40</span
							>
						</div>
					</div>
					<div class="d-flex justify-start mb-4">
						<div
							style="border: 2px solid #ff6550; max-width: 250px"
							class="pa-1 d-flex flex-column rounded-lg"
						>
							<span style="font-size: 1rem">
								text messagetext messagetext messagetext messagetext messagetext
								messagetext messagetext messagetext message
							</span>
							<span style="font-size: 0.7rem; text-align: start" class="mt-1"
								>4:40</span
							>
						</div>
					</div>
                    <div class="d-flex justify-start mb-4">
						<div
							style="border: 2px solid #ff6550; max-width: 250px"
							class="pa-1 d-flex flex-column rounded-lg"
						>
							<span style="font-size: 1rem">
								text messagetext messagetext messagetext messagetext messagetext
								messagetext messagetext messagetext message
							</span>
							<span style="font-size: 0.7rem; text-align: start" class="mt-1"
								>4:40</span
							>
						</div>
					</div>
                    <div class="d-flex justify-end mb-4">
						<div
							style="border: 2px solid #ff6550; max-width: 250px"
							class="pa-1 d-flex flex-column rounded-lg"
						>
							<span style="font-size: 1rem">
								text messagetext messagetext messagetext messagetext messagetext
								messagetext messagetext messagetext message
							</span>
							<span style="font-size: 0.7rem; text-align: end" class="mt-1"
								>4:40</span
							>
						</div>
					</div>
				</v-container>
				<!-- <div class="mb-4" v-for="n in 100" :key="n">tes</div> -->
			</v-sheet>
		</v-main>

		<v-bottom-navigation>
			<v-textarea variant="solo" rows="1" :auto-grow="false"></v-textarea>
			<v-btn value="favorites">
				<v-icon>mdi-send</v-icon>
				Send
			</v-btn>
		</v-bottom-navigation>
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
		dialogAdd: false,
	}),
	mounted(){
		setTimeout(() => {
			window.scrollTo(0, document.body.scrollHeight);
		}, 1);
		// window.scrollTo(0, document.body.scrollHeight);
	}
};
</script>