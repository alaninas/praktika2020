<template>
  <div class="row">
    <div id="countries" class="col-lg-3 col-md-12 col-sm-12">
      <label for="countryInput">Country</label>
      <select id="countryInput" v-model="user.country" name="country" required v-validate >
        <option disabled value="">Please select a country</option>
        <option v-for="country in countries" :key="country">{{ country.name }}</option>
      </select>
      <div class="error">{{ validationErrors.country }}</div>
    </div>
    <div class="col-lg-9 col-md-12 col-sm-12">
      <div class="row">
        <div class="col-lg-3 col-md-6 col-sm-12">
          <label for="websiteInput">Website</label>
          <input type="url" id="websiteInput" name="website" v-model="user.website" v-validate />
          <div class="error">{{ validationErrors.website }}</div>
        </div>
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
        <div class="col-lg-3 col-md-6 col-sm-12">
          <label for="ageInput">Age</label>
          <input type="number" id="ageInput" name="age" v-model="user.age" min="18" max="100" v-validate />
          <div class="error">{{ validationErrors.age }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import validate from '@/directives/validate'
import { useUser } from '@/modules/features/useUser'
import { validationErrors } from '@/modules/states/formErrors'
import countriesJson from '@/assets/jsons/countries.json'

export default {
  directives: {
    validate: validate
  },
  async setup () {
    const { user } = await useUser({})
    const countries = countriesJson
    return { user, validationErrors, countries }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
