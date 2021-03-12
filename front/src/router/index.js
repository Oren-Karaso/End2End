import Vue from 'vue';
import VueRouter from 'vue-router';
import toyApp from '../views/toy-app.vue';
import toyDetails from '../views/toy-details.vue';
import toyEdit from '../views/toy-edit.vue';
import toyDashboard from '../views/toy-dashboard.vue';


Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'toy-app',
		component: toyApp,
	},
	{
		path: '/details/:toyId',
		name: 'toy-details',
		component: toyDetails,
	},
	{
		path: '/edit/:toyId?',
		name: 'toy-edit',
		component: toyEdit,
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		component: toyDashboard,
	},
];

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes,
});

export default router;
