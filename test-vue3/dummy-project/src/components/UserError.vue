<template>
  <div class="collapse error" v-if="!isValid">
    <input type="checkbox" id="collapse-section1" checked aria-hidden="true">
    <label for="collapse-section1" aria-hidden="true">Please update input</label>
    <div>
      <ul>
        <li v-for="error in errMessages" :key="error">{{ error }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'UserError',
  props: {
    isValid: {
      type: Boolean,
      required: true
    },
    errMessages: {
      type: Array,
      required: true
    }
  },
  setup () { return {} }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// Errors
.collapse.error > :checked + label {
  border-bottom-color: var(--input-invalid-color);
  border-bottom-width: .225rem;
}
.collapse.error > label,
.collapse.error > :checked + label + div {
  border-color: var(--input-invalid-color);
}
.collapse.error > label {
  color: var(--input-invalid-color);
  font-weight: bold;
}
// span.error {
//   display: block;
//   color: var(--input-invalid-color);
//   margin-top: 0;
// }
</style>
