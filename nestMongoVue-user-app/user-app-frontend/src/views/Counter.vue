<template>
  <div>
    <span
      @mouseover="hover = true"
      @mouseleave="hover = false"
      :class="{ active: hover }"
    >
      Hover me to show the message!
    </span>
    <span v-if="hover">This is a secret message.</span>
  </div>
  <div class="counter">Counter: {{ message }}</div>
  <div></div>
  <button class="button primary" @click="increment">
    Count is: {{ state.count }}, double is: {{ state.double }}
  </button>
  <button class="button inverse" @click="clear">
    Clear counter
  </button>
  <div v-show="isNinja" id="mapp">
    <p v-show="isNinja">Invisible like a ninja!</p>
    <!-- <p v-show="!isNinja">Here I am!</p> -->
    <button class="button inverse" v-on:click="isNinja = !isNinja">Toggle Ninja Skills</button>
  </div>
  <div class="setting">
    Remove "{{ bgColor }}" and type some other color:
    <input class="setting" type="text" v-model="bgColor" :style="inputStyles">
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue'

export default defineComponent({
  el: '#mapp',
  data () {
    return {
      message: 'Hello',
      hover: false,
      isNinja: true,
      bgColor: 'red'
    }
  },
  computed: {
    // needs an annotation
    greeting (): string {
      return this.message + '!'
    },
    // in a computed with a setter, getter needs to be annotated
    greetingUppercased: {
      get (): string {
        return this.greeting.toUpperCase()
      },
      set (newValue: string) {
        this.message = newValue.toUpperCase()
      }
    },
    inputStyles (): { background: string } {
      return {
        background: this.bgColor
      }
    }
  },
  updated () {
    this.message = this.greetingUppercased // => Property 'split' does not exist on type 'number'
  },
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
})

// export default {
//   setup () {
//     const state: {count: number; double: number} = reactive({
//       count: 0,
//       double: computed(() => state.count * 2)
//     })
//     function increment () {
//       state.count++
//     }
//     function clear () {
//       state.count = 0
//     }
//     return {
//       state,
//       increment,
//       clear
//     }
//   }
// }
</script>
