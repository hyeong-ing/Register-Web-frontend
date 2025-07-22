<script>

export default {
  name: 'SimpleRegister',
}

</script>



<template>
  <div class="simple-view">
    <div class="center-icon">
      <img src="../assets/wings.png" alt="날개아이콘" class="wings"
           @click="$router.push('/main')" style="cursor:pointer;"/>
      <div class="welcome" style="font-weight: bold"> <p class="change-color01"
                                                         @click="$router.push('/main')">Welcome </p></div>
    </div>
    <div class="btn-box">
      <div class="register-btn" @click="$router.push('/basicRegister')"
           style="cursor:pointer;"> <p class="change-color02" style="font-weight: bold">CREATE ACCOUNT</p> </div>
      <div class="simple-btn01" style="cursor:pointer;">
        <p class="change-color02" style="font-weight: bold">KAKAO SING UP</p></div>
      <div class="simple-btn02" style="cursor:pointer;">
        <p class="change-color02" style="font-weight: bold">NAVER SING UP</p></div>
    </div>
  </div>
</template>



<style scoped>
.simple-view {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #ffffff;
}

.center-icon{
  position: fixed;
  top: 10%;
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

.welcome {
  margin-top: -5px;
  font-size: 1.4rem;
  color: #020202;
  font-family: 'Cafe24Meongi-B-v1.0';
  letter-spacing: 2px;
  text-shadow: 1px 1px 5px #fff8;
}

.register-btn{
  position: fixed;
  width: 25vw;
  height: 60px;
  top: 30%;
  left: 50%;
  padding-top: 15px;
  transform: translate(-50%, 0%);
  border: #020202;
  text-align: center;
  background: #9f9f9f;
  color: #020202;
  font-size: 20px;
  font-family: 'GowunBatang-Regular';
}

.simple-btn01{
  position: fixed;
  width: 25vw;
  height: 60px;
  top: 45%;
  left: 50%;
  padding-top: 15px;
  transform: translate(-50%, 0%);
  border: #020202;
  text-align: center;
  background: #efdf2d;
  color: #020202;
  font-size: 20px;
  font-family: 'GowunBatang-Regular';
}

.simple-btn02{
  position: fixed;
  width: 25vw;
  height: 60px;
  top: 60%;
  left: 50%;
  padding-top: 15px;
  transform: translate(-50%, 0%);
  border: #020202;
  text-align: center;
  background: #44bd55;
  color: #020202;
  font-size: 20px;
  font-family: 'GowunBatang-Regular';
}

.welcome p.change-color01:hover{
  transition: color 0.2s, font-weight 0.2s;
  font-weight: bold;
  color: #00ff80;
  cursor: pointer;
}

.btn-box p.change-color02:hover{
  transition: color 0.2s, font-weight 0.2s;
  font-weight: bold;
  color: #ffffff;
  cursor: pointer;
}

</style>