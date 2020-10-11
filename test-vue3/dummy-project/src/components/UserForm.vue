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
  <UserError
    v-bind:isValid="isValid"
    v-bind:errMessages="errMessages"
  />
</template>

<script lang="ts">
import User from '@/modules/User'
import UserError from '@/components/UserError.vue'
import { reactive } from 'vue'

export default {
  name: 'UserForm',
  el: '#userForm',
  components: {
    UserError
  },
  props: {
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
  // props: Readonly<{propsUser: User} & {addUser?: Function | undefined}>
  setup () {
    const user = reactive({ data: new User({}) })
    function dummy () {
      return true
    }
    return { user, dummy }
  }
}
</script>

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
</style>
