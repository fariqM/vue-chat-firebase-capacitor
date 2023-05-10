<template>
    <v-app id="inspire">
        <v-app-bar class="px-3" color="white" flat density="compact">

            <v-spacer></v-spacer>

            <v-tabs centered color="grey-darken-2">
                <v-tab v-for="link in links" :key="link" :to="{ name: link.url }">
                    {{ link.title }}
                </v-tab>
            </v-tabs>
            <v-spacer></v-spacer>
        </v-app-bar>

        <v-main class="bg-grey-lighten-3">
            <router-view />
        </v-main>
    </v-app>
</template>
  
<script>
export default {
    data: () => ({
        links: [
            {
                title: 'Login',
                url: 'login'
            },
            {
                title: 'Register',
                url: 'register'
            }
        ],
    }),
}
</script>