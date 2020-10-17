<template>
<div>
  <form @submit.prevent="dummy" novalidate id="userForm">
    <span class="col-lg-3 col-md-7 col-sm-12">
      <label for="userName">Name</label><input type="text" name="name" v-model="user.data.name" required v-validate />
      <span class="error">{{ errors.name }}</span>
    </span>
    <span class="col-lg-3 col-md-5 col-sm-12">
      <label for="ageInput">Age</label><input type="number" name="age" v-model="user.data.age" min="18" max="100" v-validate />
      <span class="error">{{ errors.age }}</span>
    </span>
    <span class="col-lg-3 col-md-8 col-sm-12">
      <label for="emailInput">Email</label><input type="email" name="email" v-model="user.data.email" required v-validate />
      <span class="error">{{ errors.email }}</span>
    </span>
    <div id="countries">
     <select v-model="selectedCountry">
        <option disabled value="">Please select one</option>
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
  <AddressAutocomplete />
</div>
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
import UserError from '@/components/UserError.vue'
import AddressAutocomplete from '@/components/AddressAutocomplete.vue'
import User from '@/modules/User'
import ValidationErrors from '@/modules/ValidationErrors'
// import useUsers from '@/features/useUsers'
import validate from '@/directives/validate'
import countriesJson from '@/assets/countries.json'

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
    const errors = ref([])
    const selectedCountry = ref(['No country selected'])
    const countries = countriesJson
    const user = reactive({ data: new User({}) })
    // TODO: remove. Duplicate logic use 'errors' instead.
    const userValidationErrors = reactive({ data: new ValidationErrors({}) })
    function dummy () {
      return true
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function test (errobj: any) {
      Object.values(errobj).length ? console.log(errobj) : console.log('No input provided yet :)')
      console.log('Number of fields with validation errors:')
      console.log(Object.values(errobj).filter(el => !!el).length)
      // const nu = new User({ name: tuser.name, age: tuser.age, email: tuser.email })
      // usersAdd(nu)
    }
    return { user, userValidationErrors, dummy, test, countries, selectedCountry, errors }
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
