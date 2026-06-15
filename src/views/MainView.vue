<script>
import RightSide from "@/components/mainview/RightSide.vue";
import LeftSide from "@/components/mainview/LeftSide.vue";
import CustomerRight from "@/components/customer/CustomerRight.vue";
import image01 from "@/assets/image/1.png";
import image02 from "@/assets/image/2.png";
import image03 from "@/assets/image/3.png";
import image04 from "@/assets/image/4.png";
import image05 from "@/assets/image/5.png";
import image06 from "@/assets/image/6.png";
import image07 from "@/assets/image/7.png";
import image08 from "@/assets/image/8.png";
import image09 from "@/assets/image/9.png";

export default {
  name: 'MainView',
  components: {RightSide, LeftSide, CustomerRight},
  data() {
    return {
      isRightSideOpen: false,
      isLeftSideOpen: false,
      displayName: null,
      productImages: [
        image01,
        image02,
        image03,
        image04,
        image05,
        image06,
        image07,
        image08,
        image09,
      ],
    }
  },
  computed: {
    heartRightStyle() {
      if (this.isRightSideOpen === true) {
        return{
          right: '23vw',
          transition: 'right 0.4s cubic-bezier(.71, 1.7, .58, .98)'
        }
      }else {
        return {
          right: '56px',
          transition: 'right 0.4s cubic-bezier(.71, 1.7, .58, .98)'
        }
      }
    },
    heartLeftStyle() {
      if (this.isLeftSideOpen === true) {
        return{
          left: '23vw',
          transition: 'left 0.4s cubic-bezier(.71, 1.7, .58, .98)'
        }
      }else {
        return {
          left: '56px',
          transition: 'left 0.4s cubic-bezier(.71, 1.7, .58, .98)'
        }
      }
    },
    loggedIn() {
      return Boolean(this.displayName);
    },
  },
  methods: {
    toggleRight() {
      this.isRightSideOpen = !this.isRightSideOpen;
    },
    toggleLeft() {
      this.isLeftSideOpen = !this.isLeftSideOpen;
    },
    loggedOut() {
      localStorage.removeItem('displayName');
      this.displayName = null;
      this.$router.replace('/main');
    },

    // 다른 창에서 값이 바뀌면 현재 창 값에도 반영한다. (반대도 마찬가지)
    syncAuth(e) {
      if (e.key === 'displayName') {
        // e.newValue가 이미 어딘가에서 저장된 새 값인것! 그리고 새 값을 반영
        this.displayName = e.newValue;
      }
    }
  },
  // 로그인된 사용자 아이디가 바뀌면, 동시에 켜 둔 페이지의 아이디도 바뀜
  // 만약 그게 싫으면 sessionStorage를 사용하면 됨. 근데 보통 웹페이지엔 뭘 더 사용하려나...?
  mounted() {
    // 현재 값으로 복사해옴
    this.displayName = localStorage.getItem('displayName');
    // 다른 탭에 변경이 있으면 syncAuth를 호출하도록 리스너 등록
    window.addEventListener('storage', this.syncAuth);
  }, // 이 페이지에서 나가지면 없애버림. 메모리 관리를 위해 (안보이는데 돌아갈 순 없으니까)
  beforeUnmount() {
    window.removeEventListener('storage', this.syncAuth);
  },
}
</script>



<template>
  <div class="main-view">
    <img src="../assets/leftHeartBar.png" alt="왼쪽하트" class="left-sideBar" :class="{isLeftSideOpen: isLeftSideOpen}"
          @click="toggleLeft" :style="heartLeftStyle"/>
    <LeftSide :open="isLeftSideOpen" />
    <img src="../assets/rightHeartBar.png" alt="오른쪽하트" class="right-sideBar" :class="{isRightSideOpen: isRightSideOpen}"
         @click="toggleRight" :style="heartRightStyle"/>
    <RightSide v-if="!loggedIn" :open="isRightSideOpen" />
    <CustomerRight v-else :open="isRightSideOpen" :display-name="displayName" @logged-out="loggedOut" />
    <div class="center-icon">
      <img src="../assets/wings.png" alt="날개아이콘" class="wings" @click="$router.push('/main')" style="cursor:pointer;" />
      <div class="shop-name">
        <p class="change-color01" @click="$router.push('/main')"> sori </p>
      </div>
    </div>
    <div class="product-grid">
      <img
          v-for="(image, index) in productImages"
          :key="image"
          :src="image"
          :alt="`상품 이미지 ${index + 1}`"
          class="product-image"
      />
    </div>
  </div>
</template>



<style scoped>
.main-view {
  position: relative;
  width: 100vw;
  height: 100vh;
  max-height: 100vh !important;
  background: #ffffff;
  overflow-x: hidden;
  overflow-y: auto;
}

.center-icon {
  position: absolute;
  top: 7%;
  left: 50%;
  transform: translateX(-50%);
  display:  flex;
  flex-direction:  column;
  align-items: center;
  z-index: 1101;
}

.wings {
  width: 60px;
  height: 60px;
}

.shop-name {
  margin-top: -9px;
  font-size: 1.4rem;
  color: #020202;
  font-family: 'Cafe24Meongi-B-v1.0', serif;
  font-weight:  bold;
  letter-spacing: 2px;
  text-shadow: 1px 1px 5px #fff8;
}

.shop-name p.change-color01:hover{
  transition: color 0.2s, font-weight 0.2s;
  font-weight: bold;
  color: #00ff80;
  cursor: pointer;
}

.product-grid {
  position: relative;
  top: 22%;
  margin: 43px calc(32px + 53px + 80px) 96px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 28px;
  row-gap: 84px;
  padding-bottom: 96px;
  z-index: 10;
}

.product-image {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  box-sizing: border-box;
  display: block;
}

.left-sideBar {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 53px;
  height: 48px;
  cursor: pointer;
  z-index: 1100;
  transition: transform 0.15s cubic-bezier(.71, 1.7, .58, .98);
}

.right-sideBar {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 53px;
  height: 48px;
  cursor: pointer;
  z-index: 1100;
  transition:  transform 0.15s cubic-bezier(.71, 1.7, .58, .98);
}

</style>
