import Vue from 'vue'
import VueRouter from 'vue-router'
import SignTop from '@/views/SignTop'
import SignUp from '@/views/SignUp'
import TopPage from '@/views/TopPage'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'SignTop',
		component: SignTop
	},
	{
		path: '/signup',
		name: 'SignUp',
		component: SignUp
	},
	{
		path: '/top',
		name: 'TopPage',
		component: TopPage
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router