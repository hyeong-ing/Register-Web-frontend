<script>

import axios from "axios";

export default {
  name: 'LoginView',
  data() {
    return {
      userId: "",
      pw: ""
    };
  },
  methods: {
    async login() {
      try {
        const res = await axios.post("http://localhost:8080/api/login", {
          userId: this.userId,
          pw: this.pw
        });
        localStorage.setItem("displayName", this.userId);
        alert("로그인되었습니다.");
        this.$router.replace("/main");
      } catch (e) {
        alert(e?.response?.data ?? "로그인 중 오류가 발생했습니다.");
      }
    },
    // 카카오 로그인 창이 보이도록 하는 메서드
    kakaoLogin() {
      // REST_API_KEY는 따로 저장 해둠. 그 위치를 적었음
      const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
      //
      const REDIRECT_URI = `${window.location.origin}/oauth/code/kakao`;

      if (!REST_API_KEY) {
        alert('REST_API_KEY 비어있음!');
        return;
      }

      // CSRF 방지를 위해 state 값 생성하고 보관했다.
      const state = btoa(String(Date.now()));
      // state 보관
      sessionStorage.setItem("kakao_oauth_state", state);

      // 개발자가 인가 코드를 받기 위해 쿼리 파라미터에 담야할 정보들
      const authUrl =
          `https://kauth.kakao.com/oauth/authorize?response_type=code` +
          `&client_id=${encodeURIComponent(REST_API_KEY)}` +
          `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
          `&state=${encodeURIComponent(state)}`;

      // authUrl로 페이지 이동하기
      // href는 뒤로가기 허용
      window.location.href = authUrl;

    },
    naverLogin() {
      const CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID;
      const REDIRECT_URI = `${window.location.origin}/oauth/code/naver`;

      if (!CLIENT_ID) {
        alert("VITE_NAVER_CLIENT_ID가 비어있습니다.");
        return;
      }

      const state = btoa(String(Date.now()));
      sessionStorage.setItem("naver_oauth_state", state);

      const authUrl =
          `https://nid.naver.com/oauth2.0/authorize?response_type=code` +
          `&client_id=${encodeURIComponent(CLIENT_ID)}` +
          `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
          `&state=${encodeURIComponent(state)}`;

      window.location.href = authUrl;
    }
  }
}

</script>



<template>
  <div class="login-view">

    <div class="center-icon">
      <img src="../assets/wings.png" alt="날개아이콘" class="wings"
           @click="$router.push('/main')" style="cursor:pointer;"/>
      <div class="create">
        <p @click="$router.push('/main')">Sign In </p>
     </div>
   </div>

    <div class="login-container">
      <div class="id-box">
        <p>ෆ ID </p>
        <input v-model="userId" @input="userId" type="text" name="userId" placeholder="id"/>
      </div>
      <div class="pw-box">
        <p>ෆ PW </p>
        <input v-model="pw" type="password" name="password" placeholder="password"/>
      </div>
      <button class="login-text" @click="login"> SIGN IN </button>
      <div class="social-login-box">
        <img src="../assets/kakao.png" alt="Kakao" class="social-login-img" @click="kakaoLogin"/>
        <img src="../assets/naver.png" alt="Naver" class="social-login-img" @click="naverLogin"/>
      </div>
    </div>

  </div>
</template>



<style>
.login-view {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  background: white;
  justify-content: center;
}

.center-icon{
  position: absolute;
  display: flex;
  top: 7%;
  flex-direction: column;
  align-items: center;
}

.wings{
  width: 60px;
  height: 60px;
}

.create {
  margin-top: -5px;
  font-size: 1.4rem;
  color: black;
  font-family: 'Cafe24Meongi-B-v1.0';
  letter-spacing: 2px;
  text-shadow: 1px 1px 5px #fff8;
}

.create p:hover{
  transition: color 0.2s, font-weight 0.2s;
  font-weight: bold;
  color: #00ff80;
  cursor: pointer;
}

.login-container {
  position: absolute;
  width: 33vw;
  height: 46vh;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  flex-direction: column;
  justify-content: center;
  display: flex;
  background: black;
  border-radius: 30px;
  box-sizing: border-box;
}

.id-box{
  position: absolute;
  width: 33vw;
  height: 10vh;
  left: 20%;
  top: 5%;
  align-items: center;
  flex-direction: row;
  display: flex;
  gap: 7.5%;
  font-size: 1.0rem;
  font-weight: bold;
  font-family: 'GowunBatang-Regular', serif;
  color: white;
}

.id-box input{
  width: 15vw;
  height: 4vh;
  padding: 3px 13px 2px 4px;
  font-size: 1rem;
  border: solid 1px white;
  transition: border-bottom 0.2s ;
}

.pw-box{
  position: absolute;
  width: 33vw;
  height: 10vh;
  left: 20%;
  top: 20%;
  align-items: center;
  flex-direction: row;
  display: flex;
  gap: 5.5%;
  font-size: 1.0rem;
  font-weight: bold;
  font-family: 'GowunBatang-Regular', serif;
  color: white;
}
.pw-box input{
  width: 15vw;
  height: 4vh;
  padding: 3px 13px 2px 4px;
  font-size: 1rem;
  transition: border-bottom 0.2s ;
  border: solid 1px white;
}


.login-text {
  position: absolute;
  width: 19.5vw;
  height: 5.4vh;
  top: 43%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 8px;
  border: solid 1px white;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.4s ease, border 0.4s ease, color 0.4s ease;
}

.login-text:hover{
  background-color: #c4c6c6;
  border: #c4c6c6;
}

.social-login-box {
  position: absolute;
  top: 59%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.social-login-img {
  width: 20vw;
  max-width: 280px;
  min-width: 180px;
  height: 45px;
  object-fit: contain;
  cursor: pointer;
}

</style>
