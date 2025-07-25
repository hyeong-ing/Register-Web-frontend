<script>
export default {
  name: 'RightSide',
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
      class="right-side"
      :class="{ open: open }"
  >
    <div class="right-side-content">
      <p class="change-color" @click="$router.push('/simpleRegister')" style="cursor:pointer;"> SIGN UP </p>
      <p class="change-color" style="cursor:pointer;"> SIGN IN </p>
      <p class="change-color" style="cursor:pointer;"> GUEST ORDER INQUIRY </p>
      <div class="right-side-bottom">
        <p> KAKAO</p>
        <p> consultation call_ </p>
        <p> 02 - 0000 - 0000 </p>
      </div>
    </div>
  </div>

</template>

<style scoped>
.right-side {
  position: fixed;
  top: 0;
  right: 0;
  width:22vw;
  height: 100vh;
  background: #9f9f9f;
  border-left: 4px solid #020202;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.23);
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(.71,1.7,.58,.98);
  z-index: 1000;
}

.right-side.open {
  transform: translateX(0%);
  border-radius: 10px;
}

.right-side-content {
  padding: 40px 32px  32px 32px;
  font-size: 1.0rem;
  color: #020202;
  height: 100%;
  display: flex;
  gap: 7px;
  flex-direction: column;
  justify-content: space-between;
}

.right-side-content p.change-color:hover{
  margin: 0 0 6px 0;
  transition: color 0.2s, font-weight 0.2s;
  font-weight: bold;
  color: #00ff80;
  cursor: pointer;
}

.right-side-bottom {
  margin-top: auto;
}

</style>