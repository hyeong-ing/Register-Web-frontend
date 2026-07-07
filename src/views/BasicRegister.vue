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
      submitTried: false,
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
    },
    checkName() {
      const pattern = /^[가-힣]{2,5}$/;

      if (!this.name || this.name.trim() === "") return "성함을 입력해주세요.";
      if (!pattern.test(this.name)) return "성함은 한글로 작성하셔야합니다.";

      return "";
    },
    checkId() {
      const pattern = /^(?=.*\d)[A-Za-z][A-Za-z0-9]{3,19}$/;

      if (!this.userId || this.userId.trim() === "") return "아이디를 입력해주세요.";
      if (!pattern.test(this.userId)) {
        return "아이디의 첫글자는 영어이며, 영어와 숫자를 섞어 4자리 이상 20자리 이하만 가능합니다.";
      }

      return "";
    },
    checkPw() {
      const pattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&*()-+=]).{8,}$/;

      if (!this.pw || this.pw.trim() === "") return "패스워드를 입력해주세요.";
      if (!pattern.test(this.pw)) return "패스워드에 대문자와 특수문자가 포함된 8글자 이상이어야합니다.";

      return "";
    },
    checkPwConfirm() {
      if (!this.showPwConfirm) return "";
      if (!this.pwConfirm || this.pwConfirm.trim() === "") return "패스워드 확인란을 입력해주세요.";
      if (this.pw !== this.pwConfirm) return "비밀번호가 불일치합니다.";

      return "";
    },
    checkTel() {
      const pattern = /^01(?:0|1|[6-9])[-](\d{3}|\d{4})[-](\d{4})$/;

      if (!this.tel || this.tel.trim() === "") return "휴대폰 번호를 입력해주세요.";
      if (!pattern.test(this.tel)) return "휴대폰 번호 양식은 010-0000-0000 입니다.";

      return "";
    },
    checkEmail() {
      const pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])+[.][a-zA-Z]{2,3}$/;

      if (!this.email || this.email.trim() === "") return "이메일을 입력해주세요.";
      if (!pattern.test(this.email)) return "이메일 양식을 확인해주세요.";

      return "";
    },
    checkForm() {
      return !this.checkName
          && !this.checkId
          && !this.checkPw
          && !this.checkPwConfirm
          && !this.checkTel
          && !this.checkEmail;
    }
  },

  methods: {
    getRequestCheckMessage(e) {
      return e?.response?.data ?? "서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요.";
    },
    async register() {
      try {
        this.submitTried = true;

        if (!this.checkForm) {
          alert("입력값을 다시 확인해주세요.");
          return;
        }

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
        alert(this.getRequestCheckMessage(e));
      }
    },
    async checkIdDuplicate() {
      console.log("idDuplicate 버튼 클릭됨:", this.userId);
      if (this.checkId) {
        alert(this.checkId);
        return;
      }

      try{
        const res = await axios.post("http://localhost:8080/api/idDuplicate", {
          userId: this.userId
        });
        alert("사용가능한 아이디입니다.");
        this.idDuplicate = false;
      } catch(e) {
        alert(this.getRequestCheckMessage(e));
        this.idDuplicate = true;
      }
    },
    async checkEmailDuplicate() {
      if (this.checkEmail) {
        alert(this.checkEmail);
        return;
      }

      try {
        const res = await axios.post("http://localhost:8080/api/emailDuplicate",{
          email: this.email
        });
        alert("사용가능한 이메일입니다.");
        this.emailDuplicate = false;
      } catch (e) {
        alert(this.getRequestCheckMessage(e));
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
          <div class="input-message-group">
            <input v-model="name" type="text" name="name" placeholder="name"/>
            <p v-if="(name || submitTried) && checkName" class="check-message">{{ checkName }}</p>
          </div>
        </div>
        <div class="information-row">
          <label>ෆ id  </label>
          <div class="input-message-group">
            <input v-model="userId" type="text" name="userId" placeholder="id"/>
            <p v-if="(userId || submitTried) && checkId" class="check-message">{{ checkId }}</p>
          </div>
          <button class="id-duplicate-btn" @click="checkIdDuplicate"> id </button>
        </div>
        <div class="information-row">
          <label>ෆ pw  </label>
          <div class="input-message-group">
            <input v-model="pw" type="password" name="password" placeholder="password"/>
            <p v-if="(pw || submitTried) && checkPw" class="check-message">{{ checkPw }}</p>
          </div>
        </div>
        <transition name="confirm-slide">
          <div v-if="showPwConfirm" class="information-row confirm-row">
            <div class="input-message-group">
              <input v-model="pwConfirm" type="password" name="passwordConfirm"/>
              <p v-if="(pwConfirm || submitTried) && checkPwConfirm" class="check-message">{{ checkPwConfirm }}</p>
            </div>
          </div>
        </transition>
        <div class="information-row">
          <label>ෆ tel   </label>
          <div class="input-message-group">
            <input v-model="tel" type="tel" name="tel"  placeholder="010-0000-0000"/>
            <p v-if="(tel || submitTried) && checkTel" class="check-message">{{ checkTel }}</p>
          </div>
        </div>
        <div class="information-row">
          <label>ෆ birth   </label>
          <input v-model="birth" type="date" name="birth"/>
        </div>
        <div class="information-row">
          <label>ෆ email   </label>
          <div class="input-message-group">
            <input v-model="email"  type="email" name="email" placeholder="example01@sori.com"/>
            <p v-if="(email || submitTried) && checkEmail" class="check-message">{{ checkEmail }}</p>
          </div>
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

.confirm-row .input-message-group {
  grid-column: 2 / 3;
}

.check-message {
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
