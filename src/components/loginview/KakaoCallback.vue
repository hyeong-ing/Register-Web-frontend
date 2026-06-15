<script>
import axios from "axios";

export default {
  // 백엔드에서 토큰 교환이 이뤄지도록 받아온 인가 코드를 보내는 역할을 하는 클래스
  name: "KakaoCallback",
  async created() {
    // 1) 쿼리스트링에서 code와 state 추출한다.
    // authUrl에 redirect_uri를 적었다.
    // 사용자가 설정한 권한 범위는 카카오 서버에 저장되고, 카카오는 인가코드를 건네준다.
    // 여기 url에 인가코드가 들어있다. 인가코드를 code 부분에서 빼오는 것!
    // 인가코드로 토큰을 발급받고 토큰을 들고 사용자 정보를 읽어올 수 있는 흐름이다.
    const url = new URL(window.location.href);
    // searchParams는 쿼리스트링으로 키-값 형태로 다루게 해주는 표준 API라서 바로 읽을 수 있다.
    // ?code=…이런 형태로 되어있어서, code 뒤의 값을 읽는 것이다.
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    // 2) state 검증
    // 받아온 state가 saved와 맞는지 확인한다.
    // sessionStorage는 탭(세선)단위 저장소라 다른 탭과 섞이지 않고, 탭을 닫으면 사라져서 안전성에 좀 더 좋다.
    // CSRF 용도로 좋다.
    const saved = sessionStorage.getItem("kakao_oauth_state");

    // 한 번 쓴 sessionStorage를 재사용 못하도록 제거한다.
    // 사용자가 뒤로가기를 하거나, 다시 앞으로가기를 했을 때 저장소에 토큰이 남아있으면 콜백이 될 수 있어서 미리 지워둔다.
    // 지우는 타이밍은 읽은 후 변수에 담은 직후가 가장 적합하다.
    sessionStorage.removeItem("kakao_oauth_state");

    // 카카오가 인가 코드를 안줬거나 || 카카오가 state를 안줬거나 || 우리가 저장한 state가 없다거나 || 카카오가 준 state와 저장한 state가 다르거나
    // 이 중에 하나라도 있으면 CSRF 가능성으로 실패시킨다.
    if (!code || !state || !saved || state !== saved) {
      alert("잘못된 접근입니다. (state 검증 실패)");
      // 로그인 화면으로 돌아가며, 실패 페이지로 돌아가지 않는다.
      this.$router.replace("/login");
      return;
    }

    try {
      // 이제 토큰을 교환하는 것은 spring에서 해준다. 그래서 code를 스프링으로 post로 보낸다.
      const { data } = await axios.post("http://localhost:8080/oauth/kakao", { code });

      // 옵셔널 체이닝으로, data가 null이나 undefined가 아니면 data.nickname을 읽고, 맞으면 에러 대신 undefined를 돌려준다.
      // const value = (data == null) ? undefined : data.nickname; 이런 형태인 것이다.
      // 이 프로젝트는 카카오 회원가입/토큰 저장이 아니라 닉네임 반환 연습이 목표라서 nickname만 저장한다.
      if (data?.nickname) {
        localStorage.setItem("displayName", data.nickname);
        alert(`환영합니다, ${data.nickname}님!`);
      } else {
        alert("닉네임을 받지 못했어요: " + JSON.stringify(data));
      }

      // 메인으로 이동
      this.$router.replace("/main");
    } catch (e) {
      console.error(e);
      alert(e?.response?.data ?? "카카오 로그인 실패");
      this.$router.replace("/");
    }
  }
}

</script>

<template>

</template>

<style scoped>

</style>
