import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'
import SimpleRegister from "../views/SimpleRegister.vue";
import BasicRegister from "../views/BasicRegister.vue";
import CompleteView from "../views/CompleteView.vue";
import LoginView from "../views/LoginView.vue";


const routes = [
    { path: '/main', name: 'Main', component: MainView },
    { path: '/simpleRegister', name: 'SimpleRegister', component: SimpleRegister },
    { path: '/basicRegister', name: 'BasicRegister', component: BasicRegister },
    { path: '/completeView', name: 'CompleteView', component: CompleteView },
    { path: '/login', name: 'LoginView', component: LoginView },
    // 카카오가 http://localhost:5173/oauth/code/kakao?code=...&state=... 로 되돌려주면,
    // Vue Router가 이 경로를 보고 KakaoCallback 컴포넌트를 띄웁니다.
    // 이 라우트가 없으면 콜백 URL로 돌아왔을 때 컴포넌트를 못 찾아서 처리(코드 교환)를 못 해요.
    // component: () => import("...")
    // 동적 import(지연 로딩). 이 경로에 들어올 때에만 KakaoCallback.vue 파일을 네트워크로 가져와서 렌더링합니다.
    // redirect_uri를 프론트로 잡았다면 반드시 있어야, 그 경로에서 code를 읽고 다음 단계(백엔드로 코드 전송 → 토큰 교환)를 진행할 수 있어요.
    { path: '/oauth/code/kakao', name:'KakaoCallback', component: () => import("../components/loginview/KakaoCallback.vue")},
]

const router = createRouter({
    history: createWebHistory(),
    routes
});


export default router
