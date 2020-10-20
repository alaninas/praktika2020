<template>
<div>
  <form @submit.prevent="dummy" novalidate id="userForm">
    <div class="row">
      <div class="col-lg-3 col-md-6 col-sm-12">
        <label for="userName">Name</label>
        <input type="text" id="userName" name="name" v-model="user.name" :class="userErrors.name ? 'invalid' : ''" required v-validate />
        <div class="error">{{ validationErrors.name }} {{ userErrors.name }}</div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12">
        <label for="ageInput">Age</label><input type="number" id="ageInput" name="age" v-model="user.age" min="18" max="100" v-validate />
        <div class="error">{{ validationErrors.age }}</div>
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12">
        <label for="userPassword">Pswd1</label>
        <input type="password" id="userPassword" name="password" v-model="user.password" :class="userErrors.password ? 'invalid' : ''" required v-validate />
        <div class="error">{{ validationErrors.password }} {{ userErrors.password }}</div>
        <!-- error component: takes errors, as one object?array -- displays them -->
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12">
        <label for="userPasswordConfirm">Pswd2</label>
        <input type="password" id="userPasswordConfirm" name="passwordConfirm" v-model="user.passwordConfirm" :class="userErrors.password ? 'invalid' : ''" required v-validate />
        <div class="error">{{ validationErrors.passwordConfirm }} {{ userErrors.password }}</div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-md-6 col-sm-12">
        <label for="emailInput">Email</label>
        <input type="email" id="emailInput" name="email" v-model="user.email" required v-validate />
        <div class="error">{{ validationErrors.email }}</div>
      </div>
      <div id="countries" class="col-lg-6 col-md-6 col-sm-12">
        <label for="countryInput">Country</label>
        <select id="countryInput" v-model="user.country" name="country" required v-validate >
           <option disabled value="">Please select a country</option>
           <option v-for="country in countries" :key="country">{{ country.name }}</option>
        </select>
        <div class="error">{{ validationErrors.country }}</div>
      </div>
    </div>
    <AddressAutocomplete />
    <input
      type="submit" value="Submit" class="button primary responsive-padding responsive-margin"
      @click="test(validationErrors, user)"
    />
  </form>
  <!-- <UserError
    v-bind:isValid="userValidationErrors.data.isValid"
    v-bind:errMessages="userValidationErrors.data.messages"
  /> -->
</div>
</template>

<script lang="ts">
import { watchEffect } from 'vue'
import AddressAutocomplete from '@/components/AddressAutocomplete.vue'
import UserInterface from '@/modules/types/IUser'
import { user, users } from '@/modules/types/users'
import { validationErrors, userErrors } from '@/modules/types/errors'
import validate from '@/modules/directives/validate'
import { assignUserErrors } from '@/modules/features/useUserErrors'
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
    const countries = countriesJson
    function dummy () {
      return true
    }
    function test (valErrs: never[], nuser: UserInterface) {
      validationErrors.value = valErrs
      // console.log(validationErrors.value)
      console.log('++> Number of fields with Form validation errors:')
      console.log(Object.values(validationErrors.value).filter(el => !!el).length)
      // console.log(userErrors.value)
      console.log('--> Number of fields with User logic errors:')
      console.log(Object.values(userErrors.value).filter(el => !!el).length)
      console.log('>>> User information:')
      console.log(user.value)
      const nu = { name: nuser.name, age: nuser.age, email: nuser.email } as UserInterface
      // users.value.push(user)
    }
    watchEffect(() => {
      userErrors.value = assignUserErrors(user.value)
      // console.log(userErrors.value)
      // console.log('!!> Number of fields with User logic errors:')
      // console.log(Object.values(userErrors.value).filter(el => !!el).length)
    })
    return { user, dummy, test, countries, validationErrors, userErrors }
  }
}
</script>

<style src="../assets/csss/userForm.css">
</style>
