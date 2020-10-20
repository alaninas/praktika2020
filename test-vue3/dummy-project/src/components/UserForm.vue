<template>
<div>
  <form @submit.prevent="dummy" novalidate id="userForm">
    <!-- remove spans -- use divs && col classes -->
    <!-- TODO: spans -> divs: rows & cols -->
    <span class="col-lg-3 col-md-7 col-sm-12">
      <label for="userName">Name</label><input type="text" id="userName" name="name" v-model="user.data.name" required v-validate />
      <span class="error">{{ errors.name }}</span>
      <span class="error">{{ uErrors.name }}</span>
    </span>
    <span class="col-lg-3 col-md-5 col-sm-12">
      <label for="ageInput">Age</label><input type="number" id="ageInput" name="age" v-model="user.data.age" min="18" max="100" v-validate />
      <span class="error">{{ errors.age }}</span>
    </span>
    <span class="col-lg-3 col-md-7 col-sm-12">
      <label for="userPassword">Pswd1</label><input type="password" id="userPassword" name="password" v-model="user.data.password" required v-validate />
      <span class="error">{{ errors.password }} {{ uErrors.password }}</span>
      <!-- error component: takes errors, as one object?array -- displays them -->
      <!-- <span class="error">{{ uErrors.password }}</span> -->
    </span>
    <span class="col-lg-3 col-md-5 col-sm-12">
      <label for="userPasswordConfirm">Pswd2</label><input type="password" id="userPasswordConfirm" name="passwordConfirm" v-model="user.data.passwordConfirm" required v-validate />
      <span class="error">{{ errors.passwordConfirm }}</span>
      <span class="error">{{ uErrors.password }}</span>
    </span>
    <span class="col-lg-3 col-md-5 col-sm-12">
      <label for="emailInput">Email</label><input type="email" id="emailInput" name="email" v-model="user.data.email" required v-validate />
      <span class="error">{{ errors.email }}</span>
    </span>
    <span id="countries" class="col-lg-3 col-md-7 col-sm-12">
      <select v-model="selectedCountry" name="country" required v-validate >
         <option disabled value="">Please select a country</option>
         <option v-for="country in countries" :key="country">{{ country.name }}</option>
      </select>
      <span class="error">{{ errors.country }}</span>
    </span>
    <AddressAutocomplete />
    <input
      type="submit" value="Submit" class="button primary responsive-padding responsive-margin col-lg col-md-4 col-sm-12"
      @click="test(errors, uErrors, user.data)"
    />
  </form>
  <!-- TODO: remove. Duplicate logic use 'errors' instead. -->
  <UserError
    v-bind:isValid="userValidationErrors.data.isValid"
    v-bind:errMessages="userValidationErrors.data.messages"
  />
</div>
</template>

<script lang="ts">
import { reactive, ref, watchEffect } from 'vue'
import UserError from '@/components/UserError.vue'
import AddressAutocomplete from '@/components/AddressAutocomplete.vue'
import User from '@/modules/types/User'
import ValidationErrors from '@/modules//types/ValidationErrors'
import { getErrors } from '@/modules/utilities/errors'
import useUsers from '@/modules/features/useUsers'
import validate from '@/modules/directives/validate'
import countriesJson from '@/assets/jsons/countries.json'

export default {
  name: 'UserForm',
  components: {
    UserError,
    AddressAutocomplete
  },
  directives: {
    validate: validate
  },
  setup () {
    const errors = getErrors()
    const { usersAdd, uErrors, isNameUnique, arePassworsEqual } = useUsers()
    const selectedCountry = ref(['No country selected'])
    const countries = countriesJson
    const user = reactive({ data: new User({}) })
    // TODO: remove. Duplicate logic use 'errors' instead.
    const userValidationErrors = reactive({ data: new ValidationErrors({}) })
    function dummy () {
      return true
    }
    function test (errobj: never[], uerrobj: never[], nuser: User) {
      Object.values(errobj).length ? console.log(errobj) : console.log('No input provided yet :)')
      console.log('++> Number of fields with Form validation errors:')
      console.log(Object.values(errobj).filter(el => !!el).length)
      console.log(uErrors.value)
      console.log('--> Number of fields with User validation errors:')
      console.log(Object.values(uErrors.value).filter(el => !!el).length)
      const nu = new User({ name: nuser.name, age: nuser.age, email: nuser.email })
      return usersAdd(nu)
    }
    watchEffect(() => {
      // ??? duplicate assignment to the same object
      uErrors.value = Object.assign({}, uErrors.value, { name: (isNameUnique(user.data) ? '' : 'User name is not unique.') })
      uErrors.value = Object.assign({}, uErrors.value, { password: (arePassworsEqual(user.data) ? '' : 'Passwords do not match.') })
    })
    return { user, userValidationErrors, dummy, test, countries, selectedCountry, errors, uErrors, isNameUnique }
  }
}
</script>

<style lang="scss">
// TODO: red asterix <- for required fields
form span {
  display: inline-block;
  white-space: nowrap;
}
// Val
span.error {
  display: block;
  color: red;
  margin-top: 0;
}
</style>
