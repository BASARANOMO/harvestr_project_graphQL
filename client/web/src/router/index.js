import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Projects from "../views/Projects.vue";
import Accounts from "../views/Accounts.vue";
import Messages from "../views/Messages.vue";
import Chunks from "../views/Chunks.vue";
import Persons from "../views/Persons.vue";
import ProjectCreation from "../views/ProjectCreation.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/about",
		name: "About",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/About.vue"),
	},
	{
		path: "/projects",
		name: "Projects",
		component: Projects,
	},
	{
		path: "/accounts",
		name: "Accounts",
		component: Accounts,
	},
	{
		path: "/messages",
		name: "Messages",
		component: Messages,
	},
	{
		path: "/chunks",
		name: "Chunks",
		component: Chunks,
	},
	{
		path: "/persons",
		name: "Persons",
		component: Persons,
	},
	{
		path: "/projectCreation",
		name: "ProjectCreation",
		component: ProjectCreation,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
