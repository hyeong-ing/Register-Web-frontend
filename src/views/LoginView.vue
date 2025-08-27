<script>

import axios from "axios";

export default {
  name: 'LoginView',
  data() {
    return {
      userId: "",
      pwd: ""
    };
  },
  methods: {
    async login() {
      try {
        const res = await axios.post("http://localhost:8080/api/login", {
          userId: this.userId,
          pwd: this.pwd
        });
        alert("로그인되었습니다.");
        localStorage.setItem("displayName", this.userId);
        this.$router.push({
          path: "/customer-view",
          query: { userId: this.userId }
        });
      } catch (e) {
        alert(e.response.data);
      }
    },
    kakaoLogin() {
      const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
      const REDIRECT_URI = `${window.location.origin}/oauth/code/kakao`;

      if (!REST_API_KEY) {
        alert('VITE_KAKAO_REST_API_KEY 비어있음!');
        return;
      }

      const state = btoa(String(Date.now()));
      sessionStorage.setItem("kakao_oauth_state", state);

      const authUrl =
          `https://kauth.kakao.com/oauth/authorize?response_type=code` +
          `&client_id=${encodeURIComponent(REST_API_KEY)}` +
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
      <div class="pwd-box">
        <p>ෆ PWD </p>
        <input v-model="pwd" type="password" name="password" placeholder="password"/>
      </div>
        <button class="login-text" @click="login"> SIGN IN </button>
    </div>

    <div class="kakao">
      <img src="../assets/kakao.png" alt="Kakao" @click="kakaoLogin"/>
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


/* new code */

.login-container {
  position: absolute;
  width: 33vw;
  height: 30vh;
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
  left: 18%;
  top: 10%;
  align-items: center;
  flex-direction: row;
  display: flex;
  gap: 9.3%;
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
  transition: border-bottom 0.2s ;
}

.pwd-box{
  position: absolute;
  width: 33vw;
  height: 10vh;
  left: 18%;
  top: 30%;
  align-items: center;
  flex-direction: row;
  display: flex;
  gap: 5%;
  font-size: 1.0rem;
  font-weight: bold;
  font-family: 'GowunBatang-Regular', serif;
  color: white;
}
.pwd-box input{
  width: 15vw;
  height: 4vh;
  padding: 3px 13px 2px 4px;
  font-size: 1rem;
  transition: border-bottom 0.2s ;
}


.login-text {
  position: absolute;
  width: 20vw;
  height: 5.3vh;
  bottom: 17%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.4s ease, border 0.4s ease, color 0.4s ease;
}

.login-text:hover{
  background-color: #00ff80;
  border: #00ff80;
  color: white;
  -webkit-text-stroke: 0.8px black;
}

.kakao{
  position:  absolute;
  top:60%;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
}

</style>