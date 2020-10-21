<template>
<div>
  <form @submit.prevent="onSubmit(validationErrors)" novalidate id="userForm">
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
    <input type="submit" value="Submit" class="button primary responsive-padding responsive-margin" />
  </form>
</div>
</template>

<script lang="ts">
import { watchEffect } from 'vue'
import validate from '@/modules/directives/validate'
import AddressAutocomplete from '@/components/AddressAutocomplete.vue'
import UserInterface from '@/modules/types/IUser'
import { user } from '@/modules/features/useUser'
import { users } from '@/modules/features/useUsers'
import { validationErrors, userErrors, resetErrors, assignUserErrors } from '@/modules/features/useErrors'
import countriesJson from '@/assets/jsons/countries.json'

export default {
  name: 'UserForm',
  components: {
    AddressAutocomplete
  },
  directives: {
    validate: validate
  },
  setup () {
    const countries = countriesJson

    function onSubmit (valErrs: never[]) {
      validationErrors.value = valErrs
      const validationErrorsCount = Object.values(validationErrors.value).filter(el => !!el).length
      const userErrorsCount = Object.values(userErrors.value).filter(el => !!el).length
      if (!validationErrorsCount && !userErrorsCount) {
        users.value.push(user.value)
        user.value = {} as UserInterface
        resetErrors()
      }
    }

    watchEffect(() => {
      userErrors.value = assignUserErrors(user.value)
    })
    return { user, onSubmit, countries, validationErrors, userErrors }
  }
}
</script>

<style src="../assets/csss/userForm.css">
</style>
