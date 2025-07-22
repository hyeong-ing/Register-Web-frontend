import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import SimpleRegister from "@/views/SimpleRegister.vue";
import BasicRegister from "../views/BasicRegister.vue";

const routes = [
    { path: '/main', name: 'Main', component: MainView },
    { path: '/simpleRegister', name: 'SimpleRegister', component: SimpleRegister },
    { path: '/basicRegister', name: 'BasicRegister', component: BasicRegister },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
