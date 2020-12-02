<template>
  <div id="app">
    <!-- <div v-waterMark="'自己做水印'" class="app"></div> -->
    <div
      v-waterMark="{ text: '水印ing...', textColor: '#e22018' }"
      class="app"
    ></div>
  </div>
</template>

<script>
import waterMark from '@/directives/waterMark/waterMark'
console.log(waterMark)
export default {
  name: 'App',
  directives: {
    waterMark
  }
}
</script>

<style>
#app {
  width: 100%;
  height: 500px;
}
.app {
  width: 100%;
  height: 500px;
}
.water-mark-container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99;
  pointer-events: none;
}
</style>
