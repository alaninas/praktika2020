<template>
  <form @submit.prevent="dummy" novalidate id="userForm">
    <span class="col-lg-3 col-md-7 col-sm-12">
      <label for="userName">Name</label>
      <input type="text" name="name" v-model="user.data.name" required v-validate />
      <span class="error">{{ errors.name }}</span>
    </span>
    <span class="col-lg-3 col-md-5 col-sm-12">
      <label for="ageInput">Age</label>
      <input type="number" name="age" v-model="user.data.age" min="18" max="100" v-validate />
      <span class="error">{{ errors.age }}</span>
    </span>
    <span class="col-lg-3 col-md-8 col-sm-12">
      <label for="emailInput">Email</label>
      <input type="email" name="email" v-model="user.data.email" required v-validate />
      <span class="error">{{ errors.email }}</span>
    </span>
    <div id="countries">
     <select v-model="selectedCountry">
         <option disabled value="Please select one">Please select one</option>
         <option v-for="country in countries" :key="country">{{ country.name }}</option>
     </select>
     <span>Selected: {{ selectedCountry }}</span>
    </div>
    <input
      type="submit" value="Submit" class="button primary responsive-padding responsive-margin col-lg col-md-4 col-sm-12"
      @click="test(errors)"
    />
  </form>
  <UserError
    v-bind:isValid="userValidationErrors.data.isValid"
    v-bind:errMessages="userValidationErrors.data.messages"
  />
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
import UserError from '@/components/UserError.vue'
import User from '@/modules/User'
import ValidationErrors from '@/modules/ValidationErrors'
import useUsers from '@/features/useUsers'
import validate from '@/directives/validate'
// https://medium.com/@dmitrymind/how-to-keep-array-data-inside-local-json-file-for-vue-app-46bb29d4ac53
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-9.html
// https://gist.github.com/keeguon/2310008
import json from '@/assets/countries.json'

export default {
  name: 'UserForm',
  el: '#userForm',
  components: {
    UserError
  },
  data: () => ({
    errors: {}
  }),
  directives: {
    validate: validate
  },
  setup () {
    const selectedCountry = ref([])
    const countries = json
    console.log(countries)
    console.log(countries[1].name)
    const user = reactive({ data: new User({}) })
    const userValidationErrors = reactive({ data: new ValidationErrors({}) })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { usersAdd, isNameUnique } = useUsers()
    function dummy () {
      return true
    }
    // perform inner validation on userNameUniqueness &&
    // pswd1 === pswd2
    // --> update errorObject
    // ---> onSubmit will set the appropriate error messaging on invalid fields
    function addUser (tuser: User) {
      const nu = new User({ name: tuser.name, age: tuser.age, email: tuser.email })
      // if (!isNameUnique(nu)) nu.getUserValidate().setErrors({ isValid: false, messages: ['User name is not unique.'] })
      // if (nu.getUserValidate().isValid) usersAdd(nu)
      usersAdd(nu)
      // userValidationErrors.data = nu.getUserValidate()
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function test (errobj: any) {
      Object.values(errobj).length ? console.log(errobj) : console.log('No input provided yet :)')
      console.log('Number of fields with validation errors:')
      console.log(Object.values(errobj).filter(el => !!el).length)
    }
    return { user, addUser, userValidationErrors, dummy, test, countries, selectedCountry }
  }
}
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
