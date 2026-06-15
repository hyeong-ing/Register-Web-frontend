<script>
import axios from "axios";

export default {
  name: "NaverCallback",
  async created() {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const error = url.searchParams.get("error");
    const errorDescription = url.searchParams.get("error_description");

    if (error) {
      alert(errorDescription ?? "네이버 로그인 인증에 실패했습니다.");
      this.$router.replace("/simpleRegister");
      return;
    }

    const saved = sessionStorage.getItem("naver_oauth_state");
    sessionStorage.removeItem("naver_oauth_state");

    if (!code || !state || !saved || state !== saved) {
      alert("잘못된 접근입니다. (state 검증 실패)");
      this.$router.replace("/simpleRegister");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:8080/oauth/naver", { code, state });

      if (data?.nickname) {
        localStorage.setItem("displayName", data.nickname);
        alert(`환영합니다, ${data.nickname}님!`);
      } else {
        alert("닉네임을 받지 못했어요: " + JSON.stringify(data));
      }

      this.$router.replace("/main");
    } catch (e) {
      console.error(e);
      alert(e?.response?.data ?? "네이버 로그인 실패");
      this.$router.replace("/simpleRegister");
    }
  }
}
</script>

<template>
</template>

<style scoped>
</style>
