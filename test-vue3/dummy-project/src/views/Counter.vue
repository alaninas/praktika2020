<template>
  <div class="counter">Counter</div>
  <div></div>
  <button @click="increment">
    Count is: {{ state.count }}, double is: {{ state.double }}
  </button>
  <button @click="clear">
    Clear counter
  </button>
</template>

<script lang="ts">
import { reactive, computed } from 'vue'

export default {
  setup () {
    const state: {count: number; double: number} = reactive({
      count: 0,
      double: computed(() => state.count * 2)
    })

    function increment () {
      state.count++
    }

    function clear () {
      state.count = 0
    }

    return {
      state,
      increment,
      clear
    }
  }
}
</script>
