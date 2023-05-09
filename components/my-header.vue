<template>
  <div class="w-full bg-[#bbb]">
    
  </div>
</template>
<script setup lang="ts">


</script>

<style>
.topbar { 
  background: 
    linear-gradient(to bottom right,transparent 50%,#3d5820 0) right bottom/24px 24px no-repeat,
    linear-gradient(to top left,transparent 50%,#3d5820 0) left top/24px 24px no-repeat,
    rgba(252, 211, 77, var(--tw-bg-opacity));  
  color: white; 
  overflow: hidden;
}
:root {
  --topbar-transition-sec: 0.5s;
}
.drawer{
  transition: visibility var(--topbar-transition-sec);
}
.drawer__nav {
  transition: transform var(--topbar-transition-sec) ease;
}
.drawer__nav--open {
  transform: translateY(0%);
}
.drawer__nav--close {
  transform: translateY(-100%);
}

.menu-hover-animate:hover::after  {
  animation-name: menu-animate;
  animation-duration: 0.65s;
}
.menu-hover-animate::after {
  position: absolute;
  bottom: 6px;
  left: 0px;
  width: 100%;
  height: 30%;
  background: repeating-linear-gradient(45deg, #0000 0px, #0000 7px, #666 7px, #666 18px);
  mask-image: linear-gradient(to right, transparent 0%, transparent 33%, #fff 33%, #fff 66%, transparent 66%, transparent 100%);
  mask-size: 320% 100%;
  mask-position: 0% 0; 
  opacity: 0.8;
  content: "";
  z-index: -1;
}
@keyframes menu-animate {
  0% {
    mask-position: 0% 0; 
  }
  37% {
    mask-position: 50% 0; 
  }
  62% {
    mask-position: 50% 0; 
  }
  100% {
    mask-position: 100% 0; 
  }
}
</style>