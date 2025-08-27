import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import SimpleRegister from "../views/SimpleRegister.vue";
import BasicRegister from "../views/BasicRegister.vue";
import CompleteView from "../views/CompleteView.vue";
import LoginView from "../views/LoginView.vue";
import CustomerView from "@/views/CustomerView.vue";


const routes = [
    { path: '/main', name: 'Main', component: MainView },
    { path: '/simpleRegister', name: 'SimpleRegister', component: SimpleRegister },
    { path: '/basicRegister', name: 'BasicRegister', component: BasicRegister },
    { path: '/completeView', name: 'CompleteView', component: CompleteView },
    { path: '/login', name: 'LoginView', component: LoginView },
    { path: '/oauth/code/kakao', name:'KakaoCallback', component: () => import("../components/loginview/KakaoCallback.vue")},
    { path: '/customer-view', name: 'CustomerView', component: CustomerView },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
