<template>
  <div class="users">Users</div>
  <div></div>
  <button @click="increment">
    Count is: {{ state.count }}, double is: {{ state.double }}
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

    return {
      state,
      increment
    }
  }
}
</script>
