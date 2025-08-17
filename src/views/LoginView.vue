<script>
export default {
  name: 'LoginView',

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
      <div class="login-button">
        <p class="login-text"> SIGN IN </p>
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
  gap: 8.55%;
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
  gap: 3%;
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
.login-button{
  position: absolute;
  width: 20vw;
  height: 5vh;
  left: 50%;
  transform: translateX(-50%);
  top: 67%;
  background: white;
  color: black;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s, font-weight 0.2s;
}
.login-button:hover{
  font-weight: bold;
  background: #00ff80;
  cursor: pointer;
}
.login-text{
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
}

</style>