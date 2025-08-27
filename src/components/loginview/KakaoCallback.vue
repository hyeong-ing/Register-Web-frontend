<script>
import axios from "axios";

export default {
  name: "KakaoCallback",
  async created() {
    // 1) 쿼리스트링에서 code/state 추출
    // Q. url에서 code와 state를 추출하는거? searchParams를 붙이면 알아서 되는건가?
    // A. + searchParams는 쿼리스트링으로 키-값 형태로 다루게 해주는 표준 API라서 바로 읽을 수 있다.
    // ?code=…이런 형태로 되어있어서, code 뒤의 값을 읽는다!
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    // 2) state 검증 (간단 버전)
    // 받아온 state가 saved와 맞는지?
    const saved = sessionStorage.getItem("kakao_oauth_state");
    sessionStorage.removeItem("kakao_oauth_state");
    if (!code || !state || !saved || state !== saved) {
      alert("잘못된 접근입니다. (state 검증 실패)");
      this.$router.replace("/");
      return;
    }

    try {
      // 3) 백엔드로 code 전달 → 백엔드가 토큰 교환 + 사용자 조회 + 우리 서비스 토큰 발급
      const { data } = await axios.post("http://localhost:8080/oauth/kakao", { code });

      // 4) 우리 서비스의 세션/토큰 저장 (예: JWT)
      //    - 백엔드가 쿠키로 내려줄 수도 있고, body에 accessToken을 넣어줄 수도 있음
      if (data?.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }

      console.log("kakao user data:", data);
      if (data && data.nickname) {
        localStorage.setItem("nickname", data.nickname);     // 연습용 간단 저장
        alert(`환영합니다, ${data.nickname}님!`);            // 즉시 눈으로 확인
      } else {
        alert("닉네임을 받지 못했어요: " + JSON.stringify(data));
      }

      // 5) 메인으로 이동
      this.$router.replace("/main");
    } catch (e) {
      console.error(e);
      alert(e?.response?.data ?? "카카오 로그인 실패");
      this.$router.replace("/");
    }
  },
  render() {
    // 단순 로딩 화면
    return "카카오 로그인 중...";
  }
}

</script>

<template>

</template>

<style scoped>

</style>