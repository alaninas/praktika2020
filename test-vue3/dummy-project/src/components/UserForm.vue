<template>
  <form @submit.prevent="dummy" id="userForm">
    <span class="col-lg-3 col-md-7 col-sm-12">
      <label for="userName">Name</label>
      <input
        v-bind:class="{ invalid: !isValid, valid: isValid }"
        type="text" name="userName" v-model="user.data.name" required
      />
    </span>
    <span class="col-lg-3 col-md-5 col-sm-12">
      <label for="ageInput">Age</label><input type="number" name="ageInput" v-model="user.data.age" min="18" max="100"/>
    </span>
    <span class="col-lg-3 col-md-8 col-sm-12">
      <label for="emailInput">Email</label><input type="email" name="emailInput" v-model="user.data.email" required/>
    </span>
    <input
      type="submit" value="Submit" class="button primary responsive-padding responsive-margin col-lg col-md-4 col-sm-12"
      @click="addUser(user.data)"
    />
  </form>
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
import User from '@/modules/User'
import { reactive } from 'vue'

export default {
  name: 'UserForm',
  el: '#userForm',
  props: {
    propsUser: {
      type: User,
      required: true
    },
    isValid: {
      type: Boolean,
      required: true
    },
    errMessages: {
      type: Array,
      required: true
    },
    addUser: Function
  },
  setup (props: Readonly<{propsUser: User} & {addUser?: Function | undefined}>) {
    const user = reactive({ data: props.propsUser })
    function dummy () {
      return true
    }
    return { user, dummy }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// Form
input {
  border-width: .1em;
}
.invalid {
  border-color: red;
  background-color: #fff5f5;
}
.valid {
  border-color: grey;
  background-color: white;
}
form span {
  display: inline-block;
  white-space: nowrap;
}
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
</style>
