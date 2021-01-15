import { createApp, h, provide } from "vue";
import App from "./App.vue";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { DefaultApolloClient } from "@vue/apollo-composable";
import router from "./router";

const defaultclient = new ApolloClient({
	uri: "http://localhost:4000/",
	cache: new InMemoryCache(),
});

createApp({
	setup() {
		provide(DefaultApolloClient, defaultclient);
	},
	render() {
		return h(App);
	},
})
	.use(router)
	.mount("#app");
