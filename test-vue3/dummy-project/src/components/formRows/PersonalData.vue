<template>
  <div class="row">
    <div class="col-lg-6 col-md-6 col-sm-12">
      <label for="ageInput">Age</label>
      <input type="number" id="ageInput" name="age" v-model="user.age" min="18" max="100" v-validate />
      <div class="error">{{ validationErrors.age }}</div>
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
</template>

<script lang="ts">
import validate from '@/modules/directives/validate'
import { user } from '@/modules/features/useUser'
import { validationErrors } from '@/modules/features/useErrors'
import countriesJson from '@/assets/jsons/countries.json'

export default {
  name: 'PersonalData',
  directives: {
    validate: validate
  },
  setup () {
    const countries = countriesJson
    return { user, validationErrors, countries }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
