<template>
  <div class="row">
    <div class="col-lg-6 col-md-6 col-sm-12">
      <label for="emailInput">Email</label>
      <input type="email" id="emailInput" name="email" v-model="user.email" required v-validate />
      <div class="error">{{ validationErrors.email }}</div>
    </div>
    <div class="col-lg-6 col-md-6 col-sm-12">
      <label for="userPassword">Pswd1</label>
      <input type="password" id="userPassword" name="password" v-model="user.password" minlength="4" required v-validate />
      <div class="error">{{ validationErrors.password }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import validate from '@/modules/directives/validate'
import { useUser } from '@/modules/features/useUser'
import { validationErrors } from '@/modules/states/formErrors'

export default {
  directives: {
    validate: validate
  },
  async setup () {
    const { user } = await useUser({})
    return { user, validationErrors }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
