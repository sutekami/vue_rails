import Vue from 'vue'
import VueRouter from 'vue-router'
import SignTop from '@/views/SignTop'
import SignUp from '@/views/SignUp'

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
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router