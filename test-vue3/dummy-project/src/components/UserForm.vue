<template>
<div>
  <form @submit.prevent="dummy" novalidate id="userForm">
    <!-- remove spans -- use divs && col classes -->
    <!-- TODO: spans -> divs: rows & cols -->
    <span class="col-lg-3 col-md-7 col-sm-12">
      <label for="userName">Name</label><input type="text" id="userName" name="name" v-model="user.data.name" required v-validate />
      <span class="error">{{ validationErrors.name }}</span>
      <span class="error">{{ userErrors.name }}</span>
    </span>
    <span class="col-lg-3 col-md-5 col-sm-12">
      <label for="ageInput">Age</label><input type="number" id="ageInput" name="age" v-model="user.data.age" min="18" max="100" v-validate />
      <span class="error">{{ validationErrors.age }}</span>
    </span>
    <span class="col-lg-3 col-md-7 col-sm-12">
      <label for="userPassword">Pswd1</label><input type="password" id="userPassword" name="password" v-model="user.data.password" required v-validate />
      <span class="error">{{ validationErrors.password }} {{ userErrors.password }}</span>
      <!-- error component: takes errors, as one object?array -- displays them -->
      <!-- <span class="error">{{ userErrors.password }}</span> -->
    </span>
    <span class="col-lg-3 col-md-5 col-sm-12">
      <label for="userPasswordConfirm">Pswd2</label><input type="password" id="userPasswordConfirm" name="passwordConfirm" v-model="user.data.passwordConfirm" required v-validate />
      <span class="error">{{ validationErrors.passwordConfirm }}</span>
      <span class="error">{{ userErrors.password }}</span>
    </span>
    <span class="col-lg-3 col-md-5 col-sm-12">
      <label for="emailInput">Email</label><input type="email" id="emailInput" name="email" v-model="user.data.email" required v-validate />
      <span class="error">{{ validationErrors.email }}</span>
    </span>
    <span id="countries" class="col-lg-3 col-md-7 col-sm-12">
      <select v-model="selectedCountry" name="country" required v-validate >
         <option disabled value="">Please select a country</option>
         <option v-for="country in countries" :key="country">{{ country.name }}</option>
      </select>
      <span class="error">{{ validationErrors.country }}</span>
    </span>
    <AddressAutocomplete />
    <input
      type="submit" value="Submit" class="button primary responsive-padding responsive-margin col-lg col-md-4 col-sm-12"
      @click="test(validationErrors, user.data)"
    />
  </form>
  <!-- <UserError
    v-bind:isValid="userValidationErrors.data.isValid"
    v-bind:errMessages="userValidationErrors.data.messages"
  /> -->
</div>
</template>

<script lang="ts">
import { reactive, ref, watchEffect } from 'vue'
// import UserError from '@/components/UserError.vue'
import AddressAutocomplete from '@/components/AddressAutocomplete.vue'
import UserInterface from '@/modules/types/IUser'
import useErrors from '@/modules/features/useErrors'
import useUsers from '@/modules/features/useUsers'
import validate from '@/modules/directives/validate'
import countriesJson from '@/assets/jsons/countries.json'

export default {
  name: 'UserForm',
  components: {
    // UserError,
    AddressAutocomplete
  },
  directives: {
    validate: validate
  },
  setup () {
    const { validationErrors, userErrors, assignUserErrors } = useErrors()
    const { usersAdd } = useUsers()
    const selectedCountry = ref(['No country selected'])
    const countries = countriesJson
    const user = reactive({ data: {} as UserInterface })
    function dummy () {
      return true
    }
    function test (valErrs: never[], nuser: UserInterface) {
      validationErrors.value = valErrs
      console.log(validationErrors.value)
      console.log('++> Number of fields with Form validation errors:')
      console.log(Object.values(validationErrors.value).filter(el => !!el).length)
      console.log(userErrors.value)
      console.log('--> Number of fields with User logic errors:')
      console.log(Object.values(userErrors.value).filter(el => !!el).length)
      const nu = { name: nuser.name, age: nuser.age, email: nuser.email } as UserInterface
      return usersAdd(nu)
    }
    watchEffect(() => {
      userErrors.value = assignUserErrors(user.data)
      console.log(`Updated user logic errors: ${userErrors.value}`)
      console.log('!!> Number of fields with User logic errors:')
      console.log(Object.values(userErrors.value).filter(el => !!el).length)
    })
    return { user, dummy, test, countries, selectedCountry, validationErrors, userErrors }
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
