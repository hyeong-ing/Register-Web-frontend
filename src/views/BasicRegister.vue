<script>

import axios from "axios";

export default {
  name: 'BasicRegister',
  data() {
    return {
      name: "",
      userId: "",
      pwd: "",
      pwdConfirm: "",
      tel: "",
      birth: "",
      email: "",
      idDuplicate: true,
      emailDuplicate: true,
    };
  },

  watch: {
    userId(newVal, oldVal) {
      this.idDuplicate = true;
    },
    email(newVal, oldVal) {
      this.emailDuplicate = true;
    }
  },

  methods: {
    async register() {
      try {
        if(this.idDuplicate === true) {
          alert("아이디 중복체크를 해주세요.")
          return;
        }

        if(this.emailDuplicate === true) {
          alert("이메일 중복체크를 해주세요.")
          return;
        }

        const res = await axios.post("http://localhost:8080/api/register", {
          name: this.name,
          userId: this.userId,
          pwd: this.pwd,
          pwdConfirm: this.pwdConfirm,
          tel: this.tel,
          birth: this.birth,
          email: this.email,
        });
        alert("회원가입에 성공했습니다.");
        this.$router.push("/completeView");
      } catch (e) {
        alert(e.response.data);
      }
    },
    async checkIdDuplicate() {
      console.log("idDuplicate 버튼 클릭됨:", this.userId);
      try{
        const res = await axios.post("http://localhost:8080/api/idDuplicate", {
          userId: this.userId
        });
        alert("사용가능한 아이디입니다.");
        this.idDuplicate = false;
      } catch(e) {
        alert(e.response.data);
        this.idDuplicate = true;
      }
    },
    async checkEmailDuplicate() {
      try {
        const res = await axios.post("http://localhost:8080/api/emailDuplicate",{
          email: this.email
        });
        alert("사용가능한 이메일입니다.");
        this.emailDuplicate = false;
      } catch (e) {
        alert(e.response.data);
        this.emailDuplicate = true;
      }
    }
  }
}
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
      <div class="information-column">
        <div class="information-row">
          <label>ෆ name:  </label>
          <input v-model="name" type="text" name="name" placeholder="name"/>
        </div>
        <div class="information-row">
          <label>ෆ id:  </label>
          <input v-model="userId" @input="idDuplicate" type="text" name="userId" placeholder="id"/>
          <button class="duplicate-btn" @click="checkIdDuplicate"> id </button>
        </div>
        <div class="information-row">
          <label>ෆ pwd:  </label>
          <input v-model="pwd" type="password" name="password" placeholder="password"/>
        </div>
        <div class="information-row">
          <label>ෆ pwd confirm:  </label>
          <input v-model="pwdConfirm" type="password" name="passwordConfirm" placeholder="password confirm"/>
        </div>
        <div class="information-row">
          <label>ෆ tel:   </label>
          <input v-model="tel" type="tel" name="tel"  placeholder="010-0000-0000"/>
        </div>
        <div class="information-row">
          <label>ෆ birth:   </label>
          <input v-model="birth" type="date" name="birth"/>
        </div>
        <div class="information-row">
          <label>ෆ email:   </label>
          <input v-model="email"  type="email" name="email" placeholder="example01@sori.com"/>
          <button class="duplicate-btn" @click="checkEmailDuplicate"> email </button>
        </div>
        <div class="signup-btn">
          <button class="change-color01" @click="register"> SIGN UP </button>
        </div>
      </div>
    </div>
  </div>

</template>



<style scoped>
.basic-view {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #ffffff;
  overflow: scroll;
}

.center-icon{
  position: relative;
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

.account{
  position: relative;
  width: 33vw;
  height: 74vh;
  min-width: 260px;
  max-width: 720px;
  top: 9%;
  left: 50%;
  border-left:  6px solid black;
  border-right:  6px solid  black;
  transform: translate(-50%, 0%);
  padding: 32px 8px 32px 13px;
  border-radius: 16px;
  box-sizing: border-box;
  overflow: scroll;
}

.information-column{
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  align-items: stretch;
}

.information-row{
  position: relative;
  display:  flex;
  flex-direction: row;
  box-sizing: border-box;
  color: black;
}

.information-row label {
  min-width: 70px;
  color: black;
  font-weight: bold;
  font-size: 1.0rem;
}

.information-row input{
  padding: 3px 4px 1px 4px;
  font-size: 1rem;
  border-top: none;
  border-right: none;
  border-left: none;
  outline: none;
  transition: border-bottom 0.2s ;
}

.information-row input:focus {
  border-bottom: 2.5px solid #00ff80;
}

.signup-btn {
  position: fixed;
  top: 86%;
  left: 50%;
  transform: translateX(-50%);
}

.signup-btn button {
  font-size:  1.1rem;
  border-radius: 10px;
  padding: 5px 13px;
  background: black;
  color: white;
}

.signup-btn button.change-color01:hover{
  transition: color 0.2s, font-weight 0.2s;
  font-weight: bold;
  border: 1px solid #00ff80;
  background: #00ff80;
  color: black;
  cursor: pointer;
}

.duplicate-btn {
  position: absolute;
  left: 80%;
  top: 20%;
  font-size:  1.0rem;
  border-radius: 10px;
  background: white;
  color: black;
  cursor: pointer;
}



</style>