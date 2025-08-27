<script >
export default {
  name: 'CompleteView',
  computed: {
    userId() {
      return this.$route.query.userId;
    }
  }
}
</script>




<template>

  <div class="complete-view">
    <div class="center-icon">
      <img src="../assets/wings.png" alt="날개아이콘" class="wings"
           @click="$router.push('/customer-view')" style="cursor:pointer;"/>
      <div class="create" style="font-weight: bold">
        <p class="change-color01" @click="$router.push('/main')">ෆ SUCCESS ෆ</p>
      </div>
    </div>

    <div class="user-info">
      <div class="user-column">
        <p class="user-id">{{ userId }}</p>
        <p class="nim"> 님 </p>
      </div>
      <p class="welcome"> ಣ sori의 회원이 되신걸 환영합니다 ಐ</p>
    </div>

   <div class="btn-location">
     <button class="change-color01" @click="$router.push('/main')"> OK </button>
   </div>
  </div>
</template>




<style scoped>

.complete-view {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #ffffff;
  overflow: scroll;
}

.center-icon{
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translate(-50%, 0%);
  display:  flex;
  flex-direction:  column;
  align-items: center;
  z-index: 1101;
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

.create p.change-color01:hover{
  transition: color 0.2s, font-weight 0.2s;
  font-weight: bold;
  color: #00ff80;
  cursor: pointer;
}

/* new code */

.user-info{
  position: absolute;
  width: 600px;
  height: 200px;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid black;
  border-radius: 40px;
}

.user-column{
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  align-items: stretch;
}

.user-id{
  position: absolute;
  top: 40%;
  left: 48%;
  padding-left: 7px;
  padding-right: 7px;
  border-radius: 17px;
  transform: translate(-50%,-50%);
  font-weight: bold;
  font-size: 20px;
  background: #00ff80;
  color: black;
}

.nim{
  position: absolute;
  top: 40%;
  left: 56%;
  transform: translate(-50%,-50%);
  font-size: 19px;
  color: black;
}

.welcome{
  position: absolute;
  top: 57%;
  left: 50%;
  transform: translate(-50%,-50%);
  font-size: 19px;
  color: black;
}

.btn-location{
  position: absolute;
  bottom: 18%;
  left: 50%;
  transform: translate(-50%,-50%);
}

.btn-location button {
  width: 100px;
  height: 50px;
  font-size: 19px;
  color:  white;
  background:  black;
  border-radius: 30px;
}

.btn-location button.change-color01:hover{
  transition: color 0.2s, font-weight 0.2s;
  font-weight: bold;
  border: 1px solid #00ff80;
  background: #00ff80;
  color: black;
  cursor: pointer;
}


</style>