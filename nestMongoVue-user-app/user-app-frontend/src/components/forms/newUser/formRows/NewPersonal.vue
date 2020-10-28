<template>
  <div class="row">
    <div class="col-lg-3 col-md-6 col-sm-12">
      <label for="firstnameInput">First name</label>
      <input type="text" id="firstnameInput" name="firstname" v-model="user.firstname" required v-validate />
      <div class="error">{{ validationErrors.firstname }}</div>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-12">
      <label for="lastnameInput">Last name</label>
      <input type="text" id="lastnameInput" name="lastname" v-model="user.lastname" required v-validate />
      <div class="error">{{ validationErrors.lastname }}</div>
    </div>
    <div class="col-lg-2 col-md-5 col-sm-12">
      <label for="ageInput">Age</label>
      <input type="number" id="ageInput" name="age" v-model="user.age" min="18" max="100" v-validate />
      <div class="error">{{ validationErrors.age }}</div>
    </div>
    <div id="countries" class="col-lg-4 col-md-7 col-sm-12">
      <label for="countryInput">Country</label>
      <select id="countryInput" v-model="user.country" name="country" required v-validate >
        <option disabled value="">Please select a country</option>
        <option v-for="country in countries" :key="country">{{ country.name }}</option>
      </select>
      <div class="error">{{ validationErrors.country }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import validate from '@/modules/directives/validate'
import { useUser } from '@/modules/features/useUser'
import { getValidationErrors } from '@/modules/features/useValidationErrors'
import countriesJson from '@/assets/jsons/countries.json'

export default {
  directives: {
    validate: validate
  },
  setup () {
    const { getUser } = useUser({})
    const user = getUser()
    const countries = countriesJson
    const validationErrors = getValidationErrors()
    return { user, validationErrors, countries }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
