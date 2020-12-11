import { createApp, h, provide } from "vue";
import App from "./App.vue";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { DefaultApolloClient } from "@vue/apollo-composable";
import router from './router'

const defaultclient = new ApolloClient({
	uri: "http://localhost:4000/graphql",
	cache: new InMemoryCache(),
});

/* const query = gql`
	query {
		projects {
			id
			name
		}
	}
`;


defaultclient
	.query({
		query,
	})
	.then((res) => console.log(res));
 */


createApp({
	setup() {
		provide(DefaultApolloClient, defaultclient); //defaultclient is the one we introduced above
	},
	render() {
		return h(App);
	},
}).use(router).mount("#app");
