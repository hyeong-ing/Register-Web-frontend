<script>
export default {
  name: 'LeftSide',
  props: {
    open: {
      type: Boolean,
      required: true,
    }
  }
}
</script>



<template>

  <div
    class="left-side"
    :class="{ open: open }"
    >
    <div class="left-side-content">
      <p> ꒰ఎ NEW ໒꒱ </p>
      <p> ❤︎ BEST ❤︎ </p>
      <p> ▪ OUTER </p>
      <p> ▪ TOPS </p>
      <p> ▪ BOTTOMS </p>
      <p> ▪ DRESS </p>
      <p> ▪ SHOES </p>
      <p> ▪ ACC </p>
    </div>
  </div>

</template>



<style scoped>
.left-side {
  position: fixed;
  top: 0;
  left: 0;
  width: 22vw;
  height: 100vh;
  background: #9f9f9f;
  border-right: 4px solid #020202;
  box-shadow: 4px 0 12px rgba(0,0,0,0.23);
  /* 왼쪽으로 이동 아예 안보이게 */
  transform: translateX(-100%);
  /* 어떤 속성이 얼마 동아 어떤 속도로 움직이는지 설정 */
  transition: transform 0.4s cubic-bezier(.71,1.7,.58,.98);
  /* 맨 앞에 보이도록 */
  z-index: 1000;
  /* 세로 정렬 */
  flex-direction: column;

}

.left-side.open {
  transform: translateX(0%);
  border-radius: 10px;
}

.left-side-content {
  padding: 40px 32px  32px 32px;
  font-size: 1.0rem;
  color: #020202;
  height:  100%;
}

.left-side-content p {
  margin: 10px 0;
}
</style>