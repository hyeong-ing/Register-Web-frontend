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
      if (this.isRightSideOpen === true) {
        return{
          right: '23vw',
          transition: 'right 0.4s cubic-bezier(.71, 1.7, .58, .98)'
        }
      }else {
        return {
          right: '32px',
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
    <img src="../assets/leftHeartBar.png" alt="왼쪽하트" class="left-sideBar" :class="{isLeftSideOpen: isLeftSideOpen}"
          @click="toggleLeft" :style="heartLeftStyle"/>
    <LeftSide :open="isLeftSideOpen" />
    <img src="../assets/rightHeartBar.png" alt="오른쪽하트" class="right-sideBar" :class="{isRightSideOpen: isRightSideOpen}"
         @click="toggleRight" :style="heartRightStyle"/>
    <RightSide :open="isRightSideOpen" />
    <div class="center-icon">
      <img src="../assets/wings.png" alt="날개아이콘" class="wings" @click="$router.push('/main')" style="cursor:pointer;" />
      <div class="shop-name">
        <p class="change-color01" @click="$router.push('/main')"> sori </p>
      </div>
    </div>
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