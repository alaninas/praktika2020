<template>
  <div class="row">
    <div class="col-lg-4 col-md-12 col-sm-12">
      <label for="emailInput">Email</label>
      <input type="email" id="emailInput" name="email" v-model="user.email" :class="userErrors.email ? 'invalid' : ''" required v-validate />
      <div class="error">{{ validationErrors.email }}</div>
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12">
      <label for="userPassword">Pswd1</label>
      <input type="password" id="userPassword" name="password" v-model="user.password" :class="userErrors.password ? 'invalid' : ''" minlength="4" required v-validate />
      <div class="error">{{ validationErrors.password }} {{ userErrors.password }}</div>
    </div>
    <div class="col-lg-4 col-md-6 col-sm-12">
      <label for="userPasswordConfirm">Pswd2</label>
      <input type="password" id="userPasswordConfirm" name="passwordConfirm" v-model="user.passwordConfirm" :class="userErrors.passwordConfirm ? 'invalid' : ''" minlength="4" required v-validate />
      <div class="error">{{ validationErrors.passwordConfirm }} {{ userErrors.passwordConfirm }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import validate from '@/modules/directives/validate'
import { useUser } from '@/modules/features/useUser'
import { userErrors, validationErrors } from '@/modules/states/formErrors'

export default {
  directives: {
    validate: validate
  },
  async setup () {
    const { user } = await useUser({})
    return { user, validationErrors, userErrors }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
