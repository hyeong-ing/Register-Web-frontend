<script setup lang="ts">

</script>



<template>

  <div class="basic-view">
    <div class="center-icon">
      <img src="../assets/wings.png" alt="날개아이콘" class="wings"
           @click="$router.push('/main')" style="cursor:pointer;"/>
      <div class="create" style="font-weight: bold">
        <p class="change-color01" @click="$router.push('/main')">Create Account </p>
      </div>
    </div>

    <div class="account">

    </div>
  </div>

</template>



<style scoped>
.basic-view {
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

.create {
  margin-top: -5px;
  font-size: 1.4rem;
  color: #020202;
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

.account{
  position: relative;
  width: 33vw;
  height: 77vh;
  top: 28%;
  left: 50%;
  border-left:  6px solid black;
  border-right:  6px solid  black;
  transform: translate(-50%, 0%);
  background: #f387c1;
}

</style>