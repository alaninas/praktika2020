<template>
  <form @submit.prevent="dummy" novalidate id="userForm">
    <span class="col-lg-3 col-md-7 col-sm-12">
      <label for="userName">Name</label>
      <input type="text" name="name" v-model="user.data.name" required v-validate @input="validate"/>
      <span class="error">{{ errors.name }}</span>
    </span>
    <span class="col-lg-3 col-md-5 col-sm-12">
      <label for="ageInput">Age</label>
      <input type="number" name="age" v-model="user.data.age" min="18" max="100" v-validate @input="validate"/>
      <span class="error">{{ errors.age }}</span>
    </span>
    <span class="col-lg-3 col-md-8 col-sm-12">
      <label for="emailInput">Email</label>
      <input type="email" name="email" v-model="user.data.email" required v-validate @input="validate"/>
      <span class="error">{{ errors.email }}</span>
    </span>
    <input
      type="submit" value="Submit" class="button primary responsive-padding responsive-margin col-lg col-md-4 col-sm-12"
      @click="onSubmit"
    />
  </form>
  <UserError
    v-bind:isValid="userValidationErrors.data.isValid"
    v-bind:errMessages="userValidationErrors.data.messages"
  />
</template>

<script lang="ts">
import User from '@/modules/User'
import UserError from '@/components/UserError.vue'
import { defineComponent, reactive } from 'vue'
import ValidationErrors from '@/modules/ValidationErrors'
import useUsers from '@/features/useUsers'
import validate from '@/directives/validate'
// @click="test(errors)"

export default defineComponent({
  name: 'UserForm',
  el: '#userForm',
  components: {
    UserError
  },
  data: () => ({
    errors: { name: 'Required', email: 'Required' }
  }),
  directives: {
    validate: validate
  },
  methods: {
    validate () {
      this.$emit('validate')
      console.log('fired validate')
    },
    onSubmit () {
      this.validate()
      if (Object.values(this.errors).filter(el => !!el).length === 0) {
        console.log('Sending to server...')
        this.addUser(this.user.data)
      }
    }
  },
  setup () {
    // console.log(JSON.stringify(context))
    const user = reactive({ data: new User({}) })
    const userValidationErrors = reactive({ data: new ValidationErrors({}) })
    const { usersAdd, isNameUnique } = useUsers()
    function dummy () {
      return true
    }
    function addUser (tuser: User) {
      const nu = new User({ name: tuser.name, age: tuser.age, email: tuser.email })
      // if (!isNameUnique(nu)) nu.getUserValidate().setErrors({ isValid: false, messages: ['User name is not unique.'] })
      // if (nu.getUserValidate().isValid) usersAdd(nu)
      usersAdd(nu)
      // userValidationErrors.data = nu.getUserValidate()
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function test (errobj?: any) {
      console.log(errobj)
      console.log(Object.values(errobj).filter(el => !!el).length)
    }
    return { user, addUser, userValidationErrors, dummy, test }
  }
})
</script>

<style scoped lang="scss">
form span {
  display: inline-block;
  white-space: nowrap;
}
// Val
span.error {
  display: block;
  color: red;
  margin-top: 5px;
}
</style>
