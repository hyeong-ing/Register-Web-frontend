<script>
import RightSide from "@/components/mainview/RightSide.vue";
import LeftSide from "@/components/mainview/LeftSide.vue";

export default {
  name: 'MainView',
  components: {RightSide, LeftSide},
  data() {
    return {
      isRightSideOpen: false,
      isLeftSideOpen: false,
    }
  },
  computed: {
    heartRightStyle() {
      if (this.isRightSideOpen) {
        return{ // 닫혔을 때: 패널 왼쪽에 붙임
          right: '22vw',
          transition: 'right 0.4s cubic-bezier(.71, 1.7, .58, .98)'
        }
      }else { //닫혔을 때 화면 오른쪽 끝
        return {
          right: '32px', //32px만큼 떨어져있으니까
          transition: 'right 0.4s cubic-bezier(.71, 1.7, .58, .98)'
        }
      }
    },
    heartLeftStyle() {
      if (this.isLeftSideOpen) {
        return{
          left: '22vw',
          transition: 'left 0.4s cubic-bezier(.71, 1.7, .58, .98)'
        }
      }else {
        return {
          left: '32px',
          transition: 'left 0.4s cubic-bezier(.71, 1.7, .58, .98)'
        }
      }
    }
  },
  methods: {
    toggleRight() {
      this.isRightSideOpen = !this.isRightSideOpen;
    },
    toggleLeft() {
      this.isLeftSideOpen = !this.isLeftSideOpen;
    },
  },
}
</script>



<template>
  <div class="main-view">
    <img src="../assets/leftHeartBar.png" alt="왼쪽하트" class="left-sideBar" :class="{'attached': isLeftSideOpen}"
          @click="toggleLeft" :style="heartLeftStyle"/>
    <img src="../assets/rightHeartBar.png" alt="오른쪽하트" class="right-sideBar" :class="{'attached': isRightSideOpen}"
         @click="toggleRight" :style="heartRightStyle"/>
    <div class="center-icon">
      <img src="../assets/wings.png" alt="날개아이콘" class="wings" />
      <div class="shop-name">sori</div>
    </div>


    <RightSide :open="isRightSideOpen" />
    <LeftSide :open="isLeftSideOpen" />
  </div>
</template>



<style scoped>
.main-view {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #ffffff;
  /* 나중에 요소가 넘치면 스크롤이 생기도록 */
  overflow:  hidden;
}

.center-icon {
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, 0%);
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
  font-size: 1.2rem;
  color: #020202;
  font-family: 'GowunBatang-Regular', serif;
  font-weight:  bold;
  letter-spacing: 2px;
  text-shadow: 1px 1px 5px #fff8;
}

.left-sideBar {
  position: fixed;
  left: 32px;
  top: 50%;
  transform: translateY(-50%);
  width: 53px;
  height: 48px;
  cursor: pointer;
  z-index: 1100;
  transition:  transform 0.15s cubic-bezier(.71, 1.7, .58, .98);
}

.right-sideBar {
  position: fixed;
  right: 32px;
  top: 50%;
  transform: translateY(-50%);
  width: 53px;
  height: 48px;
  cursor: pointer;
  z-index: 1100;
  transition:  transform 0.15s cubic-bezier(.71, 1.7, .58, .98);
}

</style>