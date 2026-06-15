<script>

import axios from "axios";

export default {
  name: 'BasicRegister',
  data() {
    return {
      name: "",
      userId: "",
      pw: "",
      pwConfirm: "",
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
    },
    pw(newVal, oldVal) {
      if (!newVal) {
        this.pwConfirm = "";
      }
    }
  },

  computed: {
    showPwConfirm() {
      return this.pw.length > 0;
    },
    isPwMismatch() {
      return this.pwConfirm.length > 0 && this.pw !== this.pwConfirm;
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
          pw: this.pw,
          pwConfirm: this.pwConfirm,
          tel: this.tel,
          birth: this.birth,
          email: this.email,
        });
        alert("회원가입에 성공했습니다.");
        this.$router.push({
          path: "/completeView",
          query: { userId: this.userId }
      })
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
      <div class="create">
        <p @click="$router.push('/main')">Create Account </p>
      </div>
    </div>

    <div class="account">
      <div class="information-column">
        <div class="information-row">
          <label>ෆ name  </label>
          <input v-model="name" type="text" name="name" placeholder="name"/>
        </div>
        <div class="information-row">
          <label>ෆ id  </label>
          <input v-model="userId" type="text" name="userId" placeholder="id"/>
          <button class="id-duplicate-btn" @click="checkIdDuplicate"> id </button>
        </div>
        <div class="information-row">
          <label>ෆ pw  </label>
          <input v-model="pw" type="password" name="password" placeholder="password"/>
        </div>
        <transition name="confirm-slide">
          <div v-if="showPwConfirm" class="information-row confirm-row">
            <label>ෆ confirm  </label>
            <div class="input-message-group">
              <input v-model="pwConfirm" type="password" name="passwordConfirm" placeholder="password confirm"/>
              <p v-if="isPwMismatch" class="pw-error">비밀번호가 불일치합니다.</p>
            </div>
          </div>
        </transition>
        <div class="information-row">
          <label>ෆ tel   </label>
          <input v-model="tel" type="tel" name="tel"  placeholder="010-0000-0000"/>
        </div>
        <div class="information-row">
          <label>ෆ birth   </label>
          <input v-model="birth" type="date" name="birth"/>
        </div>
        <div class="information-row">
          <label>ෆ email   </label>
          <input v-model="email"  type="email" name="email" placeholder="example01@sori.com"/>
          <button class="email-duplicate-btn" @click="checkEmailDuplicate"> email </button>
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
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  display: flex;
  background: white;
  justify-content: center;
}

.center-icon{
  display: flex;
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

.account{
  position: fixed;
  width: min(444px, 92vw);
  height: 65vh;
  min-width: 260px;
  top: 20%;
  left: 50%;
  border-left:  6px solid black;
  border-right:  6px solid  black;
  transform: translateX(-50%);
  padding: 40px 22px 70px;
  border-radius: 16px;
  box-sizing: border-box;
}

.information-column{
  display:flex;
  flex-direction: column;
  gap: 22px;
  width: 100%;
  align-items: center;
}

.information-row{
  display: grid;
  grid-template-columns: 84px minmax(0, 210px) auto;
  column-gap: 10px;
  align-items: center;
  width: min(400px, 100%);
  color: black;
}

.information-row label {
  color: black;
  font-weight: bold;
  font-size: 1rem;
  white-space: nowrap;
}

.information-row input{
  width: 100%;
  box-sizing: border-box;
  padding: 3px 13px 2px 4px;
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

.input-message-group {
  display: flex;
  flex-direction: column;
  grid-column: 2 / 3;
  min-width: 0;
}

.pw-error {
  margin: 5px 0 0 4px;
  color: #d93025;
  font-size: 0.72rem;
  line-height: 1.2;
}

.confirm-slide-enter-active,
.confirm-slide-leave-active {
  max-height: 62px;
  overflow: hidden;
  transition:
      opacity 0.26s ease,
      max-height 0.28s ease,
      transform 0.28s ease;
}

.confirm-slide-enter-from,
.confirm-slide-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-8px);
}

.confirm-slide-enter-to,
.confirm-slide-leave-from {
  max-height: 62px;
  opacity: 1;
  transform: translateY(0);
}

.signup-btn {
  position: absolute;
  bottom: 38px;
  left: 50%;
  transform: translateX(-50%);
}

.signup-btn button {
  font-size:  1.1rem;
  border-radius: 10px;
  padding: 5px 13px;
  background: black;
  color: white;
  transition: color 0.2s, font-weight 0.2s;
}

.signup-btn button.change-color01:hover{
  font-weight: bold;
  border: 1px solid #00ff80;
  background: #00ff80;
  color: black;
  cursor: pointer;
}

.id-duplicate-btn {
  font-size:  1.0rem;
  border-radius: 10px;
  background: white;
  color: black;
  cursor: pointer;
}

.email-duplicate-btn {
  font-size:  1.0rem;
  border-radius: 10px;
  background: white;
  color: black;
  cursor: pointer;
}




</style>
