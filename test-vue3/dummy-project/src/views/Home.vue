<template>
  <div class="home">
    <div><img alt="Vue logo" src="../assets/logo.png"></div>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script>
// import the component
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

export default {
  name: 'Home',
  components: {
    // declare the component
    HelloWorld
  }
}
</script>
